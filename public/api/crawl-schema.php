<?php
/**
 * Schema.org Archetype Crawler & Entity Graph Inspector
 * Teleschmiede.de (2026)
 * 
 * Deterministische, nicht-halluzinierte Extraktion von Schema.org JSON-LD
 * mit SSRF-Schutz, Rate-Limiting, 4s-Timeout und Archetypen-Sampling.
 */

declare(strict_types=1);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// 1. INPUT EXTRAKTION
$targetUrl = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $jsonData = json_decode($rawInput, true);
    $targetUrl = $jsonData['url'] ?? '';
} else {
    $targetUrl = $_GET['url'] ?? '';
}

$targetUrl = trim($targetUrl);

if (empty($targetUrl)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Bitte gib eine gültige Domain oder URL ein."]);
    exit;
}

if (!preg_match('#^https?://#i', $targetUrl)) {
    $targetUrl = 'https://' . $targetUrl;
}

// 2. SSRF-SCHUTZ & URL-VALIDIERUNG
$parsedUrl = parse_url($targetUrl);
if (!$parsedUrl || empty($parsedUrl['host'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Ungültiges URL-Format."]);
    exit;
}

$host = strtolower($parsedUrl['host']);

// Verbotene Hosts & Private Netze
$ip = gethostbyname($host);
if ($ip === $host && !filter_var($host, FILTER_VALIDATE_IP)) {
    // DNS konnte Host nicht auflösen
    echo json_encode(["success" => false, "error" => "Domain konnte nicht aufgelöst werden (DNS-Fehler)."]);
    exit;
}

$privateRanges = [
    '127.0.0.0/8',
    '10.0.0.0/8',
    '172.16.0.0/12',
    '192.168.0.0/16',
    '169.254.0.0/16',
    '0.0.0.0/8'
];

function ipInCidr(string $ip, string $cidr): bool {
    list($subnet, $bits) = explode('/', $cidr);
    $ipLong = ip2long($ip);
    $subnetLong = ip2long($subnet);
    $mask = -1 << (32 - (int)$bits);
    $subnetLong &= $mask;
    return ($ipLong & $mask) === $subnetLong;
}

foreach ($privateRanges as $range) {
    if (ipInCidr($ip, $range)) {
        http_response_code(403);
        echo json_encode(["success" => false, "error" => "Zugriff auf private/interne IP-Adressen verboten (SSRF-Schutz)."]);
        exit;
    }
}

// 3. RATE LIMITING (Max 12 Scans pro Minute pro IP)
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$rateLimitFile = sys_get_temp_dir() . '/schema_rate_' . md5($clientIp);
$currentTime = time();
$requests = [];

if (file_exists($rateLimitFile)) {
    $fileData = @file_get_contents($rateLimitFile);
    if ($fileData) {
        $requests = json_decode($fileData, true) ?: [];
    }
}

// Bereinige Einträge älter als 60s
$requests = array_filter($requests, fn($timestamp) => ($currentTime - $timestamp) < 60);

if (count($requests) >= 12) {
    http_response_code(429);
    echo json_encode(["success" => false, "error" => "Rate-Limit erreicht. Bitte warte eine Minute, bevor du eine neue Domain scannst."]);
    exit;
}

$requests[] = $currentTime;
@file_put_contents($rateLimitFile, json_encode($requests));

// 4. HTTP-CRAWLER HELPER (4s Timeout, 2MB Limit)
function fetchWebPage(string $url, int $timeoutSeconds = 4): array {
    $ch = curl_init();
    $maxBytes = 2 * 1024 * 1024; // 2 MB
    
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_TIMEOUT => $timeoutSeconds,
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 TeleschmiedeSchemaBot/1.0 (+https://teleschmie.de/tools/schema-graph-visualizer/)',
        CURLOPT_HTTPHEADER => [
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7'
        ]
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL) ?: $url;
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        return ['status' => $httpCode ?: 0, 'html' => '', 'url' => $finalUrl, 'error' => $curlError];
    }
    
    if (strlen($response) > $maxBytes) {
        $response = substr($response, 0, $maxBytes);
    }
    
    return ['status' => $httpCode, 'html' => $response, 'url' => $finalUrl, 'error' => null];
}

// 5. JSON-LD EXTRAKTION
function extractJsonLd(string $html): array {
    $jsonBlocks = [];
    if (empty($html)) return $jsonBlocks;

    // Regex für alle <script type="application/ld+json">
    if (preg_match_all('#<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>#is', $html, $matches)) {
        foreach ($matches[1] as $rawBlock) {
            $cleaned = trim($rawBlock);
            // Entferne CDATA falls vorhanden
            $cleaned = preg_replace('#^<!\[CDATA\[|\]\]>$#', '', $cleaned);
            $decoded = json_decode($cleaned, true);
            if ($decoded !== null) {
                $jsonBlocks[] = $decoded;
            } else {
                // Bei Syntaxfehler trotzdem als rohes Fragment merken
                $jsonBlocks[] = [
                    "_syntaxError" => true,
                    "_raw" => substr($cleaned, 0, 300) . '...'
                ];
            }
        }
    }
    return $jsonBlocks;
}

// 6. SCHRITT 1: STARTSEITE CRAWLEN
$homepageResult = fetchWebPage($targetUrl, 4);

if ($homepageResult['status'] === 403 || $homepageResult['status'] === 503) {
    echo json_encode([
        "success" => false,
        "isBlocked" => true,
        "httpStatus" => $homepageResult['status'],
        "error" => "Die Ziel-Website blockiert automatisierte Bots (z. B. Cloudflare / Akamai). Nutze bitte die Quelltext-Direkteingabe."
    ]);
    exit;
}

if ($homepageResult['status'] < 200 || $homepageResult['status'] >= 400 || empty($homepageResult['html'])) {
    echo json_encode([
        "success" => false,
        "httpStatus" => $homepageResult['status'],
        "error" => "Konnte die Startseite nicht abrufen (HTTP-Status: {$homepageResult['status']})."
    ]);
    exit;
}

$effectiveBaseUrl = rtrim($homepageResult['url'], '/');
$homepageHtml = $homepageResult['html'];
$homepageJsonLd = extractJsonLd($homepageHtml);

$scannedUrls = [
    [
        'url' => $homepageResult['url'],
        'archetype' => 'homepage',
        'status' => $homepageResult['status'],
        'jsonLdCount' => count($homepageJsonLd)
    ]
];

$allExtractedBlocks = [
    'homepage' => $homepageJsonLd
];

// 7. SCHRITT 2: ARCHETYPEN-SAMPLING (MAX. 3 REPRÄSENTATIVE UNTERSEITEN)
$internalLinks = [];
if (preg_match_all('#<a[^>]+href=["\']([^"\']+)["\']#i', $homepageHtml, $linkMatches)) {
    foreach ($linkMatches[1] as $href) {
        $href = trim($href);
        if (empty($href) || str_starts_with($href, '#') || str_starts_with($href, 'javascript:') || str_starts_with($href, 'mailto:') || str_starts_with($href, 'tel:')) {
            continue;
        }
        
        // Absolute URL bauen
        if (str_starts_with($href, '/')) {
            $absUrl = $effectiveBaseUrl . $href;
        } elseif (preg_match('#^https?://#i', $href)) {
            // Nur interne Links der gleichen Domain
            if (parse_url($href, PHP_URL_HOST) === $parsedUrl['host']) {
                $absUrl = $href;
            } else {
                continue;
            }
        } else {
            $absUrl = $effectiveBaseUrl . '/' . $href;
        }
        
        // Normalisiere
        $absUrl = strtok($absUrl, '#');
        $absUrl = strtok($absUrl, '?');
        if ($absUrl !== $effectiveBaseUrl && $absUrl !== $effectiveBaseUrl . '/') {
            $internalLinks[] = $absUrl;
        }
    }
}
$internalLinks = array_unique($internalLinks);

// Archetypen-Muster
$archetypePatterns = [
    'service_or_product' => '#/(produkt|product|item|shop|leistung|service|beratung|angebot|angebot|kurse|katalog|leistungen|services)/#i',
    'blog_or_article' => '#/(blog|news|magazin|ratgeber|aktuelles|artikel|wissen|insights|journal)/#i',
    'trust_or_about' => '#/(ueber-uns|about|team|profil|wer-wir-sind|unternehmen|kontakt|impressum)/#i'
];

$sampledUrls = [];
foreach ($archetypePatterns as $type => $pattern) {
    foreach ($internalLinks as $link) {
        if (preg_match($pattern, $link) && !in_array($link, $sampledUrls)) {
            $sampledUrls[$type] = $link;
            break;
        }
    }
}

// Falls über Pattern nichts gefunden, nimm die ersten 2 verfügbaren Unterseiten
if (count($sampledUrls) < 2) {
    foreach ($internalLinks as $link) {
        if (!in_array($link, $sampledUrls) && count($sampledUrls) < 3) {
            $sampledUrls['subpage_' . count($sampledUrls)] = $link;
        }
    }
}

// 8. UNTERSEITEN CRAWLEN & JSON-LD EXTRAHIEREN (MAX 3 UNTERSEITEN)
foreach ($sampledUrls as $archType => $subUrl) {
    $subResult = fetchWebPage($subUrl, 3);
    if ($subResult['status'] === 200 && !empty($subResult['html'])) {
        $subJson = extractJsonLd($subResult['html']);
        $scannedUrls[] = [
            'url' => $subUrl,
            'archetype' => $archType,
            'status' => $subResult['status'],
            'jsonLdCount' => count($subJson)
        ];
        $allExtractedBlocks[$archType] = $subJson;
    }
}

// 9. ENTITÄTEN-PARSER & BEZIEHUNGS-ANALYSE
$discoveredEntities = [];
$totalScriptTags = 0;
$hasGraphContainer = false;
$hasIds = false;
$hasInLanguage = false;
$detectedTypes = [];
$hasPersonOrgLink = false;
$hasWikidata = false;
$detectedBusiness = 'B2B_SERVICE'; // Default Fallback

foreach ($allExtractedBlocks as $pageKey => $blocks) {
    $totalScriptTags += count($blocks);
    foreach ($blocks as $block) {
        if (isset($block['_syntaxError'])) continue;

        // Prüfe ob @graph vorhanden ist
        if (isset($block['@graph']) && is_array($block['@graph'])) {
            $hasGraphContainer = true;
            $items = $block['@graph'];
        } else {
            $items = [$block];
        }

        foreach ($items as $item) {
            if (!is_array($item)) continue;
            $type = $item['@type'] ?? 'Unknown';
            if (is_array($type)) $type = implode('/', $type);
            $detectedTypes[] = $type;

            if (!empty($item['@id'])) {
                $hasIds = true;
            }
            if (!empty($item['inLanguage'])) {
                $hasInLanguage = true;
            }
            if (!empty($item['sameAs'])) {
                $sameAsVal = is_array($item['sameAs']) ? implode(' ', $item['sameAs']) : (string)$item['sameAs'];
                if (str_contains($sameAsVal, 'wikidata.org') || str_contains($sameAsVal, 'google.com/search?kgmid')) {
                    $hasWikidata = true;
                }
            }

            // Person-Organization-Link prüfen
            if (in_array($type, ['Person', 'Organization', 'LocalBusiness', 'ProfessionalService'])) {
                if (!empty($item['founder']) || !empty($item['author']) || !empty($item['worksFor']) || !empty($item['memberOf'])) {
                    $hasPersonOrgLink = true;
                }
            }

            $discoveredEntities[] = [
                'type' => $type,
                'id' => $item['@id'] ?? null,
                'name' => $item['name'] ?? ($item['headline'] ?? $type),
                'page' => $pageKey,
                'properties' => array_keys($item)
            ];
        }
    }
}

$detectedTypes = array_unique($detectedTypes);

// 10. HEURISTIK ZUR BUSINESS-ARCHETYPEN-ERKENNUNG
$typesString = implode(' ', $detectedTypes);
if (str_contains($typesString, 'Product') || str_contains($typesString, 'OnlineStore') || str_contains($typesString, 'Offer')) {
    $detectedBusiness = 'ECOMMERCE';
} elseif (str_contains($typesString, 'LocalBusiness') || str_contains($typesString, 'Restaurant') || str_contains($typesString, 'Store')) {
    $detectedBusiness = 'LOCAL_BUSINESS';
} elseif (str_contains($typesString, 'NewsArticle') || str_contains($typesString, 'BlogPosting') || str_contains($typesString, 'Article')) {
    $detectedBusiness = 'PUBLISHER';
} else {
    $detectedBusiness = 'B2B_SERVICE';
}

// 11. DETERMINISTISCHES 3-EBENEN ENTITY HEALTH SCORING (100 PUNKTE MAX)
$foundationScore = 0;
$archetypeScore = 0;
$groundingScore = 0;
$issues = [];

// Ebene 1: Fundament (Max 40 Pkt)
if ($hasGraphContainer) {
    $foundationScore += 15;
} else {
    $issues[] = [
        "severity" => "error",
        "title" => "Isolierte Dateninseln entdeckt",
        "desc" => "Deine Website verwendet getrennte JSON-LD Snippets statt eines vernetzten @graph-Containers."
    ];
}

if ($hasIds) {
    $foundationScore += 15;
} else {
    $issues[] = [
        "severity" => "warning",
        "title" => "Keine kanonischen @id Identifikatoren",
        "desc" => "Entitäten besitzen keine eindeutigen Fragment-URIs (#person, #organization)."
    ];
}

if ($hasInLanguage) {
    $foundationScore += 10;
} else {
    $issues[] = [
        "severity" => "info",
        "title" => "Fehlende Sprachdeklaration",
        "desc" => "Die Property 'inLanguage' (z. B. 'de-DE') fehlt in den Schema-Knoten."
    ];
}

// Ebene 2: Archetypen-Fit (Max 35 Pkt)
if ($detectedBusiness === 'ECOMMERCE') {
    if (str_contains($typesString, 'Product')) $archetypeScore += 15;
    if (str_contains($typesString, 'Offer')) $archetypeScore += 10;
    if (str_contains($typesString, 'AggregateRating') || str_contains($typesString, 'Brand')) $archetypeScore += 10;
    if ($archetypeScore < 20) {
        $issues[] = [
            "severity" => "warning",
            "title" => "Unvollständiges E-Commerce Schema",
            "desc" => "Produkte haben keine verknüpften Offers (Preis/Währung/Verfügbarkeit) oder Brand-Angaben."
        ];
    }
} elseif ($detectedBusiness === 'LOCAL_BUSINESS') {
    if (str_contains($typesString, 'LocalBusiness')) $archetypeScore += 15;
    if (str_contains($typesString, 'PostalAddress') || str_contains($typesString, 'address')) $archetypeScore += 10;
    if (str_contains($typesString, 'GeoCoordinates') || str_contains($typesString, 'openingHours')) $archetypeScore += 10;
    if ($archetypeScore < 20) {
        $issues[] = [
            "severity" => "warning",
            "title" => "Lokale Signale unvollständig",
            "desc" => "Geo-Koordinaten, Öffnungszeiten oder vollständige Adress-Entitäten fehlen."
        ];
    }
} elseif ($detectedBusiness === 'PUBLISHER') {
    if (str_contains($typesString, 'Article') || str_contains($typesString, 'BlogPosting')) $archetypeScore += 15;
    if (str_contains($typesString, 'Person')) $archetypeScore += 10;
    if (str_contains($typesString, 'Organization')) $archetypeScore += 10;
} else { // B2B_SERVICE
    if (str_contains($typesString, 'Organization') || str_contains($typesString, 'ProfessionalService')) $archetypeScore += 15;
    if (str_contains($typesString, 'Service')) $archetypeScore += 10;
    if (str_contains($typesString, 'OfferCatalog') || str_contains($typesString, 'Offer')) $archetypeScore += 10;
    if ($archetypeScore < 20) {
        $issues[] = [
            "severity" => "warning",
            "title" => "Dienstleistungen nicht im Schema hinterlegt",
            "desc" => "Deine Service-Seiten haben keine 'Service'-Entität mit 'provider'-Verknüpfung."
        ];
    }
}

// Ebene 3: Entity Grounding & 2026 Standards (Max 25 Pkt)
if ($hasWikidata) {
    $groundingScore += 10;
} else {
    $issues[] = [
        "severity" => "info",
        "title" => "Kein Wikidata / Knowledge Graph Grounding",
        "desc" => "Wichtige Entitäten sind nicht über 'sameAs' mit Wikidata (Q-Nummern) oder Knowledge Graphs verankert."
    ];
}

if ($hasPersonOrgLink) {
    $groundingScore += 10;
} else {
    $issues[] = [
        "severity" => "warning",
        "title" => "Person und Unternehmen nicht verknüpft",
        "desc" => "Die handelnden Experten/Autoren sind nicht relational als Gründer oder Mitarbeiter mit der Organisation verbunden."
    ];
}

if (str_contains($typesString, 'SpeakableSpecification') || str_contains($typesString, 'speakable')) {
    $groundingScore += 5;
}

$totalScore = $foundationScore + $archetypeScore + $groundingScore;

// 11. GRAPH AST & SVG KNOTEN/KANTEN GENERIEREN
$nodes = [];
$edges = [];
$nodeIdMap = [];

$typeColors = [
    'Person' => '#3b82f6',
    'Organization' => '#a855f7',
    'LocalBusiness' => '#a855f7',
    'ProfessionalService' => '#a855f7',
    'Corporation' => '#a855f7',
    'WebSite' => '#f59e0b',
    'WebPage' => '#f59e0b',
    'ItemPage' => '#f59e0b',
    'AboutPage' => '#f59e0b',
    'ContactPage' => '#f59e0b',
    'Product' => '#10b981',
    'Service' => '#10b981',
    'Offer' => '#10b981',
    'OfferCatalog' => '#10b981',
    'Article' => '#10b981',
    'NewsArticle' => '#10b981',
    'BlogPosting' => '#10b981',
    'Blog' => '#f59e0b',
    'DefinedTermSet' => '#84cc16',
    'DefinedTerm' => '#84cc16',
    'Quotation' => '#84cc16',
    'SpeakableSpecification' => '#06b6d4'
];

// Sammle Entitäten
$rawEntities = [];
foreach ($allExtractedBlocks as $pageKey => $blocks) {
    foreach ($blocks as $block) {
        if (isset($block['_syntaxError'])) continue;
        $items = isset($block['@graph']) && is_array($block['@graph']) ? $block['@graph'] : [$block];
        foreach ($items as $item) {
            if (!is_array($item)) continue;
            $rawEntities[] = $item;
        }
    }
}

if (!empty($rawEntities)) {
    // Max 6 repräsentative Entitäten für sauberes Layout
    $sampledEntities = array_slice($rawEntities, 0, 6);
    $totalCount = count($sampledEntities);

    foreach ($sampledEntities as $idx => $ent) {
        $type = $ent['@type'] ?? 'Thing';
        if (is_array($type)) $type = reset($type);
        $name = $ent['name'] ?? ($ent['headline'] ?? $type);
        $id = $ent['@id'] ?? ("_node_" . $idx);
        $color = $typeColors[$type] ?? '#3b82f6';

        // Anordnung im Raster
        $col = $idx % 3;
        $row = (int)($idx / 3);
        $x = 120 + ($col * 240);
        $y = 110 + ($row * 140);

        $nodeObj = [
            'id' => $id,
            'label' => mb_substr((string)$name, 0, 20),
            'type' => (string)$type,
            'color' => $color,
            'x' => $x,
            'y' => $y,
            'isConnected' => $hasGraphContainer,
            'props' => array_intersect_key($ent, array_flip([
                '@type', '@id', 'name', 'headline', 'url', 'inLanguage', 'sameAs',
                'author', 'publisher', 'founder', 'provider', 'price', 'priceCurrency', 'address'
            ]))
        ];

        $nodes[] = $nodeObj;
        $nodeIdMap[$id] = $idx;
    }

    // Kanten suchen
    foreach ($sampledEntities as $idx => $ent) {
        foreach (['publisher', 'author', 'founder', 'provider', 'isPartOf', 'hasPart', 'parentOrganization', 'memberOf'] as $relProp) {
            if (!empty($ent[$relProp])) {
                $targetId = is_array($ent[$relProp]) ? ($ent[$relProp]['@id'] ?? null) : $ent[$relProp];
                if ($targetId && isset($nodeIdMap[$targetId]) && $nodeIdMap[$targetId] !== $idx) {
                    $edges[] = [
                        'from' => $idx,
                        'to' => $nodeIdMap[$targetId],
                        'label' => $relProp,
                        'solid' => true
                    ];
                }
            }
        }
    }

    // Falls keine Kanten und mehrere Entitäten vorhanden sind -> unverbundene Dateninseln
    if (empty($edges) && count($nodes) > 1) {
        for ($i = 0; $i < count($nodes) - 1; $i++) {
            $edges[] = [
                'from' => $i,
                'to' => $i + 1,
                'label' => 'isoliert',
                'solid' => false
            ];
        }
    }
}

// Ausgabe
echo json_encode([
    "success" => true,
    "targetDomain" => $parsedUrl['host'],
    "businessArchetype" => $detectedBusiness,
    "detectedBusiness" => $detectedBusiness,
    "scannedUrls" => $scannedUrls,
    "stats" => [
        "totalScriptTags" => $totalScriptTags,
        "uniqueEntityTypes" => count($detectedTypes),
        "hasGraphContainer" => $hasGraphContainer
    ],
    "healthScore" => [
        "total" => $totalScore,
        "breakdown" => [
            "foundation" => ["score" => $foundationScore, "max" => 40],
            "archetype" => ["score" => $archetypeScore, "max" => 35],
            "grounding" => ["score" => $groundingScore, "max" => 25]
        ]
    ],
    "issues" => $issues,
    "nodes" => $nodes,
    "edges" => $edges,
    "discoveredEntities" => $discoveredEntities,
    "allBlocks" => $allExtractedBlocks
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

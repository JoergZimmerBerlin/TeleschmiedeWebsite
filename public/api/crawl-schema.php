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

// Rekursive Funktion zur vollständigen Erfassung aller verschachtelten Typen und Eigenschaften
function collectNestedSchemaData(array $data, array &$allTypes, array &$allProps, bool &$hasWikidata): void {
    if (isset($data['@type'])) {
        $t = $data['@type'];
        if (is_array($t)) {
            foreach ($t as $subT) {
                if (is_string($subT)) $allTypes[] = $subT;
            }
        } elseif (is_string($t)) {
            $allTypes[] = $t;
        }
    }
    if (!empty($data['sameAs'])) {
        $sameAsVal = is_array($data['sameAs']) ? implode(' ', $data['sameAs']) : (string)$data['sameAs'];
        if (strpos($sameAsVal, 'wikidata.org') !== false || strpos($sameAsVal, 'google.com/search?kgmid') !== false) {
            $hasWikidata = true;
        }
    }
    foreach ($data as $k => $v) {
        $allProps[] = (string)$k;
        if (is_array($v)) {
            collectNestedSchemaData($v, $allTypes, $allProps, $hasWikidata);
        }
    }
}

// 9. ENTITÄTEN-PARSER & BEZIEHUNGS-ANALYSE
$discoveredEntities = [];
$totalScriptTags = 0;
$hasGraphContainer = false;
$hasIds = false;
$hasInLanguage = false;
$detectedTypes = [];
$allNestedTypes = [];
$allProperties = [];
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

            $itemTypes = [];
            $itemProps = [];
            collectNestedSchemaData($item, $itemTypes, $itemProps, $hasWikidata);

            $type = $item['@type'] ?? 'Unknown';
            if (is_array($type)) $type = implode('/', $type);
            $detectedTypes[] = $type;
            foreach ($itemTypes as $it) {
                $allNestedTypes[] = $it;
            }
            foreach ($itemProps as $ip) {
                $allProperties[] = $ip;
            }

            if (!empty($item['@id'])) {
                $hasIds = true;
            }
            if (!empty($item['inLanguage'])) {
                $hasInLanguage = true;
            }
            if (!empty($item['sameAs'])) {
                $sameAsVal = is_array($item['sameAs']) ? implode(' ', $item['sameAs']) : (string)$item['sameAs'];
                if (strpos($sameAsVal, 'wikidata.org') !== false || strpos($sameAsVal, 'google.com/search?kgmid') !== false) {
                    $hasWikidata = true;
                }
            }

            // Person-Organization-Link prüfen
            if (in_array($type, ['Person', 'Organization', 'LocalBusiness', 'ProfessionalService']) ||
                in_array('Person', $itemTypes) || in_array('Organization', $itemTypes) || in_array('ProfessionalService', $itemTypes) || in_array('LocalBusiness', $itemTypes)) {
                if (!empty($item['founder']) || !empty($item['author']) || !empty($item['worksFor']) || !empty($item['memberOf'])) {
                    $hasPersonOrgLink = true;
                }
            }

            $discoveredEntities[] = [
                'type' => $type,
                'id' => $item['@id'] ?? null,
                'name' => $item['name'] ?? ($item['headline'] ?? $type),
                'page' => $pageKey,
                'properties' => array_unique(array_merge(array_keys($item), $itemProps))
            ];
        }
    }
}

$allUniqueTypes = array_unique(array_merge($detectedTypes, $allNestedTypes));
$allProperties = array_unique($allProperties);
$typesString = implode(' ', $allUniqueTypes);
$propsString = implode(' ', $allProperties);

// 10. DETERMINISTISCHE 12-SCHIENEN BUSINESS-ARCHETYPEN-ERKENNUNG (WEIGHTED SCORING)
$scores = [
    'FREELANCER_COACH' => 0, // Schiene 1: Freiberufler, Coaches & Solopreneure
    'LOCAL_CRAFT'      => 0, // Schiene 2: Handwerk, Meisterbetriebe & Lokales Gewerbe
    'B2B_SERVICE'      => 0, // Schiene 3: B2B Dienstleister, Beratungen, Agenturen & Kanzleien
    'ECOMMERCE'        => 0, // Schiene 4: Online-Shops, D2C-Brands & Produkthersteller
    'TECH_SAAS'        => 0, // Schiene 5: SaaS, Cloud-Plattformen & KI-Tools
    'CORPORATE_ORG'    => 0, // Schiene 6: Mittelstand, Industrie & Konzerne (Holdings)
    'PUBLISHER'        => 0, // Schiene 7: Publisher, Verlage, Fachmedien & Blogs
    'HEALTHCARE'       => 0, // Schiene 8: Praxen, Ärzte & Kliniken
    'HOSPITALITY'      => 0, // Schiene 9: Gastronomie & Hotellerie
    'EDUCATION'        => 0, // Schiene 10: Bildungsträger, Akademien & Universitäten
    'NGO_NONPROFIT'    => 0, // Schiene 11: Gemeinnützige Träger, Vereine & NGOs
    'GOVERNMENT'       => 0  // Schiene 12: Behörden & Öffentliche Stellen
];

// Schiene 8: HEALTHCARE (Ärzte, Praxen, Kliniken, Therapeuten)
$healthcareTypes = ['MedicalBusiness', 'Physician', 'Dentist', 'MedicalClinic', 'Hospital', 'Pharmacy', 'PhysicalTherapy', 'MedicalOrganization', 'DiagnosticLab'];
foreach ($healthcareTypes as $ht) {
    if (in_array($ht, $allUniqueTypes)) $scores['HEALTHCARE'] += 60;
}
if (in_array('medicalSpecialty', $allProperties)) $scores['HEALTHCARE'] += 40;

// Schiene 9: HOSPITALITY (Gastronomie, Restaurants, Hotels)
$hospitalityTypes = ['FoodEstablishment', 'Restaurant', 'CafeOrCoffeeShop', 'BarOrPub', 'FastFoodRestaurant', 'Bakery', 'Brewery', 'Winery', 'LodgingBusiness', 'Hotel', 'Motel', 'BedAndBreakfast', 'Resort'];
foreach ($hospitalityTypes as $ht) {
    if (in_array($ht, $allUniqueTypes)) $scores['HOSPITALITY'] += 60;
}
if (in_array('servesCuisine', $allProperties) || in_array('menu', $allProperties) || in_array('acceptsReservations', $allProperties)) $scores['HOSPITALITY'] += 40;

// Schiene 10: EDUCATION (Bildungsträger, Akademien, Universitäten)
$educationTypes = ['EducationalOrganization', 'CollegeOrUniversity', 'School', 'HighSchool', 'MiddleSchool', 'ElementarySchool', 'Preschool'];
foreach ($educationTypes as $et) {
    if (in_array($et, $allUniqueTypes)) $scores['EDUCATION'] += 60;
}
if (in_array('Course', $allUniqueTypes) || in_array('CourseInstance', $allUniqueTypes)) $scores['EDUCATION'] += 35;
if (in_array('educationalCredentialAwarded', $allProperties) || in_array('courseCode', $allProperties)) $scores['EDUCATION'] += 25;

// Schiene 11: NGO_NONPROFIT (Gemeinnützige Vereine, Stiftungen, NGOs)
$ngoTypes = ['NGO', 'Nonprofit501cOrganization'];
foreach ($ngoTypes as $nt) {
    if (in_array($nt, $allUniqueTypes)) $scores['NGO_NONPROFIT'] += 70;
}
if (strpos($propsString, 'Vereinsregister') !== false || strpos($typesString, 'Nonprofit') !== false) $scores['NGO_NONPROFIT'] += 30;

// Schiene 12: GOVERNMENT (Behörden, Öffentliche Verwaltungen, Kammern)
$govTypes = ['GovernmentOrganization', 'GovernmentOffice', 'GovernmentService'];
foreach ($govTypes as $gt) {
    if (in_array($gt, $allUniqueTypes)) $scores['GOVERNMENT'] += 70;
}

// Schiene 4: ECOMMERCE (Online-Shops, D2C, Marktplätze)
$ecomTypes = ['OnlineStore', 'Product', 'ProductGroup', 'IndividualProduct', 'SomeProducts'];
foreach ($ecomTypes as $ect) {
    if (in_array($ect, $allUniqueTypes)) $scores['ECOMMERCE'] += 40;
}
if (in_array('OnlineStore', $allUniqueTypes)) $scores['ECOMMERCE'] += 40;
if (in_array('hasMerchantReturnPolicy', $allProperties) || in_array('shippingDetails', $allProperties)) $scores['ECOMMERCE'] += 35;
if (in_array('offers', $allProperties) && (in_array('price', $allProperties) || in_array('priceCurrency', $allProperties))) $scores['ECOMMERCE'] += 25;

// Schiene 5: TECH_SAAS (SaaS, Cloud-Plattformen, KI-Tools, Software)
$saasTypes = ['SoftwareApplication', 'WebApplication', 'MobileApplication', 'SoftwareSourceCode', 'APIReference'];
foreach ($saasTypes as $st) {
    if (in_array($st, $allUniqueTypes)) $scores['TECH_SAAS'] += 50;
}
if (in_array('applicationCategory', $allProperties) || in_array('operatingSystem', $allProperties)) $scores['TECH_SAAS'] += 25;
if (in_array('featureList', $allProperties) || in_array('softwareVersion', $allProperties)) $scores['TECH_SAAS'] += 20;

// Schiene 7: PUBLISHER (Verlage, Magazine, Blogs, News-Portale)
$pubTypes = ['NewsMediaOrganization', 'Periodical', 'PublicationIssue', 'NewsArticle'];
foreach ($pubTypes as $pt) {
    if (in_array($pt, $allUniqueTypes)) $scores['PUBLISHER'] += 50;
}
if (in_array('Article', $allUniqueTypes) || in_array('BlogPosting', $allUniqueTypes)) $scores['PUBLISHER'] += 25;
if (in_array('speakable', $allProperties) || in_array('dateline', $allProperties)) $scores['PUBLISHER'] += 20;

// Schiene 2: LOCAL_CRAFT (Handwerk, Meisterbetriebe, Lokales Gewerbe)
$craftTypes = [
    'HomeAndConstructionBusiness', 'Plumber', 'Electrician', 'RoofingContractor',
    'GeneralContractor', 'Locksmith', 'HVACBusiness', 'PaintingService', 'AutomotiveBusiness',
    'AutoRepair', 'Store', 'HardwareStore', 'DryCleaningOrLaundry'
];
foreach ($craftTypes as $ct) {
    if (in_array($ct, $allUniqueTypes)) $scores['LOCAL_CRAFT'] += 60;
}
if (in_array('LocalBusiness', $allUniqueTypes)) {
    // Falls LocalBusiness vorhanden ist, aber KEIN ProfessionalService oder Software vorliegt
    if (!in_array('ProfessionalService', $allUniqueTypes) && !in_array('SoftwareApplication', $allUniqueTypes)) {
        $scores['LOCAL_CRAFT'] += 40;
    } else {
        $scores['LOCAL_CRAFT'] += 15; // Positives Support-Signal bei Hybrid-B2B
    }
}
if (in_array('openingHoursSpecification', $allProperties) || in_array('openingHours', $allProperties)) $scores['LOCAL_CRAFT'] += 15;
if (in_array('geo', $allProperties)) $scores['LOCAL_CRAFT'] += 10;

// Schiene 3: B2B_SERVICE (Dienstleister, Beratungen, Agenturen, Kanzleien)
$b2bTypes = ['ProfessionalService', 'Consulting', 'LegalService', 'AccountingService', 'FinancialService', 'EmploymentAgency'];
foreach ($b2bTypes as $bt) {
    if (in_array($bt, $allUniqueTypes)) $scores['B2B_SERVICE'] += 55;
}
if (in_array('Service', $allUniqueTypes)) $scores['B2B_SERVICE'] += 30;
if (in_array('hasOfferCatalog', $allProperties) || in_array('serviceType', $allProperties)) $scores['B2B_SERVICE'] += 25;
if (in_array('knowsAbout', $allProperties)) $scores['B2B_SERVICE'] += 20;
if (in_array('areaServed', $allProperties)) $scores['B2B_SERVICE'] += 15;

// Schiene 1: FREELANCER_COACH (Freiberufler, Einzelunternehmer, Coaches, Speaker)
if (in_array('Person', $allUniqueTypes)) {
    $scores['FREELANCER_COACH'] += 25;
    if (in_array('hasOccupation', $allProperties) || in_array('Occupation', $allUniqueTypes)) $scores['FREELANCER_COACH'] += 35;
    if (in_array('alumniOf', $allProperties)) $scores['FREELANCER_COACH'] += 15;
    if (!in_array('Corporation', $allUniqueTypes) && !in_array('OnlineStore', $allUniqueTypes)) {
        $scores['FREELANCER_COACH'] += 15;
    }
}

// Schiene 6: CORPORATE_ORG (Mittelstand, Industrie & Konzerne)
if (in_array('Corporation', $allUniqueTypes)) $scores['CORPORATE_ORG'] += 50;
if (in_array('parentOrganization', $allProperties) || in_array('subOrganization', $allProperties) || in_array('department', $allProperties)) $scores['CORPORATE_ORG'] += 35;
if (in_array('numberOfEmployees', $allProperties)) $scores['CORPORATE_ORG'] += 20;
if (in_array('Organization', $allUniqueTypes) && !in_array('LocalBusiness', $allUniqueTypes) && !in_array('ProfessionalService', $allUniqueTypes) && !in_array('OnlineStore', $allUniqueTypes)) {
    $scores['CORPORATE_ORG'] += 30;
}

// Sieger ermitteln
arsort($scores);
$detectedBusiness = array_key_first($scores);
$maxScore = reset($scores);

if ($maxScore <= 0) {
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

// Ebene 2: Differenzierter 12-Schienen Archetypen-Fit (Max 35 Pkt)
switch ($detectedBusiness) {
    case 'ECOMMERCE':
        if (strpos($typesString, 'Product') !== false || in_array('OnlineStore', $allUniqueTypes)) $archetypeScore += 15;
        if (strpos($typesString, 'Offer') !== false || in_array('offers', $allProperties)) $archetypeScore += 10;
        if (in_array('hasMerchantReturnPolicy', $allProperties) || in_array('shippingDetails', $allProperties) || in_array('brand', $allProperties) || strpos($typesString, 'AggregateRating') !== false) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Unvollständiges E-Commerce Schema",
                "desc" => "Produkte haben keine verknüpften Offers (Preis/Verfügbarkeit) oder Rückgaberichtlinien (MerchantReturnPolicy)."
            ];
        }
        break;

    case 'LOCAL_CRAFT':
        if (in_array('LocalBusiness', $allUniqueTypes) || !empty(array_intersect($allUniqueTypes, $craftTypes))) $archetypeScore += 15;
        if (in_array('PostalAddress', $allUniqueTypes) || in_array('address', $allProperties)) $archetypeScore += 10;
        if (in_array('GeoCoordinates', $allUniqueTypes) || in_array('geo', $allProperties) || in_array('openingHoursSpecification', $allProperties) || in_array('openingHours', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Lokale Handwerks-Signale unvollständig",
                "desc" => "Geo-Koordinaten, Öffnungszeiten oder vollständige Adress-Entitäten fehlen im LocalBusiness-Schema."
            ];
        }
        break;

    case 'TECH_SAAS':
        if (in_array('SoftwareApplication', $allUniqueTypes) || in_array('WebApplication', $allUniqueTypes)) $archetypeScore += 15;
        if (in_array('offers', $allProperties) || in_array('applicationCategory', $allProperties)) $archetypeScore += 10;
        if (in_array('featureList', $allProperties) || in_array('operatingSystem', $allProperties) || in_array('softwareVersion', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "SaaS-Produktattribute unvollständig",
                "desc" => "Deine SoftwareApplication hat keine Preispläne ('offers') oder Funktionslisten ('featureList') im Schema."
            ];
        }
        break;

    case 'HEALTHCARE':
        if (!empty(array_intersect($allUniqueTypes, $healthcareTypes))) $archetypeScore += 15;
        if (in_array('PostalAddress', $allUniqueTypes) || in_array('address', $allProperties)) $archetypeScore += 10;
        if (in_array('openingHoursSpecification', $allProperties) || in_array('geo', $allProperties) || in_array('medicalSpecialty', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Praxisdaten unvollständig",
                "desc" => "Sprechzeiten ('openingHoursSpecification'), Geo-Koordinaten oder die medizinische Fachrichtung fehlen."
            ];
        }
        break;

    case 'HOSPITALITY':
        if (!empty(array_intersect($allUniqueTypes, $hospitalityTypes))) $archetypeScore += 15;
        if (in_array('PostalAddress', $allUniqueTypes) || in_array('address', $allProperties)) $archetypeScore += 10;
        if (in_array('servesCuisine', $allProperties) || in_array('menu', $allProperties) || in_array('openingHoursSpecification', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Gastronomie-Attribute unvollständig",
                "desc" => "Speisekarte ('menu'), Küchenstil ('servesCuisine') oder Öffnungszeiten fehlen im Schema."
            ];
        }
        break;

    case 'EDUCATION':
        if (!empty(array_intersect($allUniqueTypes, $educationTypes)) || in_array('Course', $allUniqueTypes)) $archetypeScore += 15;
        if (in_array('educationalCredentialAwarded', $allProperties) || in_array('courseCode', $allProperties) || in_array('provider', $allProperties)) $archetypeScore += 10;
        if (in_array('hasCourseInstance', $allProperties) || in_array('alumni', $allProperties) || in_array('address', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Bildungsangebote nicht strukturiert",
                "desc" => "Kurse oder Studiengänge besitzen keine Kurs-Instanzen oder verknüpfte Zertifikats-Abschlüsse."
            ];
        }
        break;

    case 'NGO_NONPROFIT':
        if (!empty(array_intersect($allUniqueTypes, $ngoTypes))) $archetypeScore += 15;
        if (in_array('founder', $allProperties) || in_array('address', $allProperties) || in_array('identifier', $allProperties)) $archetypeScore += 10;
        if (in_array('nonprofitStatus', $allProperties) || in_array('contactPoint', $allProperties) || in_array('sameAs', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Gemeinnützigkeits-Signale unvollständig",
                "desc" => "Das NGO-Schema enthält keine Vereinsregister-Kennung ('identifier') oder Gründungsdaten."
            ];
        }
        break;

    case 'GOVERNMENT':
        if (!empty(array_intersect($allUniqueTypes, $govTypes))) $archetypeScore += 15;
        if (in_array('areaServed', $allProperties) || in_array('contactPoint', $allProperties)) $archetypeScore += 10;
        if (in_array('address', $allProperties) || in_array('service', $allProperties)) $archetypeScore += 10;
        break;

    case 'PUBLISHER':
        if (in_array('Article', $allUniqueTypes) || in_array('BlogPosting', $allUniqueTypes) || in_array('NewsArticle', $allUniqueTypes) || in_array('Periodical', $allUniqueTypes)) $archetypeScore += 15;
        if (in_array('Person', $allUniqueTypes) || in_array('author', $allProperties)) $archetypeScore += 10;
        if (in_array('Organization', $allUniqueTypes) || in_array('publisher', $allProperties) || in_array('speakable', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Redaktionelle Autorenschaft fehlt",
                "desc" => "Artikel enthalten keine relational verknüpften Autoren-Knoten ('author') mit Person-Schema."
            ];
        }
        break;

    case 'FREELANCER_COACH':
        if (in_array('Person', $allUniqueTypes)) $archetypeScore += 15;
        if (in_array('hasOccupation', $allProperties) || in_array('Occupation', $allUniqueTypes) || in_array('knowsAbout', $allProperties)) $archetypeScore += 10;
        if (in_array('worksFor', $allProperties) || in_array('founder', $allProperties) || in_array('sameAs', $allProperties) || in_array('alumniOf', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Experten-Profil nicht tief strukturiert",
                "desc" => "Die Person besitzt keine Berufsbezeichnung ('hasOccupation'), Fachgebiete ('knowsAbout') oder Gründungs-Relationen."
            ];
        }
        break;

    case 'CORPORATE_ORG':
        if (in_array('Corporation', $allUniqueTypes) || in_array('Organization', $allUniqueTypes)) $archetypeScore += 15;
        if (in_array('legalName', $allProperties) || in_array('identifier', $allProperties) || in_array('vatID', $allProperties)) $archetypeScore += 10;
        if (in_array('parentOrganization', $allProperties) || in_array('subOrganization', $allProperties) || in_array('numberOfEmployees', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Konzern-Struktur unvollständig",
                "desc" => "Handelsregister-Kennung ('identifier'), Rechtsform ('legalName') oder Mitarbeiterzahlen fehlen im Unternehmens-Schema."
            ];
        }
        break;

    default: // B2B_SERVICE
        if (in_array('Organization', $allUniqueTypes) || in_array('ProfessionalService', $allUniqueTypes)) $archetypeScore += 15;
        if (in_array('Service', $allUniqueTypes) || in_array('knowsAbout', $allProperties) || in_array('provider', $allProperties) || in_array('hasOfferCatalog', $allProperties)) $archetypeScore += 10;
        if (in_array('areaServed', $allProperties) || in_array('contactPoint', $allProperties) || in_array('geo', $allProperties) || in_array('openingHoursSpecification', $allProperties)) $archetypeScore += 10;
        if ($archetypeScore < 20) {
            $issues[] = [
                "severity" => "warning",
                "title" => "Dienstleistungen nicht im Schema hinterlegt",
                "desc" => "Deine Service-Seiten haben keine 'Service'-Entität mit 'provider'-Verknüpfung."
            ];
        }
        break;
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
    if ($detectedBusiness !== 'GOVERNMENT' && $detectedBusiness !== 'CORPORATE_ORG') {
        $issues[] = [
            "severity" => "warning",
            "title" => "Person und Unternehmen nicht verknüpft",
            "desc" => "Die handelnden Experten/Autoren sind nicht relational als Gründer oder Mitarbeiter mit der Organisation verbunden."
        ];
    } else {
        $groundingScore += 10; // Institutionelle Integrität
    }
}

if (strpos($typesString, 'SpeakableSpecification') !== false || in_array('speakable', $allProperties) || in_array('hasOccupation', $allProperties) || strpos($typesString, 'VideoObject') !== false || strpos($typesString, 'AudioObject') !== false) {
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
    'MedicalBusiness' => '#ec4899',
    'Physician' => '#ec4899',
    'Dentist' => '#ec4899',
    'Hospital' => '#ec4899',
    'FoodEstablishment' => '#f97316',
    'Restaurant' => '#f97316',
    'LodgingBusiness' => '#f97316',
    'EducationalOrganization' => '#6366f1',
    'Course' => '#6366f1',
    'NGO' => '#14b8a6',
    'Nonprofit501cOrganization' => '#14b8a6',
    'GovernmentOrganization' => '#64748b',
    'WebSite' => '#f59e0b',
    'WebPage' => '#f59e0b',
    'ItemPage' => '#f59e0b',
    'AboutPage' => '#f59e0b',
    'ContactPage' => '#f59e0b',
    'Product' => '#10b981',
    'OnlineStore' => '#10b981',
    'Service' => '#10b981',
    'Offer' => '#10b981',
    'OfferCatalog' => '#10b981',
    'Article' => '#10b981',
    'NewsArticle' => '#10b981',
    'BlogPosting' => '#10b981',
    'Blog' => '#f59e0b',
    'SoftwareApplication' => '#06b6d4',
    'DefinedTermSet' => '#84cc16',
    'DefinedTerm' => '#84cc16',
    'Quotation' => '#84cc16',
    'SpeakableSpecification' => '#06b6d4'
];

// Sammle Entitäten mit strikter Deduplizierung nach @id
$rawEntities = [];
$seenEntityIds = [];

foreach ($allExtractedBlocks as $pageKey => $blocks) {
    foreach ($blocks as $block) {
        if (isset($block['_syntaxError'])) continue;
        $items = isset($block['@graph']) && is_array($block['@graph']) ? $block['@graph'] : [$block];
        foreach ($items as $item) {
            if (!is_array($item)) continue;

            $id = $item['@id'] ?? null;
            if ($id && isset($seenEntityIds[$id])) {
                continue; // Verhindere doppelte Knoten über verschiedene Seiten hinweg!
            }
            if ($id) {
                $seenEntityIds[$id] = true;
            }
            $rawEntities[] = $item;
        }
    }
}

if (!empty($rawEntities)) {
    // Sortiere Entitäten nach semantischer Hierarchie für ein sauberes Layout
    $priorityOrder = [
        'Person' => 1,
        'Physician' => 1,
        'Dentist' => 1,
        'ProfessionalService' => 2,
        'Organization' => 2,
        'LocalBusiness' => 2,
        'Corporation' => 2,
        'MedicalBusiness' => 2,
        'FoodEstablishment' => 2,
        'Restaurant' => 2,
        'LodgingBusiness' => 2,
        'EducationalOrganization' => 2,
        'NGO' => 2,
        'Nonprofit501cOrganization' => 2,
        'GovernmentOrganization' => 2,
        'WebSite' => 3,
        'Service' => 4,
        'Product' => 4,
        'OnlineStore' => 4,
        'Course' => 4,
        'SoftwareApplication' => 4,
        'Blog' => 5,
        'Article' => 5,
        'NewsArticle' => 5,
        'BlogPosting' => 5,
        'DefinedTermSet' => 5,
        'Quotation' => 6,
        'DefinedTerm' => 6,
        'WebPage' => 7
    ];

    usort($rawEntities, function($a, $b) use ($priorityOrder) {
        $typeA = is_array($a['@type'] ?? '') ? reset($a['@type']) : ($a['@type'] ?? 'Thing');
        $typeB = is_array($b['@type'] ?? '') ? reset($b['@type']) : ($b['@type'] ?? 'Thing');
        $prioA = $priorityOrder[$typeA] ?? 99;
        $prioB = $priorityOrder[$typeB] ?? 99;
        return $prioA <=> $prioB;
    });

    // Max 6 repräsentative Entitäten für sauberes Layout
    $sampledEntities = array_slice($rawEntities, 0, 6);
    $totalCount = count($sampledEntities);

    // Architektonische Koordinaten für bis zu 6 Entitäten (analog zum Master-Graph):
    // Links: Person & Organization | Mitte: WebSite | Rechts: Services, Content, Zitate
    $layoutCoords = [
        0 => ['x' => 90,  'y' => 90],   // Node 0: Person / Autor
        1 => ['x' => 90,  'y' => 260],  // Node 1: Organization / Brand
        2 => ['x' => 280, 'y' => 175],  // Node 2: WebSite
        3 => ['x' => 470, 'y' => 90],   // Node 3: Service / Product
        4 => ['x' => 470, 'y' => 260],  // Node 4: Content / Blog
        5 => ['x' => 640, 'y' => 175]   // Node 5: Term / Quotation / Detail
    ];

    foreach ($sampledEntities as $idx => $ent) {
        $type = $ent['@type'] ?? 'Thing';
        if (is_array($type)) $type = reset($type);
        $name = $ent['name'] ?? ($ent['headline'] ?? $type);
        $id = $ent['@id'] ?? ("_node_" . $idx);
        $color = $typeColors[$type] ?? '#3b82f6';

        $x = $layoutCoords[$idx]['x'] ?? (120 + (($idx % 3) * 240));
        $y = $layoutCoords[$idx]['y'] ?? (110 + (((int)($idx / 3)) * 140));

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
                'author', 'publisher', 'founder', 'provider', 'price', 'priceCurrency',
                'address', 'geo', 'openingHoursSpecification', 'telephone', 'email',
                'knowsAbout', 'knowsLanguage', 'hasOccupation', 'slogan', 'currenciesAccepted',
                'medicalSpecialty', 'servesCuisine', 'menu', 'applicationCategory', 'operatingSystem',
                'hasMerchantReturnPolicy', 'shippingDetails', 'legalName', 'identifier', 'vatID',
                'taxID', 'aggregateRating', 'educationalCredentialAwarded', 'courseCode', 'featureList'
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

<?php
/**
 * IONOS .htaccess Aktivator
 * Erzeugt die .htaccess Datei serverseitig aus der htaccess.test Vorlage.
 * Dies umgeht SFTP-Protokollbeschränkungen für Punkt-Dateien.
 */

header('Content-Type: text/plain; charset=UTF-8');
echo "--- IONOS htaccess AKTIVATOR ---\n";

$source = 'htaccess.test';
$target = '.htaccess';

if (!file_exists($source)) {
    die("FEHLER: Quelldatei '$source' nicht gefunden! Bitte stelle sicher, dass sie hochgeladen wurde.\n");
}

// Lese Inhalt und entferne eventuelle Windows-Zeilenenden
$content = file_get_contents($source);
$content = str_replace("\r\n", "\n", $content);

if (file_put_contents($target, $content)) {
    echo "ERFOLG: '$target' wurde erfolgreich aus '$source' erzeugt.\n";
    echo "Berechtigungen: " . substr(sprintf('%o', fileperms($target)), -4) . "\n";
    echo "Aktivierungs-Zeit: " . date('Y-m-d H:i:s') . "\n";
} else {
    echo "FEHLER: Konnte '$target' nicht schreiben. Prüfe die Ordnerberechtigungen.\n";
}

// .well-known Aktivierung
echo "\n--- IONOS .well-known AKTIVATOR ---\n";
if (!file_exists('.well-known')) {
    if (mkdir('.well-known', 0755, true)) {
        echo "ERFOLG: Verzeichnis '.well-known' wurde erstellt.\n";
    } else {
        echo "FEHLER: Konnte Verzeichnis '.well-known' nicht erstellen.\n";
    }
} else {
    echo "INFO: Verzeichnis '.well-known' existiert bereits.\n";
}

$wellKnownFiles = ['mcp-server-card.json', 'ai-plugin.json', 'api-catalog'];
foreach ($wellKnownFiles as $file) {
    $srcFile = 'well-known-export/' . $file;
    $destFile = '.well-known/' . $file;
    if (file_exists($srcFile)) {
        if (copy($srcFile, $destFile)) {
            echo "ERFOLG: '$file' wurde in '.well-known' kopiert.\n";
        } else {
            echo "FEHLER: Konnte '$file' nicht in '.well-known' kopieren.\n";
        }
    } else {
        echo "INFO: Quelldatei '$srcFile' nicht gefunden (evtl. nicht hochgeladen).\n";
    }
}
?>

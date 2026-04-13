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
?>

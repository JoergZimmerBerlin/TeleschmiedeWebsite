<?php
header('Content-Type: text/plain; charset=UTF-8');

echo "--- IONOS DEBUG SCRIPT ---\n";
echo "Zeit: " . date('Y-m-d H:i:s') . "\n";
echo "Build-ID (Local): " . file_get_contents('build.txt') . "\n";
echo "Current File: " . __FILE__ . "\n";
echo "Root Dir: " . $_SERVER['DOCUMENT_ROOT'] . "\n";

echo "\n--- FILE LIST (ls -la) ---\n";
$files = scandir('.');
foreach ($files as $file) {
    $perms = fileperms($file);
    echo ($perms & 0x4000 ? 'd' : '-') . " " . sprintf('%o', $perms & 0777) . " " . $file . "\n";
}

echo "\n--- .htaccess CONTENT ---\n";
if (file_exists('.htaccess')) {
    echo file_get_contents('.htaccess');
} else {
    echo ".htaccess NOT FOUND!\n";
}

echo "\n--- htaccess.test CONTENT ---\n";
if (file_exists('htaccess.test')) {
    echo file_get_contents('htaccess.test');
} else {
    echo "htaccess.test NOT FOUND!\n";
}

echo "\n--- SERVER MODULES ---\n";
if (function_exists('apache_get_modules')) {
    print_r(apache_get_modules());
} else {
    echo "apache_get_modules() NOT AVAILABLE\n";
}

echo "\n--- REQUEST HEADERS ---\n";
if (function_exists('getallheaders')) {
    print_r(getallheaders());
} else {
    echo "getallheaders() NOT AVAILABLE\n";
}

echo "\n--- FULL SERVER VARIABLES (\$_SERVER) ---\n";
print_r($_SERVER);
?>

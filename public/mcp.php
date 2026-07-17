<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed, use POST for JSON-RPC"]);
    exit;
}

$input = file_get_contents('php://input');
$request = json_decode($input, true);

if (!$request || !isset($request['jsonrpc']) || $request['jsonrpc'] !== '2.0') {
    echo json_encode([
        "jsonrpc" => "2.0",
        "error" => ["code" => -32700, "message" => "Parse error"],
        "id" => null
    ]);
    exit;
}

$id = isset($request['id']) ? $request['id'] : null;
$method = isset($request['method']) ? $request['method'] : '';

if ($method === 'initialize') {
    echo json_encode([
        "jsonrpc" => "2.0",
        "result" => [
            "protocolVersion" => "2024-11-05",
            "capabilities" => [
                "resources" => new stdClass(),
                "tools" => new stdClass()
            ],
            "serverInfo" => [
                "name" => "teleschmiede-mcp",
                "version" => "1.0.0"
            ]
        ],
        "id" => $id
    ]);
} else {
    echo json_encode([
        "jsonrpc" => "2.0",
        "error" => ["code" => -32601, "message" => "Method not found"],
        "id" => $id
    ]);
}
?>

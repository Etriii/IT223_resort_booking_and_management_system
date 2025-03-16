<?php
require_once __DIR__ . '/config/Database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$db = new Database();
$conn = $db->connect();

if ($conn) {
    echo json_encode(["status" => "success", "message" => "Database connected"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database not connected"]);
}

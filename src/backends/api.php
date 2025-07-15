<?php
// Headers
header("Access-Control-Allow-Origin: http://localhost:5173");
// header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Core request wrapper
require_once __DIR__ . "/core/Request.php";

// Get controller and action
$controllerName = $_GET['controller'] ?? null; 
$action = $_GET['action'] ?? null;

if (!$controllerName || !$action) {
    http_response_code(400);
    echo json_encode(["error" => "Controller and action are required"]);
    exit;
}

// Deri ipang butang ang mga controllers, para ma han ay if naay mga controllers nga wa pa na register)
// $allowedControllers = ['User', 'Building', 'Room', 'Resort', 'Auth'];

// if (!in_array($controllerName, $allowedControllers)) {
//     http_response_code(404);
//     echo json_encode(["error" => "Controller not allowed"]);
//     exit;
// }

$controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";
$controllerClass = $controllerName . "Controller";

if (!file_exists($controllerFile)) {
    http_response_code(404);
    echo json_encode(["error" => "Controller file not found"]);
    exit;
}

require_once $controllerFile;

if (!class_exists($controllerClass)) {
    http_response_code(500);
    echo json_encode(["error" => "Controller class not found"]);
    exit;
} 

// Create controller instance
$controller = new $controllerClass();
$request = new Request();

// Check if method exists
if (!method_exists($controller, $action)) {
    http_response_code(404);
    echo json_encode(["error" => "Action method not found"]);
    exit;
}

// Run the action
try {
    call_user_func_array([$controller, $action], [$request]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["error" => "Internal server error", "message" => $e->getMessage()]);
}


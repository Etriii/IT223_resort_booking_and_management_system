<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
// Sample

// Get request parameters
$controllerName = $_GET['controller'] ?? null; // e.g., "User"
$action = $_GET['action'] ?? null; // e.g., "getUsers"

// Check if controller exists
$controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";

if ($controllerName && file_exists($controllerFile)) {
    require_once $controllerFile;

    $controllerClass = $controllerName . "Controller";
    $controller = new $controllerClass();

    if ($action && method_exists($controller, $action)) {
        $controller->$action();
    } else {
        echo json_encode(["error" => "Invalid action"]);
    }
} else {
    echo json_encode(["error" => "Invalid controller"]);
}

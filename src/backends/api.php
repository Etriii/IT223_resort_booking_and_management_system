<?php
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// header("Access-Control-Allow-Headers: Content-Type");
// // Sample

// // Get request parameters
// $controllerName = $_GET['controller'] ?? null; // e.g., "User"
// $action = $_GET['action'] ?? null; // e.g., "getUsers"

// // Check if controller exists
// $controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";

// if ($controllerName && file_exists($controllerFile)) {
//     require_once $controllerFile;

//     $controllerClass = $controllerName . "Controller";
//     $controller = new $controllerClass();

//     if ($action && method_exists($controller, $action)) {
//         $controller->$action();
//     } else {
//         echo json_encode(["error" => "Invalid action"]);
//     }
// } else {
//     echo json_encode(["error" => "Invalid controller"]);
// }

// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// header("Access-Control-Allow-Headers: Content-Type");

// $controllerName = $_GET['controller'] ?? null;
// $action = $_GET['action'] ?? null;

// $controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";

// if ($controllerName && file_exists($controllerFile)) {
//     require_once $controllerFile;
//     $controllerClass = $controllerName . "Controller";
//     $controller = new $controllerClass();

//     if ($action && method_exists($controller, $action)) {

//         if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//             if (isset($_GET['id'])) {
//                 $controller->$action($_GET['id']);
//             } else {
//                 $controller->$action();
//             }
//         } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
//             $controller->$action();
//         } else {
//             echo json_encode(["error" => "Unsupported request method"]);
//         }
//     } else {
//         echo json_encode(["error" => "Invalid action"]);
//     }
// } else {
//     echo json_encode(["error" => "Invalid controller"]);
// }


// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// header("Access-Control-Allow-Headers: Content-Type");

// // Get request parameters
// $controllerName = $_GET['controller'] ?? null;
// $action = $_GET['action'] ?? null;

// $controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";

// if ($controllerName && file_exists($controllerFile)) {
//     require_once $controllerFile;
//     $controllerClass = $controllerName . "Controller";
//     $controller = new $controllerClass();

//     if ($action && method_exists($controller, $action)) {
//         // Handle different request methods
//         switch ($_SERVER['REQUEST_METHOD']) {
//             case 'GET':
//                 $params = $_GET;
//                 break;

//             case 'POST':
//                 $params = json_decode(file_get_contents("php://input"), true) ?? $_POST;
//                 break;

//             case 'PUT':
//             case 'DELETE':
//                 $params = json_decode(file_get_contents("php://input"), true);
//                 if (!$params) {
//                     parse_str(file_get_contents("php://input"), $params);
//                 }
//                 break;

//             default:
//                 echo json_encode(["error" => "Unsupported request method"]);
//                 exit;
//         }

//         unset($params['controller'], $params['action']);

//         // Call the action dynamically with parameters
//         call_user_func_array([$controller, $action], $params);
//     } else {
//         echo json_encode(["error" => "Invalid action"]);
//     }
// } else {
//     echo json_encode(["error" => "Invalid controller"]);
// }


// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// header("Access-Control-Allow-Headers: Content-Type");

// require_once __DIR__ . "/core/Request.php";

// $controllerName = $_GET['controller'] ?? null;
// $action = $_GET['action'] ?? null;
// $controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";

// if ($controllerName && file_exists($controllerFile)) {
//     require_once $controllerFile;
//     $controllerClass = $controllerName . "Controller";
//     $controller = new $controllerClass();

//     if ($action && method_exists($controller, $action)) {
//         $request = new Request();
//         call_user_func_array([$controller, $action], [$_GET['id'] ?? null, $request]);
//     } else {
//         echo json_encode(["error" => "Invalid action"]);
//     }
// } else {
//     echo json_encode(["error" => "Invalid controller"]);
// }

// require_once 'Request.php';

// $controllerName = $_GET['controller'] ?? null;
// $action = $_GET['action'] ?? null;

// $controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";

// if ($controllerName && file_exists($controllerFile)) {
//     require_once $controllerFile;
//     $controllerClass = $controllerName . "Controller";
//     $controller = new $controllerClass();
//     $request = new Request(); // Capture the request

//     if ($action && method_exists($controller, $action)) {
//         call_user_func_array([$controller, $action], [$request]);
//     } else {
//         echo json_encode(["error" => "Invalid action"]);
//     }
// } else {
//     echo json_encode(["error" => "Invalid controller"]);
// }

// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// header("Access-Control-Allow-Headers: Content-Type");

// require_once __DIR__ . "/core/Request.php";

// $controllerName = $_GET['controller'] ?? null;
// $action = $_GET['action'] ?? null;
// $controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";

// if ($controllerName && file_exists($controllerFile)) {
//     require_once $controllerFile;
//     $controllerClass = $controllerName . "Controller";
//     $controller = new $controllerClass();

//     if ($action && method_exists($controller, $action)) {
//         $request = new Request();
//         $params = array_merge($_GET, $request->all()); // Merge all request data

//         // Call the controller method with all parameters
//         call_user_func_array([$controller, $action], array_merge($params, [$request]));
//     } else {
//         echo json_encode(["error" => "Invalid action"]);
//     }
// } else {
//     echo json_encode(["error" => "Invalid controller"]);
// }


// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// header("Access-Control-Allow-Headers: Content-Type");

// require_once __DIR__ . "/core/Request.php";

// $controllerName = $_GET['controller'] ?? null;
// $action = $_GET['action'] ?? null;

// if (!$controllerName || !$action) {
//     echo json_encode(["error" => "Controller and action required"]);
//     exit;
// }

// $controllerFile = __DIR__ . "/controllers/{$controllerName}Controller.php";

// if (!file_exists($controllerFile)) {
//     echo json_encode(["error" => "Invalid controller"]);
//     exit;
// }

// require_once $controllerFile;
// $controllerClass = $controllerName . "Controller";

// if (!class_exists($controllerClass)) {
//     echo json_encode(["error" => "Controller class not found"]);
//     exit;
// }

// $controller = new $controllerClass();
// $request = new Request();

// if (!method_exists($controller, $action)) {
//     echo json_encode(["error" => "Invalid action"]);
//     exit;
// }

// // Call the controller method with the request object
// call_user_func_array([$controller, $action], [$request]);



// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

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

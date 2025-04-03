<?php
// class Request
// {
//     private $data = [];

//     public function __construct()
//     {
//         switch ($_SERVER['REQUEST_METHOD']) {
//             case 'GET':
//                 $this->data = $_GET;
//                 break;
//             case 'POST':
//                 $this->data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
//                 break;
//             case 'PUT':
//             case 'DELETE':
//                 $this->data = json_decode(file_get_contents("php://input"), true);
//                 if (!$this->data) {
//                     parse_str(file_get_contents("php://input"), $this->data);
//                 }
//                 break;
//             default:
//                 $this->data = [];
//         }
//     }

//     public function all()
//     {
//         return $this->data;
//     }

//     public function get($key, $default = null)
//     {
//         return $this->data[$key] ?? $default;
//     }

//     public function has($key)
//     {
//         return isset($this->data[$key]);
//     }
// }

// class Request
// {
//     public $method;
//     public $headers;
//     public $params;

//     public function __construct()
//     {
//         $this->method = $_SERVER['REQUEST_METHOD'];
//         $this->headers = getallheaders();
//         $this->params = $this->getRequestParams();
//     }

//     private function getRequestParams()
//     {
//         switch ($this->method) {
//             case 'GET':
//                 return $_GET;

//             case 'POST':
//             case 'PUT':
//             case 'DELETE':
//                 $input = json_decode(file_get_contents("php://input"), true);
//                 return $input ?? $_POST;

//             default:
//                 return [];
//         }
//     }
// }

// class Request
// {
//     private array $data = [];

//     public function __construct()
//     {
//         // Merge GET parameters with request body
//         $this->data = array_merge($_GET, $this->parseInput());
//     }

//     private function parseInput()
//     {
//         $inputData = [];

//         switch ($_SERVER['REQUEST_METHOD']) {
//             case 'GET':
//                 return $_GET;
//             case 'POST':
//             case 'PUT':
//             case 'DELETE':
//                 // Read JSON or Form data
//                 $rawInput = file_get_contents("php://input");
//                 if (!empty($rawInput)) {
//                     $decoded = json_decode($rawInput, true);
//                     $inputData = $decoded ?? [];
//                 }

//                 // Handle URL-encoded form data if not JSON
//                 if (empty($inputData) && !empty($_POST)) {
//                     $inputData = $_POST;
//                 }

//                 // Handle `application/x-www-form-urlencoded` for PUT, DELETE
//                 if (empty($inputData) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
//                     parse_str($rawInput, $inputData);
//                 }
//                 break;
//         }

//         return $inputData;
//     }

//     public function all(): array
//     {
//         return $this->data;
//     }

//     public function get(string $key, $default = null)
//     {
//         // Support dot notation (e.g., `user.email`)
//         $keys = explode('.', $key);
//         $value = $this->data;

//         foreach ($keys as $part) {
//             if (!is_array($value) || !isset($value[$part])) {
//                 return $default;
//             }
//             $value = $value[$part];
//         }

//         return $value;
//     }

//     public function has(string $key): bool
//     {
//         return $this->get($key) !== null;
//     }
// }

class Request
{
    private $get;
    private $post;
    private $json;
    private $data;

    public function __construct()
    {
        $this->get = $_GET;
        $this->post = $_POST;
        $this->json = json_decode(file_get_contents("php://input"), true) ?? [];

        // Keep a merged version but do NOT override values
        $this->data = array_merge($this->json, $this->post, $this->get);
    }

    public function all()
    {
        return $this->data;
    }

    public function get($key, $default = null)
    {
        // Check priority order: GET > POST > JSON
        if (isset($this->get[$key])) {
            return $this->get[$key];
        }
        if (isset($this->post[$key])) {
            return $this->post[$key];
        }
        return $this->json[$key] ?? $default;
    }

    public function only($source, $key, $default = null)
    {
        return match ($source) {
            'get' => $this->get[$key] ?? $default,
            'post' => $this->post[$key] ?? $default,
            'json' => $this->json[$key] ?? $default,
            default => $default,
        };
    }
}

/* to get the request data
$id = $request->get('id'); // This follows priority: GET > POST > JSON
$getId = $request->only('get', 'id');  // Get only from $_GET
$postId = $request->only('post', 'id'); // Get only from $_POST
$jsonId = $request->only('json', 'id'); // Get only from JSON
*/

<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../core/Request.php';

class AuthController
{
    private $userModel;
    public function __construct()
    {
        $this->userModel = new User();
    }

    public function login(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        if (!$email || !$password) {
            echo json_encode(["error" => "Email and password are required"]);
            return;
        }

        $user_email = $this->userModel->getUserByEmail($email);

        if (!$user_email) {
            echo json_encode([
                'error' => [
                    'email' => 'Invalid email'
                ]
            ]);
            return;
        }

        $user = $this->userModel->getUserByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            echo json_encode([
                'error' => [
                    'password' => 'Invalid password'
                ]
            ]);
            return;
        }

        $this->userModel->logInUser($user['id']);

        echo json_encode(["message" => "Login successful", "user" => $user]);
    }

    public function register(Request $request)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $name = $data['username'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$name || !$email || !$password) {
            echo json_encode(["success" => false, "message" => "All fields are required"]);
            return;
        }

        if ($this->userModel->getUserByUsername($name)) {
            echo json_encode(["success" => false, "message" => "Username already exists"]);
            return;
        }

        if ($this->userModel->getUserByEmail($email)) {
            echo json_encode(["success" => false, "message" => "Email already exists"]);
            return;
        }

        $success = $this->userModel->createUser($name, $email, $password);

        if ($success) {
            echo json_encode(["success" => true, "message" => "User registered successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to register"]);
        }
    }


    // public function getUser()
    // {
    //     session_start();

    //     if (!isset($_SESSION['user_id'])) {
    //         echo json_encode(['error' => 'User Not Logged In']);
    //         return;
    //     }

    //     echo json_encode($this->userModel->getUserById($_SESSION['user_id']));
    // }

    public function getLoggedInUser()
    {
        if (isset($_COOKIE['user_id'])) {
            $token = $_COOKIE['user_id'];
            echo json_encode(["success" => true, "message" => "User id: " . htmlspecialchars($token)]);
            return;
        }
        echo json_encode(["success" => false, "message" => 'No User Currently Logged In']);
    }

    public function logout(Request $request)
    {
        $this->userModel->logOutUser($request->get('user_id'));
        // session_start();
        // session_destroy();

        echo json_encode(['message' => 'Logged out successfully']);
    }
    public function yes()
    {
        echo json_encode(['yes' => $this->userModel->yes()]);
    }
}

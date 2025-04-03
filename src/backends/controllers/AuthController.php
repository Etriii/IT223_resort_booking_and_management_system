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

        $user = $this->userModel->getUserByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            echo json_encode(["error" => "Invalid credentials"]);
            return;
        }

        echo json_encode(["message" => "Login successful", "user" => $user]);
    }

    public function register(Request $request)
    {
        $name = $request->get('name');
        $email = $request->get('email');
        $password = $request->get('password');

        if (!$name || !$email || !$password) {
            echo json_encode(["error" => "All fields are required"]);
            return;
        }

        if ($this->userModel->getUserByEmail($email)) {
            echo json_encode(["error" => "Email already exists"]);
            return;
        }

        $success = $this->userModel->createUser($name, $email, $password);

        if ($success) {
            echo json_encode(["message" => "User registered successfully"]);
        } else {
            echo json_encode(["error" => "Failed to register"]);
        }
    }
}

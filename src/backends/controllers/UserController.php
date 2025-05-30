<?php

require_once __DIR__ . '/../models/User.php';

class UserController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function getAllUsers()
    {
        echo json_encode($this->userModel->getAllUsers());
    }

    public function getUserById(Request $request)
    {
        $id = $request->get('id');
        if (!$id) {
            echo json_encode(["error" => "User ID is required"]);
            return;
        }

        echo json_encode($this->userModel->getUserById($id));
    }

    public function createUser(Request $request)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $username = $data['username'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $status = $data['status'] ?? 'active';

        if (!$username || !$email || !$password) {
            echo json_encode(["success" => false, "message" => "Username, email, and password are required"]);
            return;
        }

        if ($this->userModel->getUserByEmail($email)) {
            echo json_encode(["success" => false, "message" => "Email already exists"]);
            return;
        }

        $user_id = $this->userModel->createUser($username, $email, $password, $status);

        echo json_encode([
            "success" => true,
            "message" => "User created successfully",
            "user_id" => $user_id
        ]);
    }

    public function updateUser(Request $request)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $user_id = $data['id'] ?? null;
        $username = $data['username'] ?? null;
        $email = $data['email'] ?? null;
        $status = $data['status'] ?? 'active';

        if (!$user_id || !$username || !$email) {
            echo json_encode(["success" => false, "message" => "User ID, username, and email are required"]);
            return;
        }

        $success = $this->userModel->updateUser($user_id, $username, $email, $status);

        echo json_encode([
            "success" => $success,
            "message" => $success ? "User updated successfully" : "User update failed"
        ]);
    }

    public function deleteUser(Request $request)
    {
        $user_id = $request->get('user_id');
        if (!$user_id) {
            echo json_encode(["success" => false, "message" => "User ID is required"]);
            return;
        }

        $result = $this->userModel->deleteUser($user_id);

        echo json_encode([
            "success" => $result,
            "message" => $result ? "User deleted successfully" : "Failed to delete user"
        ]);
    }
}

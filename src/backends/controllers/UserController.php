<?php
require_once __DIR__ . '/../models/User.php';
// Sample
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

    public function getUserById($id)
    {
        echo json_encode($this->userModel->getUserById($id));
    }
}

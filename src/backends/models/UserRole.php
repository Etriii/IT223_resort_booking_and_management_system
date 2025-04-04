<?php

require_once __DIR__ . '/../config/Database.php';

class UserRole
{
    private $conn;
    private $table = 'user_roles';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getUserRoles($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE user_id = :user_id");
        $stmt->bindParam('user_id', $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

<?php
require_once __DIR__ . '/../config/Database.php';
// Sample

class User
{
    private $conn;
    private $table = "guests";

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getAllUsers()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

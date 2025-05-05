<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class Resorts
{
    private $conn;
    private $table = 'resorts';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getResorts()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getResortByName($name)
    {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE name = :name");
        $stmt->execute(['name' => $name]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createResort($data) {
        
    }
}

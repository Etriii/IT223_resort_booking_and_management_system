<?php

require_once __DIR__ . '/../config/Database.php';

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
}

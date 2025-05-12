<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class GuestDetail
{
    private $conn;
    private $table = 'guest_details';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getGuestDetails()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getConnection()
    {
        return $this->conn;
    }

    public function getTable()
    {
        return $this->table;
    }
}

<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class Review
{
    private $conn;
    private $table = 'reviews';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getReviews()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}

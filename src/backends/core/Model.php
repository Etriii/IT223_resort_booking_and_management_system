<?php

require_once __DIR__ . '/../config/Database.php';

class Model
{
    // private $table;
    // private $foreign_key;

    private $conn;
    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }
}

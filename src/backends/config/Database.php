<?php
// Sample

class Database
{
    private $host = "localhost";
    private $db_name = "ov";
    private $username = "root";
    private $password = "";
    private $conn = null;

    public function connect()
    {
        if ($this->conn === null) {
            try {
                $this->conn = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                die(json_encode(["error" => "Database Connection Failed: " . $e->getMessage()]));
            }
        }
        return $this->conn;
    }
}

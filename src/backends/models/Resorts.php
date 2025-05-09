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

    public function createResort($data)
    {

        $stmt = $this->conn->prepare("
        INSERT INTO {$this->table} 
        (`name`, `location`, `location_coordinates`, `tax_rate`, `status`, `contact_details`) 
        VALUES (:name, :location, :location_coordinates, :tax_rate, :status, :contact_details)
        ");

        return $stmt->execute([
            ':name' => $data['name'],
            ':location' => $data['location'],
            ':location_coordinates' => $data['location_coordinates'],
            ':tax_rate' => $data['tax_rate'],
            ':status' => $data['status'],
            ':contact_details' => $data['contact_details'],
        ]);
    }

    public function destroyResort($resort_id)
    {
        $stmt = $this->conn->prepare("DELETE FROM resorts WHERE id = :resort_id");
        return $stmt->execute(['resort_id' => $resort_id]);
    }

    public function getResortAdminsByResortId($resort_id)
    {
        $stmt = $this->conn->prepare("SELECT users.username, users.id, roles.role FROM user_roles LEFT JOIN users ON users.id = user_id LEFT JOIN roles ON roles.id = role_id  WHERE resort_id = :resort_id");
        $stmt->execute(['resort_id' => $resort_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

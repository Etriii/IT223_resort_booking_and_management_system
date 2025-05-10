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
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getResortByContactDetails($contact_details)
    {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE contact_details = :contact_details");
        $stmt->execute(['contact_details' => $contact_details]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
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

    public function updateResort($id, $data)
    {
        try {
            $setParts = [];
            $params = [];

            foreach ($data as $key => $value) {
                $setParts[] = "`$key` = :$key";
                $params[":$key"] = $value;
            }

            if (empty($setParts)) {
                return false;
            }

            $setClause = implode(', ', $setParts);
            $sql = "UPDATE {$this->table} SET $setClause WHERE id = :id";
            $params[':id'] = $id;

            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);

            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }



    public function destroyResort($resort_id)
    {
        $stmt = $this->conn->prepare("DELETE FROM resorts WHERE id = :resort_id");
        return $stmt->execute(['resort_id' => $resort_id]);
    }

    public function getResortAdminsByResortId($resort_id)
    {
        $stmt = $this->conn->prepare("SELECT user_roles.id, users.username, users.id as user_id, roles.role, resorts.name as resort_name FROM user_roles LEFT JOIN users ON users.id = user_id LEFT JOIN roles ON roles.id = role_id LEFT JOIN resorts ON resorts.id = user_roles.resort_id  WHERE resort_id = :resort_id");
        $stmt->execute(['resort_id' => $resort_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

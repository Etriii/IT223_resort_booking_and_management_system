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


    public function getDetailsByResortId($resort_id)
    {
        $stmt = $this->conn->prepare("
        SELECT r.id, r.resort_description, r.room_description,
               GROUP_CONCAT(ra.amenity SEPARATOR ', ') AS amenities
        FROM resorts r
        LEFT JOIN resort_amenities ra ON ra.resort_id = r.id
        WHERE r.id = :resort_id
        GROUP BY r.id
    ");

        $stmt->bindParam(':resort_id', $resort_id, PDO::PARAM_INT);

        if (!$stmt->execute()) {
            $errorInfo = $stmt->errorInfo();
            throw new Exception("SQL error: " . implode(", ", $errorInfo));
        }

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result;
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



    public function getResortById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM resorts WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function uploadResortImageById($id, $imageField, $image)
    {

        $allowedFields = ['image1', 'image1_2', 'image1_3', 'main_image', 'image2', 'image3', 'room_image_1', 'room_image_2', 'room_image_3'];
        if (!in_array($imageField, $allowedFields)) {
            return false;
        }

        $stmt = $this->conn->prepare("
        UPDATE " . $this->table . " SET `$imageField` = :image WHERE id = :id");

        return $stmt->execute([
            ':image' => $image,
            ':id' => $id,
        ]);
    }
    public function getTotalRoomsByResort($resort_id)
    {
        $stmt = $this->conn->prepare("SELECT
    r.id AS ResortID,
    r.name AS ResortName,
    t.TotalRooms,
    t.TotalBuildings,
    t.TotalFloors,
    rt.name AS RoomType,
    COUNT(ro.id) AS RoomTypeCount

FROM " . $this->table . " r

LEFT JOIN rooms ro ON ro.resort_id = r.id
LEFT JOIN room_types rt ON ro.room_type_id = rt.id
LEFT JOIN (
    SELECT 
        r2.id AS ResortID,
        COUNT(DISTINCT ro2.id) AS TotalRooms,
        COUNT(DISTINCT b.id) AS TotalBuildings,
        SUM(DISTINCT b.floor_count) AS TotalFloors
    FROM resorts r2
    LEFT JOIN rooms ro2 ON ro2.resort_id = r2.id
    LEFT JOIN buildings b ON b.resort_id = r2.id
    GROUP BY r2.id
) AS t ON t.ResortID = r.id

WHERE r.id = :resort_id

GROUP BY r.id, r.name, rt.name, t.TotalRooms, t.TotalBuildings, t.TotalFloors
ORDER BY rt.name;
");
        $stmt->execute(['resort_id' => $resort_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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

    public function getTaxRateByBuildingId($building_id)
    {
        if ($building_id <= 0) {
            return null;
        }

        $sql = "SELECT r.tax_rate
            FROM buildings b
            JOIN resorts r ON b.resort_id = r.id
            WHERE b.id = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$building_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return floatval($row['tax_rate']);
        }

        return null;
    }
}

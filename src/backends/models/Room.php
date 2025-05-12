<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class Room
{
    private $conn;
    private $table = 'rooms';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getRooms()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create() {}

    public function getRoomById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAvailableRooms($data)
    {
        $sql = "
        SELECT rooms.*
        FROM rooms
        WHERE rooms.building_id = :building_id
          AND rooms.id NOT IN (
            SELECT room_id
            FROM bookings
            WHERE status NOT IN ('Cancelled', 'Completed')
              AND check_in < :check_out
              AND check_out > :check_in
        )
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':building_id' => $data['building_id'],
            ':check_in' => $data['check_in'],
            ':check_out' => $data['check_out'],
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getRoomsByBuildingId($building_id)
    {
        $stmt = $this->conn->prepare("
            SELECT 
                r.*, 
                rt.name AS room_type_name,
                rt.description AS room_type_description,
                rt.capacity AS room_type_capacity,
                b.name AS building_name,
                b.resort_id,
                resorts.name AS resort_name
            FROM rooms AS r
            LEFT JOIN room_types rt ON r.room_type_id = rt.id
            LEFT JOIN buildings b ON r.building_id = b.id
            LEFT JOIN resorts ON b.resort_id = resorts.id
            WHERE r.building_id = :building_id
        ");
    
        $stmt->bindParam(':building_id', $building_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTotalRoomsByResortId($resort_id){
        $stmt = $this->conn->prepare("
        SELECT COUNT(r.id) AS Total_Rooms
        FROM ".$this->table. " r
        JOIN room_types rt ON r.room_type_id = rt.id
        JOIN buildings b ON r.building_id = b.id
        WHERE b.resort_id = :resort_id;");
        $stmt->bindParam(':resort_id', $resort_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getOverlappingReservations($resort_id, $parsedCheckIn, $parsedCheckOut)
    {
        //para mawa ang error sakoa
        return [];
    }

    public function update() {}
    public function destroy() {}
}
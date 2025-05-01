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

    public function getRoomById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getRoomsByBuildingId($building_id, $start_date = null, $end_date = null, $status = null)
    {
        $stmt = $this->conn->prepare("
            SELECT 
                r.*, 
                rt.name AS room_type_name,
                rt.description AS room_type_description,
                rt.capacity AS room_type_capacity,
                b.name AS building_name
            FROM 
                rooms AS r
            LEFT JOIN 
                room_types rt ON r.room_type_id = rt.id
            LEFT JOIN 
                buildings b ON r.building_id = b.id
            WHERE 
                r.building_id = :building_id
        ");
    
        $stmt->bindParam(':building_id', $building_id, PDO::PARAM_INT);
        $stmt->execute();
        $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        return $rooms;
    }
    
    public function update() {}
    public function destroy() {}
}

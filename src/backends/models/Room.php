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

    public function getRoomById($id) {}

    public function getRoomsByBuildingId($building_id, $start_date = null, $end_date = null)
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
    
        if (!empty($start_date) && !empty($end_date)) {
            $bookingsStmt = $this->conn->prepare("
                SELECT room_id FROM bookings
                WHERE 
                    (check_in BETWEEN :check_in AND :check_out 
                    OR check_out BETWEEN :check_in AND :check_out
                    OR :check_in BETWEEN check_in AND check_out
                    OR :check_out BETWEEN check_in AND check_out)
            ");
            $bookingsStmt->bindParam(':check_in', $start_date, PDO::PARAM_STR);
            $bookingsStmt->bindParam(':check_out', $end_date, PDO::PARAM_STR);
            $bookingsStmt->execute();
    
            $bookedRoomIds = array_column($bookingsStmt->fetchAll(PDO::FETCH_ASSOC), 'room_id');
    
            $rooms = array_filter($rooms, function ($room) use ($bookedRoomIds) {
                return !in_array($room['id'], $bookedRoomIds);
            });
    
            $rooms = array_values($rooms);
        }
    
        return $rooms;
    }

    public function update() {}
    public function destroy() {}
}

<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class Room
{
    private $conn;
    private $table = 'room_types';

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
    public function getRoomsByBuildingId($building_id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE building_id =" . 1);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function update() {}
    public function destroy() {}
}

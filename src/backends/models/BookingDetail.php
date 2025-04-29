<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class BookingDetail 
{
    private $conn;
    private $table = 'booking_details';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getBookingDetails()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create() {}

    public function getBookingId($id) {}
    public function getBookingByResortId($resort_id) {}

    public function getBookingByRoomId($room_id) {}

    public function update() {}

    public function destroy() {}
}

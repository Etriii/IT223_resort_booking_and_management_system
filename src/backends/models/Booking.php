<?php

require_once __DIR__ . '/../config/Database.php';

class Booking
{
    private $conn;
    private $table = 'bookings';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getBookings()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create() {}

    public function getBookingId($id) {}
    public function getBookingByResortId($resort_id) {
       
    }

    public function getBookingByRoomId($room_id) {}
    
    public function update() {}

    public function destroy() {}
}

<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class BookingDetail
{
    private $conn;
    private $table = 'user_booking_details_view';

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
   public function getBookingDetailsByUserId($user_id)
    {
        $query = 'SELECT
                    bd.*,
                    b.user_id,
                    b.check_in,
                    b.check_out,
                    b.status,
                    r.room_name,
                    rt.name
                  FROM ' . $this->table . ' bd
                  JOIN bookings b ON bd.booking_id = b.id
                  JOIN rooms r ON b.room_id = r.id
                  JOIN room_types rt ON r.room_type_id = rt.id
                  WHERE b.user_id = :user_id
                  ORDER BY b.created_at DESC';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
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

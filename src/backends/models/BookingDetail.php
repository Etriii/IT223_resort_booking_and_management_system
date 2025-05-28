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
    ubdv.*,
    ps.status AS payment_submission_status_from_db
FROM user_booking_details_view ubdv
LEFT JOIN payment_submissions ps ON ubdv.booking_id = ps.booking_id
WHERE ubdv.user_id = :user_id';

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

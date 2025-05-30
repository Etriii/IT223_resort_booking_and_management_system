<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class Payment
{
    private $conn;
    private $table = 'payments';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function create() {}
    public function getPayments()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getPaymentsByUserId($user_id)
    {
        try {
            $query = '
            SELECT p.*, ps.status AS payment_submission_status
            FROM payments p
            INNER JOIN bookings b ON p.booking_id = b.id
            LEFT JOIN payment_submissions ps ON p.payment_submission_id = ps.id
            WHERE b.user_id = :user_id
        ';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            error_log("Error in getPaymentsByUserId: " . $e->getMessage());
            return [];
        }
    }

    public function getPaymentSubmissionsByBookingId($booking_id)
    {
        try {
            $query = '
            SELECT *
            FROM payment_submissions
            WHERE booking_id = :booking_id
        ';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':booking_id', $booking_id, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            error_log("Error in getPaymentSubmissionsByBookingId: " . $e->getMessage());
            return [];
        }
    }




    public function update() {}

    public function destroy() {}
}

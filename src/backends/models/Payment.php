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

    public function getPaymentsWithDetails($userId)
    {
        $stmt = $this->conn->prepare("
    SELECT 
        payments.id AS payment_id,
        payments.amount_paid,
        payments.payment_method,
        payments.created_at AS payment_date,
        bookings.status AS booking_status,
        users.username AS received_by
    FROM payments
    JOIN bookings ON payments.booking_id = bookings.id
    JOIN users ON payments.received_by = users.id
    WHERE bookings.user_id = :user_id
");
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPayments()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPaymentByBookingId($id) {}

    public function update() {}

    public function destroy() {}
}

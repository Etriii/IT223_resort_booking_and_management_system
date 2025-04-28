<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class PaymentSubmission
{
    private $conn;
    private $table = 'payment_submissions';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function create() {}

    public function getPaymentSubmission()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getPaymentSubmissionByBookingId($id) {}
    public function update() {}
    public function destroy() {}
}

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

   public function createPayment($data)
{
    try {
        error_log('Received payment data: ' . print_r($data, true));
        $stmt = $this->conn->prepare("
           CALL create_payment(
                :p_booking_id,
                :p_screenshot_path,
                :p_amount_paid,
                :p_reference_number,
                :p_status,
                :p_reviewed_by,
                :p_reviewed_at,
                :p_created_at,
                :p_updated_at
        )
    ");

        $stmt->bindValue(':p_booking_id', (int)$data['booking_id'], PDO::PARAM_INT);
        $stmt->bindValue(':p_screenshot_path', $data['screenshot_path'], PDO::PARAM_STR);
        $stmt->bindValue(':p_amount_paid', $data['amount_paid'], PDO::PARAM_STR);
        $stmt->bindValue(':p_reference_number', $data['reference_number'], PDO::PARAM_STR);
        $stmt->bindValue(':p_status', $data['status'], PDO::PARAM_STR);

        $stmt->bindValue(
            ':p_reviewed_by',
            $data['reviewed_by'] ?? null,
            ($data['reviewed_by'] === null) ? PDO::PARAM_NULL : PDO::PARAM_INT
        );
        $stmt->bindValue(
            ':p_reviewed_at',
            $data['reviewed_at'] ?? null,
            ($data['reviewed_at'] === null) ? PDO::PARAM_NULL : PDO::PARAM_STR
        );

        $now = date('Y-m-d H:i:s');
        $stmt->bindValue(':p_created_at', $now, PDO::PARAM_STR);
        $stmt->bindValue(':p_updated_at', $now, PDO::PARAM_STR);

        $stmt->execute();
        $stmt->closeCursor();

        return ['success' => true, 'message' => 'Payment submitted successfully.'];
    } catch (PDOException $e) {
        error_log("Payment submission failed: " . $e->getMessage()); 
        return [
            'success' => false,
            'message' => 'Failed to submit payment.',
            'error'   => $e->getMessage() 
        ];
    }
}

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

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

    public function update() {}
    public function destroy() {}

    public function getPaymentSubmissionByBookingId($booking_id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE booking_id = :booking_id LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':booking_id', $booking_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updatePaymentSubmissionStatus($data)
    {
        $reviewed_by = $_COOKIE['user_id'];
        $reviewed_at = date('Y-m-d H:i:s');

        // Update payment submission status and review info
        $stmt = $this->conn->prepare("
        UPDATE payment_submissions 
        SET status = ?, reviewed_by = ?, reviewed_at = ? 
        WHERE id = ?
    ");

        $stmt->execute([
            $data['status'],
            $reviewed_by,
            $reviewed_at,
            $data['payment_submission_id']
        ]);

        if ($data['status'] == 'rejected') {
            return [
                'updated_submission' => true,
                'added_payment' => false,
            ];
        } else {
            // Insert payment
            $stmt2 = $this->conn->prepare("
            INSERT INTO payments (booking_id, payment_method, amount_paid, received_by, payment_submission_id)
            VALUES (?, ?, ?, ?, ?)
        ");
            $stmt2->execute([
                $data['booking_id'],
                $data['payment_method'],
                $data['amount_paid'],
                $data['received_by'],
                $data['payment_submission_id']
            ]);

            // Update booking status to Confirmed
            $stmt3 = $this->conn->prepare("
            UPDATE bookings SET status = 'Confirmed' WHERE id = ?
        ");
            $stmt3->execute([$data['booking_id']]);

            return [
                'updated_submission' => true,
                'added_payment' => true,
                'booking_status_updated' => true,
            ];
        }
    }
}

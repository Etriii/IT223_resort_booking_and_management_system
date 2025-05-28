<?php

require_once __DIR__ . '/../models/PaymentSubmission.php';
require_once __DIR__ . '/../core/Request.php';

class PaymentSubmissionsController
{
    private $paymentSubmissionModel;

    public function __construct()
    {
        $this->paymentSubmissionModel = new PaymentSubmission();
    }

    public function getPaymentSubmission()
    {
        echo json_encode($this->paymentSubmissionModel->getPaymentSubmission());
    }

    public function createPayment(Request $request)
    {
        header('Content-Type: application/json');

        $inputJSON = file_get_contents('php://input');
        error_log("Raw input (PHP): " . $inputJSON);
        $input = json_decode($inputJSON, true);

        if ($input === null) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input or empty body']);
            exit;
        }

        $booking_id = $input['booking_id'] ?? null;
        $screenshot_path = $input['screenshot_path'] ?? null;
        $amount_paid = $input['amount_paid'] ?? null;
        $reference_number = $input['reference_number'] ?? 0;
        $status = $input['status'] ?? 'Pending';
        $reviewed_by = $input['reviewed_by'] ?? null;
        $reviewed_at = $input['reviewed_at'] ?? null;
        $created_at = $input['created_at'] ?? null;
        $updated_at = $input['updated_at'] ?? null;
        

        if (!$booking_id || !$screenshot_path || !$amount_paid || !$reference_number) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Missing required payment parameters.',
                'received_data' => $input
            ]);
            exit;
        }
        $now = date('Y-m-d H:i:s');

        $data = [
            'booking_id' => $booking_id,
            'screenshot_path' => $screenshot_path,
            'amount_paid' => $amount_paid,
            'reference_number' => $reference_number,
            'reviewed_by' => $reviewed_by,
            'reviewed_at' => $reviewed_at,
            'status' => $status,
            'created_at' => $now,
            'updated_at' => $now
        ];

        
        $result = $this->paymentSubmissionModel->createPayment($data);

        if ($result['success']) {
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => $result['message']]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $result['message'], 'error' => $result['error'] ?? '']);
        }
    }

    
}

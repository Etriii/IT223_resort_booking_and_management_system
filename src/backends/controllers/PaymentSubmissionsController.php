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


    public function getPaymentSubmissionByBookingId(Request $request)
    {
        $booking_id = $request->get('booking_id');
        if ($booking_id == null) {
            return;
        }
        echo json_encode($this->paymentSubmissionModel->getPaymentSubmissionByBookingId($booking_id));
    }

    public function updatePaymentSubmissionStatus(Request $request)
    {
        $formData = $request->get('formData');
        $payment_submission_id = $formData['id'] ?? null;
        $status = $formData['status'] ?? null;

        if ($payment_submission_id == null) {
            echo json_encode([
                'success' => false,
                'message' => 'payment_submission_id is required.'
            ]);
            return;
        }

        if ($status == null) {
            echo json_encode([
                'success' => false,
                'message' => 'Status is required.'
            ]);
            return;
        }

        if ($status === 'pending') {
            echo json_encode([
                'success' => false,
                'message' => 'Cannot update to pending.'
            ]);
            return;
        }

        if ($status === 'rejected') {
            // Perform the actual update
            $result = $this->paymentSubmissionModel->updatePaymentSubmissionStatus([
                'payment_submission_id' => $payment_submission_id,
                'status' => $status
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'You rejected a payment submission.',
                'data' => $result
            ]);
            return;
        }

        if ($status === 'approved') {
            // Add required fields
            $result = $this->paymentSubmissionModel->updatePaymentSubmissionStatus([
                'payment_submission_id' => $payment_submission_id,
                'status' => $status,
                'booking_id' => $formData['booking_id'],
                'payment_method' => 'GCash',
                'amount_paid' => $formData['amount_paid'],
                'received_by' => $_COOKIE['user_id']
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'You approved a payment submission.',
                'data' => $result
            ]);
            return;
        }

        echo json_encode([
            'success' => false,
            'message' => 'Invalid status.'
        ]);
    }
}

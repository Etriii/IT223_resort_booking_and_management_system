<?php

require_once __DIR__ . '/../models/BookingDetail.php';
require_once __DIR__ . '/../core/Request.php';

class BookingDetailsController
{
    private $bookingDetailModel;

    public function __construct()
    {
        
        $this->bookingDetailModel = new BookingDetail();
    }

    public function getBookingDetails(Request $request) 
    {
        $userId = $request->get('user_id');

        error_log("Received user_id in controller: " . var_export($userId, true));

        if (!$userId) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'User ID is required to fetch booking details.']);
            exit;
        }

        echo json_encode($this->bookingDetailModel->getBookingDetailsByUserId($userId));
    }
}
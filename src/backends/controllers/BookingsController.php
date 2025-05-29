<?php

require_once __DIR__ . '/../models/Booking.php';
require_once __DIR__ . '/../core/Request.php';

class BookingsController
{
    private $bookingsModel;

    public function __construct()
    {
        $this->bookingsModel = new Booking();
    }

    public function getBookings()
    {
        echo json_encode($this->bookingsModel->getBookings());
    }
    public function getBookingsByResortId(Request $request)
    {
        $resort_id = $request->get('resort_id');
        echo json_encode($this->bookingsModel->getBookingByResortId($resort_id));
    }
    public function getTotalBookingsByResortId(Request $request)
    {
        $resort_id = $request->get('resort_id');
        echo json_encode($this->bookingsModel->getTotalBookingsByResortId($resort_id));
    }
    public function createBooking()
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


        $user_id = $input['user_id'] ?? null;
        $room_id = $input['room_id'] ?? null;
        $check_in = $input['check_in'] ?? null;
        $check_out = $input['check_out'] ?? null;

        $price_per_night = $input['price_per_night'] ?? null;
        $nights = $input['nights'] ?? null;
        $discount = $input['discount'] ?? 0;
        $tax_rate = $input['tax_rate'] ?? 0;
        $status = $input['status'] ?? 'Pending';
        $total_amount = $input['total_amount'] ?? null;


        if (!$user_id || !$room_id || !$check_in || !$check_out || !$price_per_night || !$nights) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Missing required booking parameters. User ID, Room ID, Check-in, Check-out, Price per Night, and Nights are required.',
                'received_data' => $input
            ]);
            exit;
        }
        $now = date('Y-m-d H:i:s');
        $sub_total = (float)$price_per_night * (int)$nights;

        $data = [
            'user_id' => $user_id,
            'room_id' => $room_id,
            'check_in' => $check_in,
            'check_out' => $check_out,
            'price_per_night' => $price_per_night,
            'nights' => $nights,
            'discount' => $discount,
            'tax_rate' => $tax_rate,
            'sub_total' => $sub_total,
            'total_amount' => $total_amount,
            'status' => $status,
            'created_at' => $now,
            'updated_at' => $now
        ];

        $result = $this->bookingsModel->createBooking($data);

        if ($result['success']) {
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => $result['message']]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $result['message'], 'error' => $result['error'] ?? '']);
        }
    }
    public function getBookingsInRangeOf(Request $request)
    {
        $resort_id = $request->get('resort_id') ?? null;

        if (is_null($resort_id)) {
            // echo json_encode([
            //     'success' => false,
            //     'error' => 'Resort ID is required.'
            // ]);
            return;
        };

        $start_date = $request->get('start_date') ??  (new DateTime())->format('Y-m-d');
        $end_date = $request->get('end_date') ?? (new DateTime($start_date))->modify('+1 day')->format('Y-m-d');

        echo json_encode($this->bookingsModel->getBookingsInRangeOf(['check_in' => $start_date, 'check_out' => $end_date, 'resort_id' => $resort_id]));
    }
    public function getTotalAmountResortId(Request $request){
        $resort_id = $request->get('resort_id');
        echo json_encode($this->bookingsModel->getTotalAmountResortId($resort_id));
    }
    public function getBookingStats()
    {
        echo json_encode($this->bookingsModel->getBookingStats());
    }
}

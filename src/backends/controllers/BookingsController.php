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

    public function getBookingsInRangeOf(Request $request)
    {
        // $resort_id = $request->get('resort_id') ?? null;

        // if (is_null($resort_id)) {
        // echo json_encode([
        //     'success' => false,
        //     'error' => 'Resort ID is required.'
        // ]);
        //     return;
        // };

        // $today =  (new DateTime())->format('Y-m-d');
        // $start_date = $request->get('start_date') ?? $today;
        // $end_date = $request->get('start_date') ?? $today;

        // echo json_encode(['start_date' => $start_date, 'end_date' => $end_date, 'resort_id' => $resort_id]);
    }

    public function getBookingStats()
    {
        echo json_encode($this->bookingsModel->getBookingStats());
    }
}

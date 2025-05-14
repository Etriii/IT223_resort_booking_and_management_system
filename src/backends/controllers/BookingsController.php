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
        $today =  (new DateTime())->format('Y-m-d');
        $start_date = $today;
        echo json_encode(['none' => $start_date]);
    }
}

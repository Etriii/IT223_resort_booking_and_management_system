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

    public function getBookingDetails()
    {
        echo json_encode($this->bookingDetailModel->getBookingDetails());
    }
}

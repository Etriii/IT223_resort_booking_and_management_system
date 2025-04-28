<?php

require_once __DIR__ . '/../models/BookingDetail.php';
require_once __DIR__ . '/../core/Request.php';

class BookingDetailsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new BookingDetail();
    }

    public function getBookingDetails()
    {
        echo json_encode($this->eventsModel->getBookingDetails());
    }
}

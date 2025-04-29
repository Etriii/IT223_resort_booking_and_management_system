<?php

require_once __DIR__ . '/../models/Booking.php';
require_once __DIR__ . '/../core/Request.php';

class BookingsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Booking();
    }

    public function getBookings()
    {
        echo json_encode($this->eventsModel->getBookings());
    }
}

<?php

require_once __DIR__ . '/../models/GuestDetail.php';
require_once __DIR__ . '/../core/Request.php';

class GuestDetailsController
{
    private $guestDetailModel;

    public function __construct()
    {
        $this->guestDetailModel = new GuestDetail();
    }

    public function getGuestDetails()
    {
        echo json_encode($this->guestDetailModel->getGuestDetails());
    }
}

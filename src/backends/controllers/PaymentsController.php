<?php

require_once __DIR__ . '/../models/Payment.php';
require_once __DIR__ . '/../core/Request.php';

class PaymentsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Payment();
    }

    public function getPayments()
    {
        echo json_encode($this->eventsModel->getPayments());
    }
}

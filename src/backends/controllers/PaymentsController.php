<?php

require_once __DIR__ . '/../models/Payment.php';
require_once __DIR__ . '/../core/Request.php';

class PaymentsController
{
    private $paymentModel;

    public function __construct()
    {
        $this->paymentModel = new Payment();
    }

    public function getPayments()
    {
        echo json_encode($this->paymentModel->getPayments());
    }
}

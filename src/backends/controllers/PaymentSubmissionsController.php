<?php

require_once __DIR__ . '/../models/PaymentSubmission.php';
require_once __DIR__ . '/../core/Request.php';

class PaymentSubmissionsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new PaymentSubmission();
    }

    public function getPaymentSubmission()
    {
        echo json_encode($this->eventsModel->getPaymentSubmission());
    }

    public function create(Request $request) {}
}

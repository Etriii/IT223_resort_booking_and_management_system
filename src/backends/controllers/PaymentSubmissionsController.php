<?php

require_once __DIR__ . '/../models/PaymentSubmission.php';
require_once __DIR__ . '/../core/Request.php';

class PaymentSubmissionsController
{
    private $paymentSubmissionModel;

    public function __construct()
    {
        $this->paymentSubmissionModel = new PaymentSubmission();
    }

    public function getPaymentSubmission()
    {
        echo json_encode($this->paymentSubmissionModel->getPaymentSubmission());
    }

    public function create(Request $request) {}
}

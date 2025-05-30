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
    public function getPaymentsByUserId()
    {
        $user_id = $_GET['user_id'] ?? null;

        if (!$user_id) {
            echo json_encode(['error' => 'Missing user_id']);
            return;
        }

        $payments = $this->paymentModel->getPaymentsByUserId($user_id);
        echo json_encode($payments);
    }
}

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
    header('Content-Type: application/json');

    if (!isset($_COOKIE['user_id'])) {
        echo json_encode(['error' => 'User not logged in']);
        return;
    }

    $userId = $_COOKIE['user_id'];
    echo json_encode($this->paymentModel->getPaymentsWithDetails($userId));
}

}

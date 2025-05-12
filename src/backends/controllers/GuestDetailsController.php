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

    public function updateGuestDetails()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data)) {
            echo json_encode(['error' => 'No data provided']);
            return;
        }

        $user_id = $data['user_id'];
        $first_name = $data['first_name'];
        $middle_name = $data['middle_name'];
        $sur_name = $data['sur_name'];
        $suffix = $data['suffix'];
        $region = $data['region'];
        $province = $data['province'];
        $city = $data['city'];
        $phone_number = $data['phone_number'];
        $status = $data['status'];

        $this->callUpdateGuestDetailsProcedure(
            $user_id,
            $first_name,
            $middle_name,
            $sur_name,
            $suffix,
            $region,
            $province,
            $city,
            $phone_number,
            $status
        );
    }

    private function callUpdateGuestDetailsProcedure(
        $user_id,
        $first_name,
        $middle_name,
        $sur_name,
        $suffix,
        $region,
        $province,
        $city,
        $phone_number,
        $status
    ) {
        $pdo = $this->guestDetailModel->getConnection();
        if (!$this->guestDetailModel->getConnection()) {
            die("Database connection failed!");
        }

        $sql = "UPDATE " . $this->guestDetailModel->getTable() . " 
                SET 
                    first_name = ?, 
                    middle_name = ?, 
                    sur_name = ?, 
                    suffix = ?, 
                    region = ?, 
                    province = ?, 
                    city = ?, 
                    phone_number = ?, 
                    status = ? 
                WHERE user_id = ?";

        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(1, $first_name, PDO::PARAM_STR);
        $stmt->bindParam(2, $middle_name, PDO::PARAM_STR);
        $stmt->bindParam(3, $sur_name, PDO::PARAM_STR);
        $stmt->bindParam(4, $suffix, PDO::PARAM_STR);
        $stmt->bindParam(5, $region, PDO::PARAM_STR);
        $stmt->bindParam(6, $province, PDO::PARAM_STR);
        $stmt->bindParam(7, $city, PDO::PARAM_STR);
        $stmt->bindParam(8, $phone_number, PDO::PARAM_STR);
        $stmt->bindParam(9, $status, PDO::PARAM_INT);
        $stmt->bindParam(10, $user_id, PDO::PARAM_INT);

        try {
            $stmt->execute();
            echo json_encode(['status' => 1, 'message' => 'Guest details updated successfully']);
        } catch (Exception $e) {
            echo json_encode(['status' => 0, 'error' => 'Failed to update guest details: ' . $e->getMessage()]);
        }
    }
}

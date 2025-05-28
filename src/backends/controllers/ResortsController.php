<?php

require_once __DIR__ . '/../models/Resorts.php';
require_once __DIR__ . '/../core/Request.php';


class ResortsController
{
    private $resortsModel;

    public function __construct()
    {
        $this->resortsModel = new Resorts();
    }

    public function getResorts()
    {
        echo json_encode($this->resortsModel->getResorts());
    }

    public function createResort(Request $request)
    {

        $requiredFields = ['name', 'location_coordinates', 'tax_rate', 'contact_details'];

        foreach ($requiredFields as $field) {
            if (empty($request->get('input_data')[$field])) {
                echo json_encode([
                    'success' => false,
                    'error' => ucfirst($field) . ' is required.'
                ]);
                return;
            }
        }

        $name = $request->get('input_data')['name'];
        $location = $request->get('input_data')['location'];
        $location_coordinates = $request->get('input_data')['location_coordinates'];
        $tax_rate = $request->get('input_data')['tax_rate'];
        $contact_details = $request->get('input_data')['contact_details'];

        $name_exist = $this->resortsModel->getResortByName($name);

        if ($name_exist) {
            echo json_encode(["error" => "Resort Name Already Taken"]);
            return;
        }

        $contact_exist = $this->resortsModel->getResortByContactDetails($contact_details);

        if ($contact_exist) {
            echo json_encode(["error" => "Contact detail Already Taken"]);
            return;
        }

        $created = $this->resortsModel->createResort([
            'name' => $name,
            'location' => $location,
            'location_coordinates' => $location_coordinates,
            'tax_rate' => $tax_rate,
            'status' => true,
            'contact_details' => $contact_details,
        ]);

        if ($created) {
            echo json_encode([
                'success' => true,
                'message' => 'Resort Created Successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Failed to create resort. Please try again.'
            ]);
        }
    }
    public function updateResort(Request $request)
    {
        $result = $this->resortsModel->updateResort($request->get('input_data')['id'], [
            'name' => $request->get('input_data')['name'],
            'location' => $request->get('input_data')['location'],
            'location_coordinates' => $request->get('input_data')['location_coordinates'],
            'tax_rate' =>  $request->get('input_data')['tax_rate'],
            'status' =>  $request->get('input_data')['status'],
        ]);

        if (is_array($result) && isset($result['error'])) {
            echo json_encode([
                'success' => false,
                'error' => 'Database error: ' . $result['error']
            ]);
        } elseif ($result === true) {
            echo json_encode([
                'success' => true,
                'message' => 'Resort Updated Successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'No changes were made to the resort.'
            ]);
        }
    }


    public function getResortById(Request $request)
    {
        $id = $request->get('id');

        if (empty($id)) {
            echo json_encode([
                'success' => false,
                'error' => 'Resort ID is required.'
            ]);
            return;
        }

        $resort = $this->resortsModel->getResortById($id);

        if ($resort) {
            echo json_encode([
                'success' => true,
                'resort' => $resort
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Resort not found.'
            ]);
        }
    }

    public function getDetailsByResortId()
    {
        $id = $_GET['id'] ?? null;

        if (!$id) {
            echo json_encode(["success" => false, "message" => "Resort ID is missing"]);
            return;
        }

        $resort = $this->resortsModel->getDetailsByResortId($id);

        if ($resort) {
            echo json_encode(["success" => true, "resort" => $resort]);
        } else {
            echo json_encode(["success" => false, "message" => "Resort not found"]);
        }
    }

    public function updateResortDetails()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        $id = $input['id'] ?? null;
        $resort_description = $input['resort_description'] ?? '';
        $room_description = $input['room_description'] ?? '';

        if (!$id) {
            echo json_encode(["success" => false, "message" => "Missing resort ID"]);
            return;
        }

        $updated = $this->resortsModel->updateResortDetails($id, $resort_description, $room_description);

        if ($updated) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Update failed"]);
        }
    }


    public function uploadResortImageById(Request $request)
    {
        $resort_id = $request->get('id');
        $image = $request->get('image');
        $imageField = $request->get('imageField');

        $allowedFields = ['image1', 'image1_2', 'image1_3', 'main_image', 'image2', 'image3', 'room_image_1', 'room_image_2', 'room_image_3'];

        if (empty($resort_id) || empty($imageField) || empty($image) || !in_array($imageField, $allowedFields)) {
            echo json_encode([
                'success' => false,
                'error' => 'Resort ID and image URL are required.'
            ]);
            return;
        }

        $currentResort = $this->resortsModel->getResortById($resort_id);
        $oldImage = $currentResort[$imageField] ?? null;


        if (!empty($oldImage)) {
            $this->deleteImageFromCloudinary($oldImage);
        }

        $updated = $this->resortsModel->uploadResortImageById($resort_id, $imageField, $image);

        if ($updated) {
            echo json_encode(['success' => true, 'message' => 'Image updated successfully']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to update image']);
        }
    }

    //api secret = vrHEX9YcroO8RrjD3Ssy_X3Esss
    //api key = 538149774391471
    private function deleteImageFromCloudinary($publicId)
    {
        $cloudName = "dpa4l9gxw";
        $apiKey = "538149774391471";
        $apiSecret = "vrHEX9YcroO8RrjD3Ssy_X3Esss";

        $timestamp = time();
        $signature = sha1("public_id=$publicId&timestamp=$timestamp$apiSecret");

        $postFields = [
            'public_id' => $publicId,
            'api_key' => $apiKey,
            'timestamp' => $timestamp,
            'signature' => $signature,
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api.cloudinary.com/v1_1/$cloudName/image/destroy");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

        $response = curl_exec($ch);
        curl_close($ch);
    }

    public function destroyResort(Request $request)
    {
        if ($this->resortsModel->destroyResort($request->get('resort_id'))) {
            echo json_encode([
                'success' => true,
                'message' => 'Resort Deleted Successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to delete Resort'
            ]);
        }
    }
    public function getResortAdminsByResortId(Request $request)
    {
        echo json_encode($this->resortsModel->getResortAdminsByResortId($request->get('resort_id')));
    }
    public function getTaxRateByBuildingId()
    {
        header('Content-Type: application/json');

        $building_id = isset($_GET['building_id']) ? intval($_GET['building_id']) : 0;

        if ($building_id <= 0) {
            echo json_encode(['error' => 'Invalid building ID']);
            return;
        }

        $taxRate = $this->resortsModel->getTaxRateByBuildingId($building_id);

        if ($taxRate !== null) {
            echo json_encode(['tax_rate' => $taxRate]);
        } else {
            echo json_encode(['error' => 'Building or related resort not found']);
        }
    }
}

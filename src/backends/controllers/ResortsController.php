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

        $requiredFields = ['name', 'location', 'location_coordinates', 'tax_rate', 'contact_details'];

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
}

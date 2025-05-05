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

        $name = $request->get('values')['name'];
        $location = $request->get('values')['location'];
        $location_coordinates = $request->get('values')['location_coordinates'];
        $tax_rate = $request->get('values')['tax_rate'];
        $status = $request->get('values')['status'];
        $contact_details = $request->get('values')['contact_details'];

        $name_exist = $this->resortsModel->getResortByName($name);

        if ($name_exist) {
            echo json_encode(["error" => "Resort Name Already Taken"]);
            return;
        }

        // echo json_encode([
        //     'success' => false,
        //     'message' => 'yes'
        // ]);

        echo json_encode(['tes' => $name]);
    }
}

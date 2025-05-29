<?php

require_once __DIR__ . '/../models/Building.php';
require_once __DIR__ . '/../core/Request.php';

class BuildingsController
{
    private $buildingModel;

    public function __construct()
    {
        $this->buildingModel = new Building();
    }

    public function getBuildings(): void
    {
        echo json_encode($this->buildingModel->getBuildings());
    }
    public function getBuildingById(Request $request)
{
    $buildingId = $request->get('building_id');
    echo json_encode($this->buildingModel->getBuildingById($buildingId));
}
    public function getBuildingsByResortId(Request $request): void
    {
        $resort_id = $request->get('resort_id');
        echo json_encode($this->buildingModel->getBuildingsByResortId($resort_id));
    }
}

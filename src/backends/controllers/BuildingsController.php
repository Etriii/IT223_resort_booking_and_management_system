<?php

require_once __DIR__ . '/../models/Building.php';
require_once __DIR__ . '/../core/Request.php';

class BuildingsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Building();
    }

    public function getBuildings(): void
    {
        echo json_encode($this->eventsModel->getBuildings());
    }
    public function getBuildingsByResortId(Request $request): void
    {
        $resort_id = $request->get('resort_id');
        echo json_encode($this->eventsModel->getBuildingsByResortId($resort_id));
    }
}

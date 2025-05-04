<?php

require_once __DIR__ . '/../models/Room.php';
require_once __DIR__ . '/../core/Request.php';

class RoomsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Room();
    }

    public function getRooms(): void
    {
        echo json_encode($this->eventsModel->getRooms());
    }

    public function getRoomsByBuildingId(Request $request) {
        $building_id = $request->get('building_id');
        echo json_encode($this->eventsModel->getRoomsByBuildingId($building_id));
    }
}
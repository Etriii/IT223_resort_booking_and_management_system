<?php

require_once __DIR__ . '/../models/Event.php';

class EventsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Event();
    }

    public function getEvents()
    {
        echo json_encode($this->eventsModel->getEvents());
    }

    public function getEventByResortId(Request $request)
    {
        echo json_encode($this->eventsModel->getEventByResortId($request->get('resort_id')));
    }

    public function create(Request $request)
    {
        $resort_id = $request->get('resort_id');
        $name = $request->get('name');
        $start_date = $request->get('start_date');
        $end_date = $request->get('end_date');

        $result = $this->eventsModel->create($resort_id, $name, $start_date, $end_date);
        echo json_encode(["success" => $result]);
    }
}

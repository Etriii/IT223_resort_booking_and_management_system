<?php

require_once __DIR__ . '/../models/TriggerLog.php';
require_once __DIR__ . '/../core/Request.php';

class TriggerLogsController
{
    private $triggerLogModel;

    public function __construct()
    {
        $this->triggerLogModel = new TriggerLog();
    }

    public function getAllTriggerLogs()
    {
        echo json_encode($this->triggerLogModel->getTriggerLogs());
    }

    public function getLogs(Request $request)
    {
        // $resort_id = $request->get('resort_id');
        // $table = $request->get('table');
        // $start_date = $request->get('start_date');
        // $end_date = $request->get('end_date');

        // $accepted_table = ['bookings', 'bookmarks', 'buildings', 'payments', 'resort_events', 'resorts', 'reviews', 'rooms'];

        // if (!in_array($table, $accepted_table)) {
        //     echo $table . " Only allowed tables are accepted";
        //     return;
        // }


        $acceptedTables = ['bookings', 'bookmarks', 'buildings', 'payments', 'resort_events', 'resorts', 'reviews', 'rooms'];

        // Simulating getting request data (replace with your actual input source)
        $resort_id = $_GET['resort_id'] ?? null;
        $table = $_GET['table'] ?? null;
        $start_date = $_GET['start_date'] ?? null;
        $end_date = $_GET['end_date'] ?? null;

        $errors = [];

        if (!isset($resort_id) || !ctype_digit($resort_id) || intval($resort_id) <= 0) {
            $errors[] = "Invalid resort_id. It must be a positive integer. ";
        }

        if (!isset($table) || !in_array($table, $acceptedTables)) {
            $errors[] = "Invalid table name. ";
        }

        if (!isset($start_date) || !strtotime($start_date)) {
            $errors[] = "Invalid start_date. ";
        }

        if (!isset($end_date) || !strtotime($end_date)) {
            $errors[] = "Invalid end_date. ";
        }

        if (isset($start_date, $end_date) && strtotime($start_date) > strtotime($end_date)) {
            $errors[] = "start_date cannot be after end_date. ";
        }

        if (!empty($errors)) {
            echo json_encode(['success' => false, 'errors' => $errors]);
            exit;
        }

        echo json_encode($this->triggerLogModel->getLogs(['resort_id' => $resort_id, 'table' => $table, 'start_date' =>  $start_date, 'end_date' =>  $end_date]));
    }
}

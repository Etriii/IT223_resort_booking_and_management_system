<?php

require_once __DIR__ . '/../models/TriggerLog.php';
require_once __DIR__ . '/../core/Request.php';

class TriggerLogsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new TriggerLog();
    }

    public function getAllTriggerLogs()
    {
        echo json_encode($this->eventsModel->getTriggerLogs());
    }
}

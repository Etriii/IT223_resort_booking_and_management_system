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
}

<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class TriggerLog
{
    private $conn;
    private $table = 'trigger_logs';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getTriggerLogs()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

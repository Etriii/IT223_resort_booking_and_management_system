<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class Event
{
    private $conn;
    private $table = 'resort_events';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getEvents()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($resort_id, $name, $start_date, $end_date)
    {
        $stmt = $this->conn->prepare("INSERT INTO `resort_events`( `resort_id`, `name`, `start_date`, `end_date`) VALUES ('$resort_id', '$name', '$start_date', '$end_date' )");
        $stmt->execute();
        return "Event created Successfully!..";
    }

    public function getEventByResortId($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE resort_id = :id ORDER BY start_date DESC");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getEventByName($resort_name)
    {

    }

    public function update()
    {

    }

    public function destroy()
    {

    }
}

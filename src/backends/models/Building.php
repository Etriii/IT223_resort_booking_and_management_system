<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class Building
{
    private $conn;
    private $table = 'buildings';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getBuildings()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBuildingsByResortId($resort_id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE resort_id=" . $resort_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function create() {}

    public function getBuildingsById($id) {}
    public function update() {}
    public function destroy() {}
}

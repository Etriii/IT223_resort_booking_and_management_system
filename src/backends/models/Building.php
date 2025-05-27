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

    public function getBuildingById($buildingId)
{
    $stmt = $this->conn->prepare("SELECT * FROM buildings WHERE id = ?");
    $stmt->execute([$buildingId]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
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
// ("SELECT 
//   b.id AS building_id,
//   b.name,
//   b.floor_count,
//   COUNT(r.id) AS room_per_floor,
//   GROUP_CONCAT(DISTINCT r.room_type_id SEPARATOR ', ') AS room_Type
// FROM 
//   buildings b
// LEFT JOIN 
//   rooms r ON r.building_id = b.id
// WHERE 
//   b.resort_id = :resort_id
// GROUP BY 
//   b.id, b.name, b.floor_count;");
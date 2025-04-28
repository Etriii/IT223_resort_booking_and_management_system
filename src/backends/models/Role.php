<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class Role
{
    private $conn;
    private $table = 'roles';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getRoles()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function create() {}

    public function getRoleById($id) {}
    public function update() {}
    public function destroy() {}
}

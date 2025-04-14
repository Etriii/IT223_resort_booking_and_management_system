<?php

require_once __DIR__ . '/../config/Database.php';

class UserRole
{
    private $conn;
    private $table = 'user_roles';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getUserRoles($user_id)
    {
        $stmt = $this->conn->prepare("SELECT roles.role as role, resort_id FROM " . $this->table . " JOIN  roles on roles.id = user_roles.role_id WHERE user_roles.user_id = :user_id");
        $stmt->bindParam('user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

<?php
// Sample

// class User
// {
//     private $conn;
//     private $table = "users";

//     public function __construct()
//     {
//         $db = new Database();
//         $this->conn = $db->connect();
//     }

//     public function getAllUsers()
//     {
//         $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
//         $stmt->execute();
//         return $stmt->fetchAll(PDO::FETCH_ASSOC);
//     }

//     public function getUserById($id)
//     {
//         $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
//         $stmt->bindParam(":id", $id);
//         $stmt->execute();
//         return $stmt->fetch(PDO::FETCH_ASSOC);
//     }

//     public function getUserByEmail($email)
//     {
//         $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE email = :email");
//         $stmt->bindParam(":email", $email);
//         $stmt->execute();
//         return $stmt->fetch(PDO::FETCH_ASSOC);
//     }
// }


// require_once __DIR__ . '/../config/Database.php';

// class User {
//     private $conn;
//     private $table = "users";

//     public function __construct() {
//         $db = new Database();
//         $this->conn = $db->connect();
//     }

//     public function getAllUsers() {
//         $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
//         $stmt->execute();
//         return $stmt->fetchAll(PDO::FETCH_ASSOC);
//     }

//     public function getUserById($id) {
//         $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
//         $stmt->bindParam(":id", $id);
//         $stmt->execute();
//         return $stmt->fetch(PDO::FETCH_ASSOC);
//     }

//     public function createUser($data) {
//         $stmt = $this->conn->prepare("INSERT INTO " . $this->table . " (name, email, password) VALUES (:name, :email, :password)");
//         $stmt->bindParam(":name", $data['name']);
//         $stmt->bindParam(":email", $data['email']);
//         $stmt->bindParam(":password", $data['password']);
//         return $stmt->execute();
//     }

//     public function updateUser($data) {
//         $stmt = $this->conn->prepare("UPDATE " . $this->table . " SET name = :name, email = :email WHERE id = :id");
//         $stmt->bindParam(":id", $data['id']);
//         $stmt->bindParam(":name", $data['name']);
//         $stmt->bindParam(":email", $data['email']);
//         return $stmt->execute();
//     }

//     public function deleteUser($id) {
//         $stmt = $this->conn->prepare("DELETE FROM " . $this->table . " WHERE id = :id");
//         $stmt->bindParam(":id", $id);
//         return $stmt->execute();
//     }
// }

// require_once __DIR__ . '/../core/Database.php';

// class User
// {
//     private $conn;
//     private $table = "users";

//     public function __construct()
//     {
//         $db = new Database();
//         $this->conn = $db->connect();
//     }

//     public function getAllUsers()
//     {
//         $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
//         $stmt->execute();
//         return $stmt->fetchAll(PDO::FETCH_ASSOC);
//     }

//     public function getUserById($id)
//     {
//         $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
//         $stmt->bindParam(":id", $id, PDO::PARAM_INT);
//         $stmt->execute();
//         return $stmt->fetch(PDO::FETCH_ASSOC);
//     }

//     public function getUserByEmail($email)
//     {
//         $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE email = :email");
//         $stmt->bindParam(":email", $email);
//         $stmt->execute();
//         return $stmt->fetch(PDO::FETCH_ASSOC);
//     }

//     public function createUser($name, $email, $password)
//     {
//         $stmt = $this->conn->prepare("INSERT INTO " . $this->table . " (name, email, password) VALUES (:name, :email, :password)");
//         $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
//         $stmt->bindParam(":name", $name);
//         $stmt->bindParam(":email", $email);
//         $stmt->bindParam(":password", $hashedPassword);
//         return $stmt->execute();
//     }
// }

require_once __DIR__ . '/../config/Database.php';

class User
{
    private $conn;
    private $table = "users";

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getAllUsers()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByEmail($email)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE email = :email");
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createUser($name, $email, $password)
    {
        $stmt = $this->conn->prepare("INSERT INTO " . $this->table . " (name, email, password) VALUES (:name, :email, :password)");
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $hashedPassword);
        return $stmt->execute();
    }

    public function deleteUser($user_id)
    {
        $stmt = $this->conn->prepare("DELETE FROM " . $this->table . " WHERE id=" . $user_id);
        return $stmt->execute();
    }

    public function getUserEmail($user_email)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE email=" . $user_email);
        return $stmt->execute();
    }
}

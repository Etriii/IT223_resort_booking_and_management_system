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
require_once __DIR__ . '/../core/Model.php';

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
        // $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        // $stmt->execute();
        // return $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $this->conn->prepare("
        SELECT 
            users.*, 
            GROUP_CONCAT(user_roles.role_id) AS roles, 
            resorts.name as resort_name
        FROM users
        LEFT JOIN user_roles ON users.id = user_roles.user_id
        LEFT JOIN resorts ON resorts.id = user_roles.resort_id
        GROUP BY users.id
        ");

        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($users as &$user) {
            if ($user['roles']) {
                $roleIds = explode(',', $user['roles']);
                $roleNames = array_map(function ($id) {
                    switch ($id) {
                        case '1':
                            return 'Super Admin';
                        case '2':
                            return 'Resort Super Admin';
                        case '3':
                            return 'Resort Admin';
                        case '4':
                            return 'Guest';
                        default:
                            return 'Unknown';
                    }
                }, $roleIds);
                $user['role_names'] = $roleNames;
            } else {
                $user['role_names'] = ['No Role'];
            }
        }

        return $users;
    }

    public function getUserById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByUsername($username)
    {
        $stmt = $this->conn->prepare("SELECT id FROM users WHERE username = :username");
        $stmt->bindParam(':username', $username);
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

    public function createUser($username, $email, $password)
    {
        $conn = (new Database())->connect();
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        try {
            $stmt = $conn->prepare("CALL createUserWithRole(:username, :email, :password)");
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashedPassword);

            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result['user_id'];
        } catch (PDOException $e) {
            error_log("Error creating user: " . $e->getMessage());
            return false;
        }
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

    public function logInUser($user_id)
    {
        $stmt = $this->conn->prepare("INSERT INTO logged_in_users(`user_id`) VALUES (:user_id)");
        $stmt->execute(['user_id' => $user_id]);
    }
    public function logOutUser($user_id)
    {
        $stmt = $this->conn->prepare("DELETE FROM logged_in_users WHERE user_id = :user_id");
        $stmt->execute(['user_id' => $user_id]);
    }

    public function yes()
    {
        $stmt = $this->conn->prepare("SELECT @user_id AS user_id;");
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

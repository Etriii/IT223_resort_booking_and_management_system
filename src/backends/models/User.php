<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';
require_once __DIR__ . '/../core/PasswordHashing.php';

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
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByEmail($email)
    {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByUsername($username)
    {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindParam(":username", $username);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createUser($username, $email, $password)
    {
        $hashedPassword = manual_custom_hash($password);

        try {
            $stmt = $this->conn->prepare("CALL createUserWithRole(:p_username, :p_email, :p_password)");

            $stmt->bindParam(':p_username', $username);
            $stmt->bindParam(':p_email', $email);
            $stmt->bindParam(':p_password', $hashedPassword);

            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                error_log("Fetch failed or no user_id returned.");
                return false;
            }

            return $row['user_id'];
        } catch (PDOException $e) {
            error_log("Error creating user: " . $e->getMessage());
            return false;
        }
    }


    public function updateUser($id, $username, $email, $status)
    {
        try {
            $stmt = $this->conn->prepare("
                UPDATE users 
                SET username = :username, email = :email, status = :status 
                WHERE id = :id
            ");
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Error updating user: " . $e->getMessage());
            return false;
        }
    }

    public function deleteUser($user_id)
    {
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = :id");
        $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    // ✅ Add login method (sets a cookie)
    public function logInUser($user_id)
    {
        setcookie('user_id', $user_id, time() + (86400 * 30), "/"); // valid for 30 days
    }

    // ✅ Add logout method (clears cookie)
    public function logOutUser($user_id = null)
    {
        if (isset($_COOKIE['user_id'])) {
            setcookie('user_id', '', time() - 3600, "/");
            unset($_COOKIE['user_id']);
        }
    }

    // Dummy method used by `yes()` in AuthController
    public function yes()
    {
        return 'Yes method reached!';
    }
}

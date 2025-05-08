<?php
/* run ni sa terminal para maka access kag mga data
 php -S localhost:8000 -t src/backends
*/

class Database
{
    private $host = "localhost";
    private $db_name = "it223_ocean_view_db";
    private $username = "root";
    private $password = "";
    private $conn = null;

    public function connect()
    {
        // if ($this->conn === null) {
        //     try {
        //         $this->conn = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
        //         $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //         $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        //     } catch (PDOException $e) {
        //         die(json_encode(["error" => "Database Connection Failed: " . $e->getMessage()]));
        //     }
        // }
        if ($this->conn === null) {
            try {
                $this->conn = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

                // session_start();
                if (isset($_COOKIE['user_id'])) {
                    $userId = (int) $_COOKIE['user_id'];
                    $stmt = $this->conn->prepare("SET @user_id = :user_id");
                    $stmt->execute(['user_id' => $userId]);
                }
            } catch (PDOException $e) {
                die(json_encode(["error" => "Database Connection Failed: " . $e->getMessage()]));
            }
        }
        return $this->conn;
    }
}

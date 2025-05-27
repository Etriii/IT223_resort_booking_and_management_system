<?php

require_once __DIR__ . '/../config/Database.php';

class Bookmark
{
    private $conn;
    private $table = 'bookmarks';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getAllBookmarks()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookmarksById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table . " WHERE id = " . $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function destroy() {}

    public function getBookmarksByUserId($user_id)
    {
        $stmt = $this->conn->prepare("
    SELECT {$this->table}.id as bookmarked_id, resorts.id as resort_id, resorts.name, resorts.location, resorts.main_image
    FROM {$this->table} 
    JOIN resorts ON resorts.id = {$this->table}.resort_id 
    WHERE {$this->table}.user_id = :user_id
    ");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

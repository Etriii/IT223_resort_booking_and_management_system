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
}

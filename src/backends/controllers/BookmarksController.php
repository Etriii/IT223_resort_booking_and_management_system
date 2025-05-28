<?php

require_once __DIR__ . '/../models/Bookmark.php';
require_once __DIR__ . '/../core/Request.php';

class BookmarksController
{
    private $bookMarkModel;

    public function __construct()
    {
        $this->bookMarkModel = new Bookmark();
    }

    public function getAllBookmarks()
    {
        echo json_encode($this->bookMarkModel->getAllBookmarks());
    }

    public function getBookmarksById(Request $request)
    {
        echo json_encode($this->bookMarkModel->getBookmarksById($request->get('id')));
    }

    public function getBookmarksByUserId(Request $request) {
        echo json_encode($this->bookMarkModel->getBookmarksByUserId($request->get('user_id')));
    }
    public function addBookmark(Request $request)
{
    $input = json_decode(file_get_contents('php://input'), true);

    $user_id = $input['user_id'] ?? null;
    $resort_id = $input['resort_id'] ?? null;

    if (!$user_id || !$resort_id) {
        echo json_encode(['success' => false, 'message' => 'Missing user_id or resort_id']);
        return;
    }

    $bookmarkModel = new Bookmark();
    $result = $bookmarkModel->addBookmark($user_id, $resort_id);

    echo json_encode($result);
}

public function removeBookmark(Request $request)
{
    $input = json_decode(file_get_contents('php://input'), true);

    $user_id = $input['user_id'] ?? null;
    $resort_id = $input['resort_id'] ?? null;

    if (!$user_id || !$resort_id) {
        echo json_encode(['success' => false, 'message' => 'Missing user_id or resort_id']);
        return;
    }

    $bookmarkModel = new Bookmark();
    $result = $bookmarkModel->removeBookmark($user_id, $resort_id);

    echo json_encode($result);
}

}

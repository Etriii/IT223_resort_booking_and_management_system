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

    public function getBookmarksById(Request $request){
        echo json_encode($this->bookMarkModel->getBookmarksById($request->get('id')));
    }
}

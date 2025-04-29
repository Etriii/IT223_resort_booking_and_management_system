<?php

require_once __DIR__ . '/../models/Bookmark.php';
require_once __DIR__ . '/../core/Request.php';

class BookmarksController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Bookmark();
    }

    public function getAllBookmarks()
    {
        echo json_encode($this->eventsModel->getAllBookmarks());
    }

    public function getBookmarksById(Request $request){
        echo json_encode($this->eventsModel->getBookmarksById($request->get('id')));
    }
}

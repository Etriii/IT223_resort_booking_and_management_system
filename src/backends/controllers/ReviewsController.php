<?php

require_once __DIR__ . '/../models/Review.php';
require_once __DIR__ . '/../core/Request.php';

class ReviewsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Review();
    }

    public function getAllReviews()
    {
        echo json_encode($this->eventsModel->getReviews());
    }
}

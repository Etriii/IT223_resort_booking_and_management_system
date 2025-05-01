<?php

require_once __DIR__ . '/../models/Review.php';
require_once __DIR__ . '/../core/Request.php';

class ReviewsController
{
    private $reviewModel;

    public function __construct()
    {
        $this->reviewModel = new Review();
    }

    public function getAllReviews()
    {
        echo json_encode($this->reviewModel->getReviews());
    }
}

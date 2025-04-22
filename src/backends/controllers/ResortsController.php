<?php

require_once __DIR__ . '/../models/Resorts.php';


class ResortsController
{
    private $resortsModel;

    public function __construct()
    {
        $this->resortsModel = new Resorts();
    }

    public function getResorts()
    {
        echo json_encode($this->resortsModel->getResorts());
    }
}

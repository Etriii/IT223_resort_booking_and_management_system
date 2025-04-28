<?php

require_once __DIR__ . '/../models/Role.php';
require_once __DIR__ . '/../core/Request.php';

class RoleController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Role();
    }

    public function getRoles()
    {
        echo json_encode($this->eventsModel->getRoles());
    }
}

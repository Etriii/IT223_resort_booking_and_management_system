<?php

require_once __DIR__ . '/../models/Role.php';
require_once __DIR__ . '/../core/Request.php';

class RoleController
{
    private $roleModel;

    public function __construct()
    {
        $this->roleModel = new Role();
    }

    public function getRoles()
    {
        echo json_encode($this->roleModel->getRoles());
    }
}

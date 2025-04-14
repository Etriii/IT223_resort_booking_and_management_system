<?php

require_once __DIR__ . '/../models/UserRole.php';


class UserRolesController
{
    private $userRolesModel;

    public function __construct()
    {
        $this->userRolesModel = new UserRole();
    }

    public function getUserRoles($request)
    {
        echo json_encode($this->userRolesModel->getUserRoles($request->get('user_id')));
    }
}

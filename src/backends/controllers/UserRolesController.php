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

    public function deleteUserRole(Request $request)
    {
        if ($this->userRolesModel->deleteUserRole($request->get('user_role_id'))) {
            echo json_encode([
                'success' => true,
                'message' => 'User Role Deleted Successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'User Role Failed to delete Resort'
            ]);
        }
    }

    public function createUserWithRole(Request $request)
    {

        if ($this->userRolesModel->hasRole($request->get('input_data')['user_id'])) {
            echo json_encode([
                'success' => false,
                'message' => 'User Already Has a Role on Another Resort'
            ]);
            return;
        }

        if ($this->userRolesModel->createUserRole([
            'user_id' => $request->get('input_data')['user_id'],
            'role_id' => $request->get('input_data')['role_id'],
            'resort_id' => $request->get('input_data')['resort_id']
        ])) {
            echo json_encode([
                'success' => true,
                'message' => 'User Role Added Successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'User Role Failed to delete Resort'
            ]);
        }
    }
}

<?php
// require_once __DIR__ . '/../models/User.php';
// // Sample
// class UserController
// {
//     private $userModel;

//     public function __construct()
//     {
//         $this->userModel = new User();
//     }

//     public function getAllUsers()
//     {
//         echo json_encode($this->userModel->getAllUsers());
//     }

//     public function getUserById($id)
//     {
//         echo json_encode($this->userModel->getUserById($id));
//     }

//     public function getUserByEmail($email)
//     {
//         // var_dump();
//         echo json_encode($this->userModel->getUserByEmail($email));
//     }
// }

// require_once __DIR__ . '/../models/User.php';

// class UserController
// {
//     private $userModel;

//     public function __construct()
//     {
//         $this->userModel = new User();
//     }

//     public function getAllUsers($request)
//     {
//         echo json_encode($this->userModel->getAllUsers());
//     }

//     public function getUserById($request)
//     {
//         echo json_encode($this->userModel->getUserById($request->params['id']));
//     }

//     // public function createUser($request)
//     // {
//     //     echo json_encode($this->userModel->createUser($request->params));
//     // }

//     // public function updateUser($request)
//     // {
//     //     echo json_encode($this->userModel->updateUser($request->params));
//     // }

//     // public function deleteUser($request)
//     // {
//     //     echo json_encode($this->userModel->deleteUser($request->params['id']));
//     // }
// }

// class UserController
// {
//     private $userModel;

//     public function __construct()
//     {
//         $this->userModel = new User();
//     }

//     public function getAllUsers(Request $request)
//     {
//         echo json_encode($this->userModel->getAllUsers());
//     }

//     public function getUserById($id)
//     {
//         echo json_encode($this->userModel->getUserById($id));
//     }

//     public function getUserByEmail(Request $request)
//     {
//         $email = $request->get('email');
//         if (!$email) {
//             echo json_encode(["error" => "Email is required"]);
//             return;
//         }

//         echo json_encode($this->userModel->getUserByEmail($email));
//     }
// }


require_once __DIR__ . '/../models/User.php';

class UserController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function getAllUsers()
    {
        echo json_encode($this->userModel->getAllUsers());
    }

    public function getUserById(Request $request)
    {
        $id = $request->get('id');

        if (!$id) {
            echo json_encode(["error" => "User ID is required"]);
            return;
        }

        echo json_encode($this->userModel->getUserById($id));
    }

    public function getUserByEmail(Request $request)
    {
        $email = $request->get('email');

        if (!$email) {
            echo json_encode(["error" => "Email is required"]);
            return;
        }

        echo json_encode($this->userModel->getUserByEmail($email));
    }

    public function createUser(Request $request)
    {
        $name = $request->get('name');
        $email = $request->get('email');
        $password = $request->get('password');

        if (!$name || !$email || !$password) {
            echo json_encode(["error" => "Name, email, and password are required"]);
            return;
        }

        $result = $this->userModel->createUser($name, $email, $password);
        echo json_encode(["success" => $result]);
    }

    public function deleteUser($request)
    {
        $user_id = $request->get('user_id');
        $result = $this->userModel->deleteUser($user_id);
    }
}

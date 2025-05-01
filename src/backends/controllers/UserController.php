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
    $data = json_decode(file_get_contents('php://input'), true);

    $username = $data['username'] ?? null;
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (!$username || !$email || !$password) {
        echo json_encode(["success" => false, "message" => "Username, email, and password are required"]);
        return;
    }

    if ($this->userModel->getUserByEmail($email)) {
        echo json_encode(["success" => false, "message" => "Email already exists"]);
        return;
    }

    $user_id = $this->userModel->createUser($username, $email, $password);
}

    

    public function deleteUser($request)
    {
        $user_id = $request->get('user_id');
        $result = $this->userModel->deleteUser($user_id);
    }
}

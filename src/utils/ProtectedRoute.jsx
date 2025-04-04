// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role = null }) => {
//     const user_id = localStorage.getItem("user_id");

//     if (!user_id) {
//         return <Navigate to="oceanview/login" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { getAuthStatus } from "./auth";

const ProtectedRoute = ({ allowedRoles }) => {
    // const [auth, setAuth] = useState(null);

    // useEffect(() => {
    //     getAuthStatus().then(setAuth);
    // }, []);

    // if (auth === null) return <p>Loading...</p>;

    // if (!auth.isAuthenticated) {
    //     return <Navigate to="/oceanview/login" replace />;
    // }

    // if (allowedRoles && !allowedRoles.some(role => auth.roles.includes(role))) {
    //     return <Navigate to="/oceanview" replace />;
    // }

    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
        return <Navigate to="/oceanview/login" replace />;
    }

    const [UserRoles, setUserRoles] = useState();

    fetch('http://localhost:8000/api.php?controller=User&action=getUserRoles').then();

    return <Outlet />;
};

export default ProtectedRoute;

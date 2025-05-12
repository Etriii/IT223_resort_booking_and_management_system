// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// import React from 'react'

// const Authenticate = () => {

//     const user_id = localStorage.getItem("user_id");
//     const user_role = localStorage.getItem("user_role");

//     if (!user_id || !user_role) {
//         localStorage.removeItem('user_id');
//         localStorage.removeItem('user_role');
//         return <Navigate to="/oceanview/login" replace />;
//     }

//     return (<Outlet />)
// }

// export default Authenticate

// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const Authenticate = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(null);

//     useEffect(() => {
//         const user_id = localStorage.getItem("user_id");
//         const user_role = localStorage.getItem("user_role");

//         if (!user_id || !user_role || user_id.trim() === "" || user_role.trim() === "") {
//             localStorage.removeItem("user_id");
//             localStorage.removeItem("user_role");
//             setIsAuthenticated(false);
//         } else {
//             setIsAuthenticated(true);
//         }
//     }, []);

//     if (isAuthenticated === null) return null; // or a loading spinner
//     if (!isAuthenticated) return <Navigate to="/oceanview/login" replace />;

//     return <Outlet />;
// };

// export default Authenticate;


import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const getCookie = (name) =>
    document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];

const Authenticate = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const user_id_local = localStorage.getItem("user_id")?.trim();
        const user_role = localStorage.getItem("user_role")?.trim();
        const user_id_cookie = getCookie("user_id")?.trim();

        const isValid = user_id_local && user_role && user_id_cookie && user_id_local === user_id_cookie;

        if (!isValid) {
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_role");
            document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    if (isAuthenticated === null) return null; // optional loading indicator
    if (!isAuthenticated) return <Navigate to="/oceanview/login" replace />;

    return <Outlet />;
};

export default Authenticate;


import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import React from 'react'

const Authenticate = () => {

    const user_id = localStorage.getItem("user_id");
    const user_role = localStorage.getItem("user_role");

    if (!user_id || !user_role) {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        return <Navigate to="/oceanview/login" replace />;
    }

    return (<Outlet />)
}

export default Authenticate

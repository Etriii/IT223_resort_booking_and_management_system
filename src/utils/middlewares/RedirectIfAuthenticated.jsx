import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const RedirectIfAuthenticated = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user_id');
        const user_role = JSON.parse(localStorage.getItem('user_role'));

        if (user && user_role && user_role.length > 0) {
            switch (user_role[0].role) {
                case 'super_admin':
                    navigate('/oceanview/admin/dashboard');
                    break;
                case 'resort_super_admin':
                case 'resort_admin':
                    navigate('/oceanview/resortadmin/dashboard');
                    break;
                case 'guest':
                    navigate('/oceanview');
                    break;
                default:
                    break;
            }
        }
    }, [navigate]); 

    return <Outlet />;
};

export default RedirectIfAuthenticated;

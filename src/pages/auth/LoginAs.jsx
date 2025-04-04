import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const LoginAs = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [UserRoles, setUserRoles] = useState(null);

    const HandleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/oceanview/login');
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api.php?controller=User&action=getUserById&id=${localStorage.getItem('user_id')}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch(() => setStatus("Error fetching data"));

        fetch(`http://localhost:8000/api.php?controller=UserRoles&action=getUserRoles&id=${localStorage.getItem('user_id')}`)
            .then((response) => response.json())
            .then((data) => setUserRoles(data))
            .catch(() => setStatus("Error fetching data"));
    }, []);

    return (
        <div className='flex flex-col justify-center items-center text-center p-10'>
            <div className=' overflow-auto max-h-60'>
                {user ? JSON.stringify(user) : "Loading..."}
            </div>
            <br />
            <div>
                {UserRoles ? JSON.stringify(UserRoles) : 'No User Roles'}
            </div>
            <br />
            <div>
                Optional rani ha. Bale purpose ani kay if daghan siyag role, papilion sa siya first asa siya gusto mo adtu.
            </div>
            <br />
            <div>Log in as: </div>
            <ul>
                <li className='text-blue-500'>
                    <NavLink to="/oceanview/resortslist">User</NavLink>
                </li>
                <li className='text-blue-500'>
                    <NavLink to="/oceanview/admin">Admin</NavLink>
                </li>
                <li>
                    <div>Resort Admin</div>
                    <hr />
                    <ul>
                        <li>
                            <NavLink to="/oceanview/resortadmin" className='text-blue-500'>Resort 1</NavLink>
                        </li>
                        <li>
                            <NavLink to="/oceanview/resortadmin" className='text-blue-500'>Resort 2</NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
            <div>If daghan siyag resorts gina handle, maka pili siya here.</div>
            <div className='p-5 text-red-500'>
                <button onClick={HandleLogout}>
                    Log Out
                </button>
            </div>
        </div >
    )
}

export default LoginAs;

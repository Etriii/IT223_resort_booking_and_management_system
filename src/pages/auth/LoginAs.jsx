import React from 'react'
import { NavLink } from 'react-router-dom';

const LoginAs = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center p-10'>
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
        </div>
    )
}

export default LoginAs;

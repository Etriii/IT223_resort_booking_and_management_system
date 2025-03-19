import React from 'react'

// import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const LoginAs = () => {
    // const navigate = useNavigate();
    return (
        <div className='flex flex-col justify-center items-center text-center p-10'>
            <div>Optional rani ha. bale purpose ani kay if daghan siyag role papilion sa siya first asa siya gusto mo adtu</div>
            <br />
            <div>Log in as: </div>
            <ul>
                <li className='text-blue-500'>
                    <NavLink to="/oceanview/resortslist">User</NavLink>
                </li>
                <li className='text-blue-500'>
                    <NavLink to="/oceanview/admin">Admin</NavLink>
                </li>
                <li className=''>
                    <div>Resort Admin</div>
                    <hr />
                    <div>
                        <ul>
                            <li>
                                <NavLink to="/oceanview/resortadmin" className='text-blue-500'>resort 1</NavLink>
                            </li>
                            <li>
                                <NavLink to="/oceanview/resortadmin" className='text-blue-500'>resort 2</NavLink>
                            </li>
                        </ul>
                    </div>
                    <li>if daghan siyag resorts gina handle maka pili siya here</li>
                </li>
            </ul>
        </div>
    )
}

export default LoginAs;

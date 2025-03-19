import React from 'react'
import { Outlet } from 'react-router-dom'

import background_image from '../assets/images/backgrounds/bg.jpg';
import logo from '../assets/images/logo/ov_logo.png';
const LoginLayout = () => {
    return (
        // bg-center bg-cover
        <div className='grid md:grid-cols-2 w-full h-full bg-center bg-cover' style={{ backgroundImage: `url(${background_image})`, backgroundSize: "cover" }}>
            <div className='h-lv w-full hidden md:flex flex-col justify-center items-center' >
                <img src={logo} alt="" className=' w-32 h-32' />
                <div className="text-center text-white font-semibold text-4xl">Ocean View: Resort Booking and Management System</div>
            </div>
            <div className='h-lvh bg-gray-100 flex justify-center items-center w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default LoginLayout
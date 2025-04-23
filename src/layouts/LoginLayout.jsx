import React from 'react'
import { Outlet } from 'react-router-dom'

import background_image from '../assets/images/backgrounds/bg.png';
import logo from '../assets/images/logo/ov_logo.png';
const LoginLayout = () => {
    return (
        // bg-center bg-cover
        <div className='grid md:grid-cols-2 w-full h-full bg-center bg-cover' >
            <div className='h-lv w-full hidden md:flex flex-col justify-center items-center' style={{ backgroundImage: `url(${background_image})`, backgroundSize: "cover" }}>
                <img src={logo} alt="" className=' w-32 h-32' />
                <div className="text-center text-white font-semibold text-4xl">Ocean View: Resort Booking and Management System</div>
            </div>
            <div className='md:h-lvh bg-gray-100 flex justify-center items-center w-full overflow-hidden flex-col space-y-2 p-3'>
                <div className='flex justify-center items-center flex-col px-7 py-4 md:hidden'>
                    <img src={logo} alt="" className='size-[110px]' />
                    <div className="text-center font-semibold text-2xl">Ocean View: Resort Booking and Management System</div>
                </div>
                <Outlet />
                <footer className=" text-gray-400 py-4">
                    <div className="max-w-7xl mx-auto text-center text-sm">
                        © {new Date().getFullYear()} Ocean View. All Rights Reserved.
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default LoginLayout
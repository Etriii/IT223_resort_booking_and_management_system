import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

import { initializeSidebar } from "../../../../utils/init-sidebar";

const AdminHeading = ({ className, toggleSideNav }) => {

    const location = useLocation();

    const getHeading = () => {
        const path = location.pathname;

        if (path.includes('/oceanview/admin/dashboard')) return 'Dashboard';
        if (path.includes('/oceanview/admin/resorts')) return 'Manage Resorts';
        if (path.includes('/oceanview/admin/users')) return 'Manage Users';

        return 'Admin Page';
    };

    // useEffect(() => {
    //     initializeSidebar();
    // }, []);

    // const toggleSideNav = () => {
    //     alert('na toggle ko');
    // }

    const toggleUserProfileDropdown = () => {
        alert('na toggle kos');
    }

    return (
        <header className={`w-ful shadow px-2 py-1 flex justify-start items-center space-x-2 sticky top-0 bg-white w-full  ${className}`}>
            <div className=" hover:bg-gray-200 rounded">
                <GiHamburgerMenu className="size-7 text-gray-700 cursor-pointer" onClick={toggleSideNav} />
            </div>
            <div className="w-full flex justify-between items-center">
                <h1 className="w-full">{getHeading()}</h1>
                <div className="flex space-x-2 items-center">
                    <div className="relative mr-2 ">
                        <span className="flex justify-center items-center absolute text-[9px] size-[16px] top-0 right-0 text-white rounded-full bg-red-500">
                            15
                        </span>
                        <IoIosNotificationsOutline className="size-7" />
                    </div>
                    <span>Username</span>
                    <div className=" p-1 hover:bg-gray-200 rounded-full">
                        <FaRegUserCircle className="size-8 cursor-pointer" onClick={toggleUserProfileDropdown} />
                    </div>
                </div>
            </div>
        </header >
    );
}

export default AdminHeading;        
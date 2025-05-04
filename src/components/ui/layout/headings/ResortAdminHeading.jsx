import { FaRegUserCircle, FaUserCog } from "react-icons/fa";
import { IoIosNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { HiLogout } from "react-icons/hi";

import { useLocation, useNavigate, useMatch } from 'react-router-dom';
import { useEffect, useState } from "react";

import logout from "../../../../utils/logout";


const ResortAdminHeading = ({ className, toggleSideNav, isOpen }) => {

    const location = useLocation();

    const navigate = useNavigate();

    const getHeading = () => {
        const path = location.pathname;

        if (path.includes('/oceanview/resortadmin/dashboard')) return 'Dashboard';
        if (path.includes('/oceanview/resortadmin/manageresort')) return 'Manage Resort';
        if (path.includes('/oceanview/resortadmin/reservations')) return 'Reservations';
        if (path.includes('/oceanview/resortadmin/events')) return 'Events';


        return 'Admin Page';
    };

    const [userProfile, setUserProfile] = useState();
    const [userName, setUserName] = useState();

    useEffect(() => {
        fetch(`http://localhost:8000/api.php?controller=User&action=getUserById&id=${localStorage.getItem('user_id')}`)
            .then((response) => response.json())
            .then((data) => {
                setUserProfile(data.profile_photo);
                setUserName(data.username);
            })
            .catch((error) => console.error(error));
    }, []);

    // useEffect(() => {
    //     initializeSidebar();
    // }, []);

    // const toggleSideNav = () => {
    //     alert('na toggle ko');
    // }

    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenNotification, setIsOpenNotification] = useState(false);

    const handleOpenProfile = () => {
        setIsOpenProfile(!isOpenProfile);
        if (isOpenNotification) {
            setIsOpenNotification(!isOpenNotification);
        }
    }

    const handleOpenNotif = () => {
        setIsOpenNotification(!isOpenNotification);
        if (isOpenProfile) {
            setIsOpenProfile(!isOpenProfile);
        }
    }

    return (
        <header className={`w-ful shadow-lg px-2 py-1 flex justify-start items-center space-x-2 sticky top-0 bg-white w-full z-[400]  ${className}`}>
            <div className=" hover:bg-gray-200 rounded">
                <TbLayoutSidebarRightExpandFilled className={`size-7 text-gray-700 cursor-pointer ${isOpen ? '' : 'transform scale-x-[-1]'} duration-500 hover:text-black`} onClick={toggleSideNav} />
            </div>
            <div className="w-full flex justify-between items-center">
                <h1 className="w-full">{getHeading()}</h1>
                <div className="flex space-x-2 items-center">
                    <div className="relative mr-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer">
                        <span className="flex justify-center items-center absolute text-[9px] size-[16px] top-0 right-0 text-white rounded-full bg-red-500 pointer-events-none">
                            15
                        </span>
                        <IoIosNotificationsOutline className="size-7" onClick={() => handleOpenNotif()} />
                    </div>
                    <span className=" text-nowrap">{`${userName ? userName : 'Username'}`}</span>
                    <div className="relative">
                        <div className=" p-1 bg-gray-100 hover:bg-gray-200 rounded-full relative">
                            <div className=" cursor-pointer size-8 text-gray-700" onClick={() => handleOpenProfile()} >
                                {userProfile ? <img src={`/images/user_profiles/${userProfile}`} className="w-full h-full rounded-full" alt="User Profile" /> : <FaRegUserCircle className="w-full h-full" />
                                }
                            </div>
                            <div className=" flex justify-center items-center size-4 border-2 border-white rounded-full absolute bottom-0 right-0 bg-gray-100 pointer-events-none">
                                <IoIosArrowDown className={` duration-75 ${isOpenProfile ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <div className={`w-48 absolute top-full right-0 shadow-lg space-y-1 bg-white border border-gray-200 rounded overflow-hidden ${isOpenProfile ? '' : 'hidden'}`} id="profileDropDown">
                            <div className={`flex items-center space-x-2 py-2 px-4 text-gray-800 hover:bg-green-600 hover:text-white  cursor-pointer
                                ${useMatch('/oceanview/resortadmin/myaccount/*') ? 'bg-green-600 text-white pointer-events-none' : ''}`} onClick={() => navigate('/oceanview/resortadmin/myaccount')}>
                                <FaUserCog className="size-6 " />
                                <span>
                                    My Account
                                </span>
                            </div>
                            <hr />
                            <div className="flex items-center space-x-2 py-2 px-4 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer" onClick={() => logout(navigate)}>
                                <HiLogout className="size-6 " />
                                <span>
                                    Logout
                                </span>
                            </div>
                        </div>
                        <div className={`absolute top-full right-0 h-[90vh] bg-red-200 w-64 rounded ${isOpenNotification ? '' : 'hidden'}`}>

                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
}

export default ResortAdminHeading;        
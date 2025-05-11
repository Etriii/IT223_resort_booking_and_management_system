// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logout from "../../../../utils/logout";
// const UserHeading = () => {
//     const [loggedIn, setLoggedIn] = useState(false);

//     const navigate = useNavigate();

//     const navigateToLogInPage = () => {
//         navigate('/oceanview/login');
//     };

//     const handleLogout = () => {
//         logout(navigate);
//     }

//     useEffect(() => {
//         const userId = localStorage.getItem('user_id');
//         setLoggedIn(!!userId);
//     }, []);

//     return (
//         <header className="border border-gray-400 w-full sticky top-0 bg-white z-10 px-4" style={{ paddingTop: '0.70rem', paddingBottom: '0.50rem' }}>

//             <div className="flex justify-between items-center">
//                 <div className={`flex items-center space-x-10`}>
//                     <div className={`flex items-center justify-center space-x-2`}>
//                         <img className={`size-10`} src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid&w=740" alt="Ocean View Logo" />
//                         <div>Ocean View</div>
//                     </div>
//                     <div className={`space-x-4`}>
//                         <a href="">Home</a>
//                         <a href="">About Us</a>
//                         <a href="">Terms and Privacy</a>
//                     </div>
//                 </div>
//                 {loggedIn ?
//                     <button type="button" onClick={handleLogout}>Log Out</button>
//                     :
//                     <button type="button" onClick={navigateToLogInPage}>Log In</button>
//                 }
//             </div>
//         </header>
//     );
// }

// export default UserHeading;

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../../../../utils/logout";
import { FaUserCog, FaSignOutAlt, FaBell } from "react-icons/fa";

import logo from '../../../../assets/images/logo/ov_logo.png';

const UserHeading = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const navigateToLogInPage = () => {
        navigate("/oceanview/login");
    };

    const handleLogout = () => {
        logout(navigate);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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


    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        setLoggedIn(!!userId);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="border-b w-full sticky top-0 bg-white z-10 px-6 py-2 shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-10">
                    <div className="flex items-center space-x-2">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={logo}
                            alt="Ocean View Logo"
                        />
                        <h1 className="text-xl font-semibold text-gray-600">Ocean View</h1>
                    </div>
                    <nav className="space-x-4 text-sm text-gray-600">
                        <a href="">Home</a>
                        <a href="">About Us</a>
                        <a href="">Terms & Privacy</a>
                        <a href="">Resorts</a>
                    </nav>
                </div>

                {loggedIn ? (
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <FaBell className="text-gray-600 text-xl" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">15</span>
                            </div>
                            <div>
                                {userName ?? 'Username'}
                            </div>
                            <button onClick={toggleMenu} className="relative focus:outline-none">
                                <div className={`size-10`}>
                                    <img src={userProfile ? `${userProfile}` : '/images/user_profiles/default_profile.png'} className="w-full h-full rounded-full" alt="User Profile" />
                                </div>
                            </button>
                        </div>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-200">
                                <button
                                    onClick={() => navigate("/oceanview/account")}
                                    className="w-full px-4 py-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-100"
                                >
                                    <FaUserCog />
                                    <span>My Account</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 flex items-center space-x-2 text-red-600 hover:bg-red-100"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={navigateToLogInPage}
                        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                        Log In
                    </button>
                )}
            </div>
        </header>
    );
};

export default UserHeading;

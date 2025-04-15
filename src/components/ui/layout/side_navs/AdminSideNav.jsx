import { NavLink, useNavigate, useMatch } from "react-router-dom";
import logout from "../../../../utils/logout";
import { useEffect } from "react";

import { MdDashboard, MdHistory } from "react-icons/md";
import { TbBuildingFactory } from "react-icons/tb";
import { FaUsersGear } from "react-icons/fa6";

import logo from '../../../../assets/images/logo/ov_logo.png';

const AdminSideNav = ({ className, isOpen }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    }

    useEffect(() => {

        const elements = {
            sidenav: document.getElementById('sidenav'),
            li_texts: document.querySelectorAll('.li_texts'),
        };

        if (!Object.values(elements).every((el) => el)) {
            console.error("Required sidenav elements not found");
            return;
        }

        elements.sidenav.classList.toggle("w-64", isOpen);
        elements.sidenav.classList.toggle("w-16", !isOpen);

        for (const text of elements.li_texts) {
            if (!isOpen) {
                text.classList.add("opacity-0");
                setTimeout(() => {
                    text.classList.add("hidden");
                }, 280); // match your transition duration
            } else {
                text.classList.remove("hidden");
                requestAnimationFrame(() => {
                    text.classList.remove("opacity-0");
                });
            }
        }



    }, [isOpen]);

    const lists_default_styles = {
        list: 'flex justify-start items-center space-x-2 px-[8px] hover:bg-green-600 hover:text-white rounded  overflow-x-hidden',
        span: 'li_texts transition-all duration-300 opacity-100 flex-1',
    }

    const link_styles = {
        active: 'bg-green-600 text-white pointer-events-none',
        passive: 'bg-white cursor-pointer',
    };

    const baseStyles = "transition-all duration-300 w-64 border border-right-gray-300 h-lvh shadow-lg sticky top-0";

    return (
        <aside className={`${baseStyles} ${className}`} id="sidenav">
            <div className="flex items-center p-1 space-x-1 border  border-b-gray-100">
                <img src={logo} alt="" className="size-10" />
                <h2 className=" li_texts text-md font-medium w-full">Ocean View </h2>
            </div>
            <ul className="pt-3 px-1 space-y-1">
                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/admin/dashboard/*')
                    ? link_styles.active : link_styles.passive}`} onClick={() => navigate('/oceanview/admin/dashboard')}>
                    <MdDashboard className="size-9 " />
                    <span className={`${lists_default_styles.span}`}>Dashboard</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/admin/resorts/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/admin/resorts')}>
                    <TbBuildingFactory className="size-9" />
                    <span className={`${lists_default_styles.span}`}>Manage Resorts</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/admin/users/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/admin/users')}>
                    <FaUsersGear className="size-9" />
                    <span className={`${lists_default_styles.span}`}>Manage Users</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/admin/logs/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/admin/logs')}>
                    <MdHistory className="size-9" />
                    <span className={`${lists_default_styles.span}`}>Activity Logs</span>
                </li>

                <button className="text-red-600 text-center w-full py-4" onClick={handleLogout}>
                    Log Out
                </button>
            </ul>
        </aside>
    );
}

export default AdminSideNav;
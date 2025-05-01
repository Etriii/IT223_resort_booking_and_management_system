import { NavLink, useNavigate, useMatch } from "react-router-dom";
import { useEffect } from "react";

import { MdDashboard, MdHistory } from "react-icons/md";
import { TbBuildingPavilion } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";

import logo from '../../../../assets/images/logo/ov_logo.png';

const AdminSideNav = ({ className, isOpen }) => {

    const navigate = useNavigate();

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
                // setTimeout(() => {
                text.classList.add("hidden");
                // }, 300);
            } else {
                setTimeout(() => {
                    text.classList.remove("hidden");
                    text.classList.remove("opacity-0");
                }, 100);
            }
        }

    }, [isOpen]);

    // const NavItem = ({ useMatchUrl, Icon, spanText, onClick }) => {
    //     return (
    //         <li onClick={onClick} className={`${lists_default_styles.list} ${useMatch(useMatchUrl) ? link_styles.active : link_styles.passive}`} >
    //             <Icon className={`${lists_default_styles.icon}`} />
    //             <span className={`${lists_default_styles.span}`}>{spanText}</span>
    //         </li>
    //     );
    // };

    const lists_default_styles = {
        list: 'flex p-1 items-center space-x-2 hover:bg-green-600 hover:text-white rounded  overflow-x-hidden',
        icon: 'size-6 ml-[1.5px]',
        span: 'li_texts flex-1 whitespace-nowrap hidden',
    }

    const link_styles = {
        active: 'bg-green-600 text-white pointer-events-none',
        passive: 'bg-white cursor-pointer',
    };

    const baseStyles = "duration-300 w-64 border border-right-gray-300 h-lvh shadow-lg sticky top-0 z-[500]";

    return (
        <aside className={`${baseStyles} ${className}`} id="sidenav">
            <div className="flex items-center p-1 pl-[9px] space-x-1 border  border-b-gray-100">
                <img src={logo} alt="" className="size-10" />
                <h2 className=" li_texts text-md font-medium ">Ocean View </h2>
            </div>
            <ul className="pt-3 px-3 space-y-1">
                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/admin/dashboard/*')
                    ? link_styles.active : link_styles.passive}`} onClick={() => navigate('/oceanview/admin/dashboard')}>
                    <MdDashboard className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Dashboard</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/admin/resorts/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/admin/resorts')}>
                    <TbBuildingPavilion className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Manage Resorts</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/admin/users/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/admin/users')}>
                    <FaUsersCog className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Manage Users</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/admin/logs/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/admin/logs')}>
                    <MdHistory className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Activity Logs</span>
                </li>
            </ul>
        </aside>
    );
}



export default AdminSideNav;

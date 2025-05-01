import { NavLink, useNavigate, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";

import { MdDashboard, MdOutlineQuestionMark, MdEvent } from "react-icons/md";
import { BsBuildingGear } from "react-icons/bs";
import { RiCalendarCheckLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { TbBuildingPavilion, TbBuildingCircus } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { PiBuildingApartment } from "react-icons/pi";

import logo from '../../../../assets/images/logo/ov_logo.png';

const ResortAdminSideNav = ({ className, isOpen }) => {

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

    const lists_default_styles = {
        list: 'flex p-1 items-center space-x-2 hover:bg-green-600 hover:text-white rounded  overflow-x-hidden',
        icon: 'size-6 ml-[1.5px]',
        span: 'li_texts flex-1 whitespace-nowrap hidden',
    }

    const link_styles = {
        active: 'bg-green-600 text-white ',
        passive: 'bg-white cursor-pointer',
    };

    const baseStyles = "duration-300 w-64 border border-right-gray-300 h-lvh shadow-lg sticky top-0 z-[500] ";

    const [manageResortDropdownIsOpen, setManageResortDropdownIsOpen] = useState(true);

    return (
        <aside className={`${baseStyles} ${className}`} id="sidenav">
            <div className="flex items-center p-1 pl-[9px] space-x-1 border  border-b-gray-100">
                <img src={logo} alt="" className="size-10" />
                <h2 className=" li_texts text-md font-medium ">Ocean View </h2>
            </div>
            <ul className="pt-3 px-3 space-y-1">
                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/dashboard/*')
                    ? link_styles.active : link_styles.passive}`} onClick={() => navigate('/oceanview/resortadmin/dashboard')}>
                    <MdDashboard className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Dashboard</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/manage/*')
                    ? link_styles.active : link_styles.passive}  relative`} onClick={() => navigate('/oceanview/resortadmin/manage/resort')}>
                    <AiOutlineSetting className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Manage Resort</span>
                    <div className={` size-5 cursor-pointer absolute top-[25%] right-2 ${!isOpen ? 'hidden' : ''}`}>
                        <IoIosArrowDown className={`w-full h-full duration-75  ${manageResortDropdownIsOpen ? '' : 'rotate-90'}`} onClick={() => { setManageResortDropdownIsOpen(!manageResortDropdownIsOpen) }} />
                    </div>
                </li>

                <div className={`li_texts p ml-3 space-y-1 ${manageResortDropdownIsOpen ? '' : 'hidden'}`} >
                    <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/manage/resort')
                        ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/resortadmin/manage/resort')}>
                        <TbBuildingPavilion className={`${lists_default_styles.icon} size-5`} />
                        <span className={`${lists_default_styles.span}`}>Resort</span>
                    </li>
                    <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/manage/buildings/*')
                        ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/resortadmin/manage/buildings')}>
                        <PiBuildingApartment className={`${lists_default_styles.icon} size-5`} />
                        <span className={`${lists_default_styles.span}`}>Building</span>
                    </li>
                    <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/manage/rooms/*')
                        ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/resortadmin/manage/rooms/1')}>
                        <TbBuildingCircus className={`${lists_default_styles.icon} size-5`} />
                        <span className={`${lists_default_styles.span}`}>Rooms</span>
                    </li>
                </div>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/reservations/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/resortadmin/reservations')}>
                    <RiCalendarCheckLine className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Reservations</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/events/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/resortadmin/events')}>
                    <MdEvent className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Events</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/reportsandanalytics/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/resortadmin/reportsandanalytics')}>
                    <MdOutlineQuestionMark className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Reports/Analytics</span>
                </li>

                <li className={`${lists_default_styles.list} ${useMatch('/oceanview/resortadmin/logs/*')
                    ? link_styles.active : link_styles.passive} `} onClick={() => navigate('/oceanview/resortadmin/logs')}>
                    <MdOutlineQuestionMark className={`${lists_default_styles.icon}`} />
                    <span className={`${lists_default_styles.span}`}>Logs</span>
                </li>
            </ul>
        </aside>
    );
}

export default ResortAdminSideNav;
import React, { useState, useRef, useEffect } from "react";

import { IoIosArrowDown } from "react-icons/io";

const ToggleDiv = ({ buttonText = "Actions", children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //     const [positionClass, setPositionClass] = useState("top-full");
    //     const divRef = useRef(null); 

    //   const checkOverflow = () => {
    //         if (divRef.current) {
    //             const rect = divRef.current.getBoundingClientRect();
    //             const bodyHeight = window.innerHeight;

    //             if (rect.bottom > bodyHeight) {
    //                 setPositionClass("bottom-full"); 
    //             } else {
    //                 setPositionClass("top-full");
    //             }
    //         }
    //     };

    //     useEffect(() => {
    //         checkOverflow();

    //         window.addEventListener("resize", checkOverflow);
    //         window.addEventListener("scroll", checkOverflow);

    //         return () => {
    //             window.removeEventListener("resize", checkOverflow);
    //             window.removeEventListener("scroll", checkOverflow);
    //         };
    //     }, []);

    return (
        <div className="w-full relative" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer bg-blue-500 text-white rounded p-2 text-center hover:bg-blue-600 transition flex items-center justify-between px-2"
            >
                {buttonText} <IoIosArrowDown className={`${isOpen ? ' rotate-180' : ''}  duration-200`} />
            </div>

            {isOpen && (
                <div className="w-32 border border-gray-300 bg-white rounded-md shadow absolute top-full mt-1 right-0 z-10">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ToggleDiv;

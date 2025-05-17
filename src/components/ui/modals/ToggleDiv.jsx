import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ToggleDiv = ({ buttonText = "Actions", children, containerRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAbove, setIsAbove] = useState(false); // State to track if the dropdown should be above
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
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


    // useEffect(() => {
    //     if (isOpen && buttonRef.current && containerRef.current) {
    //         const buttonRect = buttonRef.current.getBoundingClientRect();
    //         const containerRect = containerRef.current.getBoundingClientRect();
    //         const spaceBelow = containerRect.bottom - buttonRect.bottom;
    //         const dropdownHeight = dropdownRef.current
    //             ? dropdownRef.current.offsetHeight
    //             : 0;

    //         if (spaceBelow < dropdownHeight) {
    //             setIsAbove(true);
    //         } else {
    //             setIsAbove(false);
    //         }
    //     }
    // }, [isOpen]);

    useEffect(() => {
        if (isOpen && buttonRef.current && containerRef.current && dropdownRef.current) {
            const rows = containerRef.current.querySelectorAll('tbody tr');
            if (rows.length < 5) return;

            const buttonRect = buttonRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.offsetHeight;

            const spaceBelow = containerRect.bottom - buttonRect.bottom;

            setIsAbove(spaceBelow < dropdownHeight);
        }
    }, [isOpen]);


    // useEffect(() => {
    //     if (isOpen && buttonRef.current) {
    //         const buttonRect = buttonRef.current.getBoundingClientRect();
    //         const spaceBelow = window.innerHeight - (buttonRect.bottom + 50); // Space available below the button
    //         const dropdownHeight = dropdownRef.current ? dropdownRef.current.offsetHeight : 0;

    //         if (spaceBelow < dropdownHeight) {
    //             setIsAbove(true);
    //         } else {
    //             setIsAbove(false);
    //         }
    //     }
    // }, [isOpen]);

    return (
        <div className="w-full relative" ref={dropdownRef}>
            <div ref={buttonRef} onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer bg-blue-500 text-white rounded  text-center hover:bg-blue-600 transition flex items-center justify-between px-2 py-1 space-x-1" >
                <span>{buttonText}</span> <IoIosArrowDown className={`${isOpen ? ' rotate-180' : ''}  duration-200`} />
            </div>

            {isOpen &&
                (<div
                    className={`w-32 border border-gray-300 bg-white rounded-md shadow absolute transition-all right-0 z-10 ${isAbove ? ' bottom-[110%]' : ' top-[110%]'}`}
                    ref={dropdownRef}>
                    {children}
                </div>
                )}
        </div>
    );
};

export default ToggleDiv;

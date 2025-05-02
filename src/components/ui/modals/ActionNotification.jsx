import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

const ActionNotification = ({ children, variant = 'create', isOpen }) => {

    const baseStyles = `absolute top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full px-4 py-2 rounded shadow-md z-[601] text-center`;

    const variants = {
        create: 'bg-green-100 text-green-800 border border-green-300',
        delete: 'bg-red-100 text-red-800 border border-red-300',
        put: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
        warning: 'bg-orange-100 text-orange-800 border  border-orange-300',
        error: 'bg-rose-200 text-rose-900 border border-rose-400',
        informative: 'bg-blue-100 text-blue-800 border border-blue-300',
    };

    const [isActive, setIsActive] = useState(isOpen);

    useEffect(() => {
        setIsActive(isOpen);

        if (isOpen) {
            const timer = setTimeout(() => {
                setIsActive(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return isActive ? (
        <div className={`${baseStyles} ${variants[variant]}`}>
            <span>{children}</span>
            <IoClose
                className="absolute top-[-5px] right-[-5px] cursor-pointer text-red-500 bg-red-200 rounded-full size-5 border border-red-400 shadow-lg"
                onClick={() => setIsActive(false)}
            />
        </div>
    ) : null;
}

export default ActionNotification
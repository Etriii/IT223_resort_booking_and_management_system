import React, { useState, useEffect } from 'react';

import { IoClose, IoCheckmarkCircleOutline, IoTrashOutline, IoWarningOutline, IoAlertCircleOutline, IoInformationCircleOutline } from 'react-icons/io5';


const ActionNotification = ({ children, variant = 'create', isOpen }) => {

    const baseStyles = `absolute top-4 left-1/2 transform -translate-x-1/2  px-4 py-2 rounded shadow-md z-[601] flex  items-center   `;

    const variants = {
        create: {
            class: 'bg-green-100 text-green-800 border border-green-300',
            icon: <IoCheckmarkCircleOutline className="text-green-600 size-5 mr-2" />,
        },
        delete: {
            class: 'bg-red-100 text-red-800 border border-red-300',
            icon: <IoTrashOutline className="text-red-600 size-5 mr-2" />,
        },
        update: {
            class: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
            icon: <IoAlertCircleOutline className="text-yellow-600 size-5 mr-2" />,
        },
        warning: {
            class: 'bg-orange-100 text-orange-800 border border-orange-300',
            icon: <IoWarningOutline className="text-orange-600 size-5 mr-2" />,
        },
        error: {
            class: 'bg-rose-200 text-rose-900 border border-rose-400',
            icon: <IoAlertCircleOutline className="text-rose-700 size-5 mr-2" />,
        },
        informative: {
            class: 'bg-blue-100 text-blue-800 border border-blue-300',
            icon: <IoInformationCircleOutline className="text-blue-600 size-5 mr-2" />,
        },
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
        <div className={`${baseStyles} ${variants[variant].class}`}>
            {variants[variant].icon}
            <span className="flex-1">{children}</span>
            {/* <IoClose
                className="absolute top-[-5px] right-[-5px] cursor-pointer text-red-500 bg-red-200 rounded-full size-5 border border-red-400 shadow"
                onClick={() => setIsActive(false)}
            /> */}
        </div>
    ) : null;
}

export default ActionNotification
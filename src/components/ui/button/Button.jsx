import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = ({ children, variant = "primary", size = "md", disabled = false, onClick, loading = false, className, btn_type = 'button' }) => {
    const baseStyles = "rounded cursor-pointer transition duration-100  w-full flex justify-center items-center space-x-2";

    const variantStyles = {
        primary: "bg-blue-700 text-white border-none hover:bg-blue-800",
        secondary: "bg-gray-500 text-white border-none hover:bg-gray-600",
        danger: "bg-red-600 text-white border-none hover:bg-red-700",
        outline: "border border-blue-700 text-blue-700 bg-transparent hover:bg-blue-700 hover:text-white",

        create: "bg-green-600 text-white border-none hover:bg-green-700",
        read: "bg-blue-500 text-white border-none hover:bg-blue-600",
        update: "bg-yellow-500 text-white border-none hover:bg-yellow-600",
        delete: "bg-red-600 text-white border-none hover:bg-red-700",
        cancel: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    };

    const sizeStyles = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button type={btn_type}
            className={` ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disabled}
            onClick={onClick}
        >
            {loading ? <AiOutlineLoading3Quarters className=" w-4 h-4  animate-spin" /> : ''}
            <div> {children}</div>
        </button>
    );
};

export default Button;

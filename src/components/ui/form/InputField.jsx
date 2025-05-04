import React from "react";

import { PiWarningCircleBold } from "react-icons/pi";

const InputField = ({
    id,
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    error = "",
    className = "",
    disabled = false,
}) => {
    const inputId = id || `input-${name}`;

    const defaultClasses =
        "w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 ";

    const errorClass = error ? "border-red-500" : "border-gray-300 focus:ring-green-500";

    const combinedClasses = `${defaultClasses} ${errorClass} ${className}`.trim();

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={inputId} className="block mb-1 font-sm">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={combinedClasses}
                disabled={disabled}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className={`flex space-x-2 items-center p-1 border border-red-300 mt-1 text-xs rounded text-red-500 bg-red-100 ${error ? '' : 'hidden'}`}>
                <PiWarningCircleBold />
                <span>
                    {error}
                </span>
            </div>
        </div>
    );
};

export default InputField;

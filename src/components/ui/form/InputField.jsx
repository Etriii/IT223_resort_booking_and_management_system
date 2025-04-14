import React from "react";

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
        "w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2";

    const errorClass = error ? "border-red-500" : "border-gray-300 focus:ring-blue-500";

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
        </div>
    );
};

export default InputField;

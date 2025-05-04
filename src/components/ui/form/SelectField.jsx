import { DeleteIcon } from "lucide-react";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";
const SelectField = ({
  id,
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error = "",
  className = "",
  disabled = false,
}) => {
  const selectId = id || `select-${name}`;

  const baseClasses = `w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1`;
  const borderClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-green-500";

  const combinedClasses = `${baseClasses} ${borderClasses} ${className}`.trim();

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={combinedClasses}
      >
        <option value="" disabled>
          -- Select an option --
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="flex items-center text-red-500 mt-1"><HiInformationCircle /> <p className="text-red-500 text-sm ">{error}</p></div>}
    </div>
  );
};

export default SelectField;

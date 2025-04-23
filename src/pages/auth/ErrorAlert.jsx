import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ErrorAlert = ({ error, clearError }) => {
  if (!error) return null;

  return (
    <div className="relative border border-red-300 bg-red-50 text-red-700 px-7 py-5 rounded mb-4">
      <button
        onClick={clearError}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
        aria-label="Dismiss error"
      >
        <FaTimes />
      </button>
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default ErrorAlert;

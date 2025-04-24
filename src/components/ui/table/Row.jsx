import React from "react";

const Row = ({ children }) => {
    return (
        <tr className="even:bg-gray-100 hover:bg-gray-100 transition duration-150 ease-in-out">
            {children}
        </tr>
    );
}

export default Row;
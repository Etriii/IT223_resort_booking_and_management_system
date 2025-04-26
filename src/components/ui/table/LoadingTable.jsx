import React from "react";
const LoadingTable = ({ row_count = 1, col_count = 1 }) => {
    const rows = Array(row_count).fill(0);
    const columns = Array(col_count).fill(0);

    return (
        <div className="w-full border overflow-hidden animate-pulse ">
            <table className="min-w-full border-separate border-spacing-1">
                <thead>
                    <tr>
                        {columns.map((_, colIndex) => (
                            <th key={colIndex} className="">
                                <div className="h-9 bg-green-600 border-gray-500" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((_, rowIndex) => (
                        <tr key={rowIndex} className="border-t">
                            {columns.map((_, colIndex) => (
                                <td key={colIndex} className="">
                                    <div className="h-9 bg-gray-200 w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoadingTable;

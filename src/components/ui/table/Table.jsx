import React from 'react'
import LoadingTable from "./LoadingTable";

const Table = ({ children, theadings, isLoading = false }) => {

    const styles = {
        table: 'min-w-full border-separate border-spacing-0 py-1',
        theading: 'bg-green-600 text-white ',
        th: 'border px-3 py-2 text-sm font-semibold text-left whitespace-nowrap text-nowrap last:rounded-tr-sm first:rounded-tl-sm first:w-18 text-left first:text-center last:text-center last:w-28',
        tbody: '',
        row: '',
        col: '',
    };

    if (!theadings.length > 0) {
        return (
            <div className='p-4 text-red-400'>
                Error!  No table headings
            </div>
        );
    }

    if (isLoading) {
        return (
            <LoadingTable row_count={3} col_count={theadings.length} />
        );
    }

    return (
        // <div className="overflow-x-auto">
            <table className={`${styles.table}`}>
                <thead className={`${styles.theading}`}>
                    <tr>
                        {theadings.map((theading, index) => (
                            <th
                                key={index}
                                className={`${styles.th}`}
                            >
                                {theading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        // </div>
    )
}

export default Table
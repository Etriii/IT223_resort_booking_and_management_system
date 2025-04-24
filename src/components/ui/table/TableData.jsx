import React from 'react'
import Row from '../../../components/ui/table/Row';

const TableData = ({ children, columns }) => {

    const td_style = `border border-black`;

    return (
        <Row>
            {columns.map((column, index) => (
                <td key={index} className="first:text-center px-3 py-2 text-sm text-gray-700 whitespace-nowrap border border-gray-300">{column}</td>
            ))}
        </Row>
    )
}

export default TableData
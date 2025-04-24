import AdminLayout from "../../layouts/AdminLayout";
import Table from '../../components/ui/table/Table';
import TableData from '../../components/ui/table/TableData';
import ActionNotification from "../../components/ui/modals/ActionNotification";

import { FiFilter } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io";
import { useState, useEffect } from "react";

const Accounts = () => {

    const [resorts, setResorts] = useState();

    useEffect(() => {

    }, [resorts]);

    return (
        <div>
            <ActionNotification />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
                        <FiFilter className="text-lg" />
                        Filter
                    </button>

                    <select className="px-3 py-2 border rounded-md text-sm text-gray-700 focus: outline-green-600">
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} entries</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition flex space-x-1 items-center">
                        <IoMdAdd /> <span>Add Resort</span>
                    </button>
                </div>
            </div>

            <Table theadings={['id', 'resort name', 'tax rate', 'status', 'contact_details', 'created_at', 'actions']} >
                <TableData columns={[
                    '1', 'Boracay Breeze', '12%', 'Active', '09633127462', '2025-04-24', 'resort_data'
                ]} />
                <TableData columns={[
                    '1', 'Boracay Breeze', '12%', 'Active', '09633127462', '2025-04-24', 'resort_data'
                ]} />
            </Table>

            <div className="flex justify-between items-center p-2">
                <div>
                    <span>Showing n of n entries</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &laquo;
                    </button>
                    <button class="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &lt;
                    </button>
                    <button class="px-3 py-1 rounded-md bg-green-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-green-500">
                        1
                    </button>
                    <button class="px-3 py-1 rounded-md text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        2
                    </button>
                    <button class="px-3 py-1 rounded-md text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        3
                    </button>
                    <span class="text-gray-400">...</span>
                    <button class="px-3 py-1 rounded-md text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        10
                    </button>
                    <button class="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &gt;
                    </button>
                    <button class="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &raquo;
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Accounts;
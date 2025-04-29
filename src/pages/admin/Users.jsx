import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import Table from '../../components/ui/table/Table';
import TableData from '../../components/ui/table/TableData';

const Accounts = () => {

    const [status, setStatus] = useState("Checking...");
    const [currentUser, setCurrentUser] = useState(1);

    useEffect(() => {
        document.title = "Users | Ocean View";
    }, []);

    return (
        <div>
            <Table theadings={['id', '1', '2', '3', '4', '5', '6']}>
                <TableData
                    columns={[
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                    ]}
                />
                <TableData
                    columns={[
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                    ]}
                />
                <TableData
                    columns={[
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                        'yes',
                    ]}
                />
            </Table>
        </div>
    );
}

export default Accounts;
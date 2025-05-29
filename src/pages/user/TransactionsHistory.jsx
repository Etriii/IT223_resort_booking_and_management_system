import React, { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';
import Table from '../../components/ui/table/Table';

const TransactionsHistory = () => {
    useEffect(() => {
        document.title = "Transactions History | Ocean View";
    }, []);

    const headings = ['ID', 'User', 'Amount', 'Status', 'Date'];

    const dummyData = [
        { id: 1, user: 'Alice', amount: '$100', status: 'Paid', date: '2025-05-01' },
        { id: 2, user: 'Bob', amount: '$200', status: 'Pending', date: '2025-05-02' },
    ];

    return (
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Transactions</h1>
                <Table theadings={headings}>
                    {dummyData.map((tx, i) => (
                        <tr key={i}>
                            <td className="border px-3 py-2 text-sm text-center">{tx.id}</td>
                            <td className="border px-3 py-2 text-sm">{tx.user}</td>
                            <td className="border px-3 py-2 text-sm">{tx.amount}</td>
                            <td className="border px-3 py-2 text-sm">{tx.status}</td>
                            <td className="border px-10 py-2 text-sm">{tx.date}</td>
                        </tr>
                    ))}
                </Table>
            </div>
    );
};

export default TransactionsHistory;

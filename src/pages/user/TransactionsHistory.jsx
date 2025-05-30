import React, { useEffect, useState, useRef } from "react";
import { LuEye } from "react-icons/lu";

import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import Pagination from "../../components/ui/table/Pagination";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import TransactionHistoryModal from "../../components/ui/modals/transactionhistorymodal";

const TransactionsHistory = () => {
    const [payments, setPayments] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return { color: '#D97706' };
            case 'approved':
                return { color: '#16A34A' };
            case 'rejected':
                return { color: '#DC2626' };
            // default:
            //     return { color: '#6B7280' };
                  default:
                return { color: '#D97706' };
        }
    };

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        document.title = "Transactions History | Ocean View";

        if (!user_id) return;

        fetch(`http://localhost:8000/api.php?controller=Payments&action=getPaymentsByUserId&user_id=${user_id}`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User's transactions", data);
                if (Array.isArray(data)) setPayments(data);
                else console.error("Unexpected response:", data);
            })
            .catch((error) => console.error("Failed to fetch payments:", error));
    }, []);


    const totalPages = Math.ceil(payments.length / itemsPerPage);
    const paginatedPayments = payments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleView = (transaction) => {
        setSelectedTransaction(transaction);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
        setModalOpen(false);
    };

    if (!payments || payments.length === 0) {

        return <div className="px-8 py-6 border-gray-300 rounded-t-2xl bg-gradient-to-r">
            <h2 className="text-xl text-center font-extrabold text-black tracking-wide">
                Transaction History
            </h2>
            <p className="text-center text-gray-600 py-8">You have no transactions yet.</p></div>;
    }

    return (
        <div className="rounded-2xl border border-gray-300 shadow-lg pb-10 bg-white max-w-full overflow-x-auto">
            <div className="px-8 py-6 border-gray-300 rounded-t-2xl bg-gradient-to-r">
                <h2 className="text-xl text-center font-extrabold text-black tracking-wide">
                    Transaction History
                </h2>
            </div>

            <div className="px-40">
                <table className="min-w-full text-center text-gray-700 text-xs divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            {[
                                "Payment ID",
                                "Amount",
                                "Method",
                                "Received By",
                                "Status",
                                "Date",
                                "Action",
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-4 font-semibold uppercase tracking-wider select-none"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {paginatedPayments.length > 0 ? (
                            paginatedPayments.map((tx) => (
                                <tr key={tx.payment_id} className="hover:bg-gray-100 transition">
                                    <td className="px-4 py-3">{tx.id}</td>
                                    <td className="px-4 py-3">₱{parseFloat(tx.amount_paid).toLocaleString()}</td>
                                    <td className="px-4 py-3">{tx.payment_method}</td>
                                    <td className="px-4 py-3">{tx.received_by || "N/A"}</td>
                                    <td className="px-4 py-3 font-bold">
                                        <p>
                                            <span style={getStatusStyle(tx.payment_submission_status || '')}>
                                                {(tx.payment_submission_status || 'pending').toUpperCase()}
                                            </span>
                                        </p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {tx.created_at
                                            ? new Date(tx.created_at).toLocaleString('en-US', {
                                                month: '2-digit',
                                                day: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3 font-semibold">
                                        <button
                                            onClick={() => handleView(tx)}
                                            className="flex items-center text-blue-600 hover:underline"
                                        >
                                            <LuEye className="mr-1" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-6 text-center text-gray-500">
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {payments.length > 10 && (
                    <div className="flex justify-center items-center gap-2 py-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-md border ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            Previous
                        </button>

                        <span className="text-sm font-medium text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-md border ${currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>

            {modalOpen && selectedTransaction && (
                <TransactionHistoryModal transaction={selectedTransaction} onClose={closeModal} />
            )}
        </div>
    );
};

export default TransactionsHistory;
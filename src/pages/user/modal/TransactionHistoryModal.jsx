import React from 'react';

const TransactionHistoryModal = ({ transaction, onClose }) => {
    if (!transaction) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                >
                    &times;
                </button>
                <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
                <div className="space-y-2">
                    <p><strong>Transaction ID:</strong> {transaction.payment_id}</p>
                    <p><strong>Amount Paid:</strong> ${parseFloat(transaction.amount_paid).toLocaleString()}</p>
                    <p><strong>Payment Method:</strong> {transaction.payment_method}</p>
                    <p><strong>Received By:</strong> {transaction.received_by ?? 'N/A'}</p>
                    <p><strong>Status:</strong> {transaction.booking_status}</p>
                    <p><strong>Payment Date:</strong> {new Date(transaction.payment_date).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistoryModal;

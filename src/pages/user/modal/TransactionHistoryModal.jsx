import React from "react";

const ReadTransactionModal = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transaction Details</h2>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>User ID:</strong> {data.user_id}</p>
      <p><strong>Booking ID:</strong> {data.booking_id}</p>
      <p><strong>Amount:</strong> ₱{data.amount}</p>
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Created At:</strong> {data.created_at}</p>
    </div>
  );
};

export default ReadTransactionModal;

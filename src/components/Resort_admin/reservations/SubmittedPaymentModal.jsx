import React, { useState } from 'react'
import { apiFetch } from '../../../utils/apiFetch';

const SubmittedPaymentModal = ({ payment, closeModal, fetchPayment, fetchReservations }) => {
  const [formData, setFormData] = useState(payment);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.status == payment.status) {
      alert('No Changes Detected. Failed to Update');
      return;
    }
    try {
      const response = await apiFetch(`controller=PaymentSubmissions&action=updatePaymentSubmissionStatus`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
      });

      const data = await response.json();
      if (data.error) {
        console.log('error updating status');
        return;
      }

      console.log('success');

      fetchReservations();
      fetchPayment();
      closeModal();
    } catch (e) {
      console.log(e.message);
    }
    // Your update logic goes here
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">

        <div>
          <label className="block text-gray-700 font-medium mb-1">Payment Submission id</label>
          <input
            type="text"
            value={formData.id}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Booking ID</label>
          <input
            type="text"
            value={formData.booking_id}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Amount Paid</label>
          <input
            type="text"
            value={`₱${formData.amount_paid}`}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Reference Number</label>
          <input
            type="text"
            value={formData.reference_number}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Screenshot</label>
          <img
            src={'https://i.pinimg.com/1200x/60/3b/3b/603b3b985e1eef019b1bb628b6a4f9e8.jpg'}
            alt="Payment Screenshot"
            className="rounded-lg border w-full max-h-80 object-contain"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}


export default SubmittedPaymentModal
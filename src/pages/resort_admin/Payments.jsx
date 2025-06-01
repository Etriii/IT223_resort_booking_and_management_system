import { useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";

const pageSize = 5;

const confirmedMock = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  payer: `Customer ${i + 1}`,
  amount: (500 + i * 100),
  method: i % 2 === 0 ? "GCash" : "Credit Card",
  date: `2025-05-${(i % 30 + 1).toString().padStart(2, "0")}`,
}));

const pendingMock = [
  { id: 101, payer: "Carlos Reyes", amount: 750, method: "Bank Transfer", submittedAt: "2025-05-29" },
  { id: 102, payer: "Liza Gomez", amount: 950, method: "GCash", submittedAt: "2025-05-31" },
];

export default function Payments() {
  const [confirmed, setConfirmed] = useState(confirmedMock);
  const [pending, setPending] = useState(pendingMock);
  const [currentPage, setCurrentPage] = useState(1);

  const confirmSubmission = (id) => {
    const item = pending.find((p) => p.id === id);
    if (item) {
      setConfirmed([
        {
          id: Date.now(),
          payer: item.payer,
          amount: item.amount,
          method: item.method,
          date: new Date().toISOString().split("T")[0],
        },
        ...confirmed,
      ]);
      setPending(pending.filter((p) => p.id !== id));
    }
  };

  const totalPages = Math.ceil(confirmed.length / pageSize);
  const displayed = confirmed.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">💳 Payments Overview</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Table - 70% width */}
        <div className="md:w-[70%] w-full">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Payer</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Method</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((payment) => (
                  <tr key={payment.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{payment.payer}</td>
                    <td className="p-3 text-green-600 font-semibold">₱{payment.amount}</td>
                    <td className="p-3">{payment.method}</td>
                    <td className="p-3">{payment.date}</td>
                    <td className="p-3 text-center">
                      <FaCheckCircle className="inline text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="p-4 flex justify-between items-center bg-gray-100 text-sm">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - 30% width */}
        <div className="md:w-[30%] w-full bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-700 mb-4">
            ⏳ Payment Submissions
          </h2>
          {pending.length === 0 ? (
            <p className="text-sm text-gray-600">No pending submissions.</p>
          ) : (
            pending.map((submission) => (
              <div
                key={submission.id}
                className="bg-white p-4 rounded-lg shadow mb-4 border border-yellow-200"
              >
                <div className="text-md font-medium">{submission.payer}</div>
                <div className="text-sm text-gray-500 mb-2">
                  {submission.method} • {submission.submittedAt}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-700 font-semibold">₱{submission.amount}</span>
                  <button
                    onClick={() => confirmSubmission(submission.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

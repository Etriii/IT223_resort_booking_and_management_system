import React, { useEffect, useState, useRef } from "react";
import { LuEye } from "react-icons/lu";

import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import Pagination from "../../components/ui/table/Pagination";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import TransactionHistoryModal from "../../components/ui/modals/transactionhistorymodal";

const TransactionsHistory = () => {
  const containerRef = useRef(null);
  const [payments, setPayments] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    paginate: 5,
    payment_method: "",
  });

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

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.paginate, filters.payment_method]);

  const filteredPayments = payments.filter((tx) =>
    tx.payment_method
      ?.toLowerCase()
      .includes(filters.payment_method.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / filters.paginate);

  const paginatedPayments = filteredPayments.slice(
    (filters.page - 1) * filters.paginate,
    filters.page * filters.paginate
  );

    const handleView = (transaction) => {
        setSelectedTransaction(transaction);
        setModalOpen(true);
    };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTransaction(null);
  };

  const headings = [
    "ID",
    "Amount",
    "Payment Method",
    "Received By",
    "Status",
    "Date",
    "Actions",
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <div className="flex items-center gap-1">
            <span>Show</span>
            <select
              value={filters.paginate}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  paginate: Number(e.target.value),
                }))
              }
              className="border border-gray-300 rounded px-2 py-1 text-xs"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        {/* Right side: Search Payment Method */}
        <div className="flex items-center gap-2">
          <label htmlFor="searchPaymentMethod" className="text-sm">
            Search Payment Method:
          </label>
          <input
            id="searchPaymentMethod"
            type="text"
            value={filters.payment_method}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                payment_method: e.target.value,
              }))
            }
            placeholder="e.g. Cash"
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      <Table theadings={headings} containerRef={containerRef}>
        {paginatedPayments.length > 0 ? (
          paginatedPayments.map((tx, i) => (
            <TableData
              key={i}
              columns={[
                tx.payment_id,
                `₱${parseFloat(tx.amount_paid).toLocaleString()}`,
                tx.payment_method,
                tx.received_by ?? "N/A",
                tx.booking_status,
                new Date(tx.payment_date).toLocaleString(),
                <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                  <div
                    className="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleView(tx)}
                  >
                    <LuEye className="size-5 mr-2" />
                    View
                  </div>
                </ToggleDiv>,
              ]}
            />
          ))
        ) : (
          <tr>
            <td colSpan={7}>
              <div className="p-2 border border-gray-100">
                No transactions found.
              </div>
            </td>
          </tr>
        )}
      </Table>

      <Pagination
        filters={filters}
        setFilters={setFilters}
        totalPages={totalPages}
        filtered={filteredPayments}
      />

            {modalOpen && selectedTransaction && (
                <TransactionHistoryModal transaction={selectedTransaction} onClose={closeModal} />
            )}
        </div>
    );
};

export default TransactionsHistory;
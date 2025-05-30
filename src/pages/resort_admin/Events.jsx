import React, { useRef, useState, useEffect } from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import Pagination from '../../components/ui/table/Pagination';


import { FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

import InputField from "../../components/ui/form/InputField";
import Modal from "../../components/ui/modals/Modal";

const Events = () => {
  const containerRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("create");

  const openModal = (variant) => {
    setModalVariant(variant);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    console.log("Action Confirmed");
    closeModal();
  };

  const handleCancel = () => {
    console.log("Action Canceled");
    closeModal();
  };

  useEffect(() => {
    document.title = "Events | Ocean View";
    const fetchEvents = async () => {
      try {
        const resort_id = localStorage.getItem("user_role")
          ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
          : null;

        const response = await fetch(
          `http://localhost:8000/api.php?controller=Events&action=getEventByResortId&resort_id=${resort_id}`
        );

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setNotify({
          type: "error",
          message: error.message || "Something went wrong!",
        });
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  const [filters, setFilters] = useState({
    paginate: 5, page: 1, username: ''
  });

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        variant={modalVariant}
        title={
          modalVariant === "create"
            ? "Create Item"
            : modalVariant === "read"
              ? "View Item"
              : modalVariant === "update"
                ? "Edit Item"
                : modalVariant === "delete"
                  ? "Delete Item"
                  : "Information"
        }
        message="Please confirm your action."
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {notify && (
        <ActionNotification isOpen={true} variant={`${notify.type}`}>
          {notify.message}
        </ActionNotification>
      )}

      <div className="flex items-center justify-between flex-wrap ">

        {/* Start filter */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
            <FiFilter className="text-lg" />
            Filter
          </button>

          <select
            className="px-3 py-2 border rounded-md text-sm text-gray-700 focus:outline-green-600"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 10].map((num) => (
              <option key={num} value={num}>
                {num} entries
              </option>
            ))}
          </select>
        </div>
        {/* End filter */}

        <div className="flex items-center space-x-2">
          <InputField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Event Name"
          />

          <button
            className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition flex space-x-1 items-center text-nowrap"
            onClick={() => openModal("create")}
          >
            <IoMdAdd /> <span>Add Events</span>
          </button>
        </div>
      </div>

      <Table theadings={["ID", "Name", "Start Date", "End Date", "Actions"]} isLoading={loading} containerRef={containerRef}>
        {paginatedEvents && paginatedEvents.length > 0 ? (
          paginatedEvents.map((event, index) => (
            <TableData
              key={event.id || index}
              columns={[
                event.id,
                event.name || "Event Name",
                event.start_date || "2025-11-11",
                event.end_date || "2025-12-12",
                <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                  <div
                    className="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer"
                    onClick={() => openModal("read")}
                  >
                    <LuEye className="size-5 mr-2" />
                    View
                  </div>
                  <div
                    className="px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer"
                    onClick={() => openModal("update")}
                  >
                    <BiSolidEditAlt className="size-5 mr-2" />
                    Edit
                  </div>
                  <div
                    className="px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer"
                    onClick={() => openModal("delete")}
                  >
                    <MdOutlineDeleteForever className="size-5 mr-2" />
                    Delete
                  </div>
                </ToggleDiv>,
              ]}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center py-4 text-gray-500">
              No events found.
            </td>
          </tr>
        )}
      </Table>

      <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filtered={filteredEvents} />

    </div>
  );
};

export default Events;

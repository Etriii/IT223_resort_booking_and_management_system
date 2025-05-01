import React from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";

import { FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

import InputField from "../../components/ui/form/InputField";
import Modal from "../../components/ui/modals/Modal";

const Events = () => {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState();

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
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
      }
    };

    fetchEvents();
  }, []);

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
            : modalVariant === "confirmation"
            ? "Are you sure?"
            : "Information"
        }
        message={
          modalVariant === "create"
            ? "Enter the details to create a new item."
            : modalVariant === "read"
            ? "Here are the details of the item."
            : modalVariant === "update"
            ? "Edit the details of the item."
            : modalVariant === "delete"
            ? "Are you sure you want to delete this item?"
            : modalVariant === "confirmation"
            ? "Please confirm your action."
            : "This is some important information."
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      ></Modal>
      {notify && (
        <ActionNotification isOpen={true} variant={`${notify.type}`}>
          {notify.message}
        </ActionNotification>
      )}
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
            <FiFilter className="text-lg" />
            Filter
          </button>

          <select className="px-3 py-2 border rounded-md text-sm text-gray-700 focus: outline-green-600">
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} entries
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span>Username:</span>
            <InputField />
          </div>
          <button
            className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition flex space-x-1 items-center text-nowrap"
            onClick={() => openModal("create")}
          >
            <IoMdAdd /> <span>Add Events</span>
          </button>
        </div>
      </div>
      <Table theadings={["ID", "Name", "start_date", "end_date", "actions"]}>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <TableData
              key={event.id || index}
              columns={[
                event.id,
                event.name || "Event Name",
                event.start_date || "2025-11-11",
                event.end_date || "2025-12-12",
                <ToggleDiv buttonText="Actions">
                  <div
                    className=" px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer"
                    onClick={() => openModal("read")}
                  >
                    {" "}
                    <LuEye className="size-5 mr-2" />
                    View{" "}
                  </div>
                  <div
                    className=" px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer"
                    onClick={() => openModal("update")}
                  >
                    {" "}
                    <BiSolidEditAlt className="size-5 mr-2" />
                    Edit{" "}
                  </div>
                  <div
                    className=" px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer"
                    onClick={() => openModal("delete")}
                  >
                    {" "}
                    <MdOutlineDeleteForever className="size-5 mr-2" />
                    Delete{" "}
                  </div>
                </ToggleDiv>,
              ]}
            />
          ))
        ) : (
          <tr></tr>
        )}
      </Table>
    </div>
  );
};

export default Events;

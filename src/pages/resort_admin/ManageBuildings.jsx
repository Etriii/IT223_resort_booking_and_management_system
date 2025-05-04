import React from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";

import { FiFilter } from "react-icons/fi";git 
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

import Modal from "../../components/ui/modals/Modal";
import InputField from "../../components/ui/form/InputField";

const ManageBuildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("create");

  const openModal = (variant) => {
    setModalVariant(variant);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    console.log("Confirmed");
    closeModal();
  };

  const handleCancel = () => {
    console.log("Canceled");
    closeModal();
  };

  useEffect(() => {
    
    document.title = "Manage Buildings | Ocean View";

    const fetchBuildings = async () => {
      try {
        const resort_id = localStorage.getItem("user_role")
          ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
          : null;

        const res = await fetch(
          `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortId&resort_id=${resort_id}`
        );
        const data = await res.json();
        setBuildings(data);
      } catch (err) {
        setNotify({
          type: "error",
          message: "Failed to fetch buildings",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        variant={modalVariant}
        title={
          modalVariant === "create"
            ? "Add Building"
            : modalVariant === "update"
            ? "Edit Building"
            : modalVariant === "read"
            ? "View Building"
            : "Delete Building"
        }
        message="Modal content goes here"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {notify && (
        <ActionNotification isOpen={true} variant={notify.type}>
          {notify.message}
        </ActionNotification>
      )}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 border px-3 py-2 rounded-md text-sm hover:bg-gray-100">
            <FiFilter />
            Filter
          </button>
          <select className="px-3 py-2 border rounded-md text-sm">
            {[...Array(10)].map((_, i) => (
              <option key={i + 1}>{i + 1} entries</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>Search:</span>
          <InputField />
          <button
            className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-nowrap"
            onClick={() => openModal("create")}
          >
            <IoMdAdd />
            Add Building
          </button>
        </div>
      </div>
      <Table theadings={["ID", "Name", "Floors", "Rooms", "Actions"]}>
        {buildings.map((bld, index) => (
          <TableData
            key={bld.id || index}
            columns={[
              bld.id,
              bld.name,
              bld.floor_count,
              bld.room_per_floor,
              <ToggleDiv buttonText="Actions">
                <div
                  className="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer"
                  onClick={() => openModal("read")}
                >
                  <LuEye className="mr-2" /> View
                </div>
                <div
                  className="px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer"
                  onClick={() => openModal("update")}
                >
                  <BiSolidEditAlt className="mr-2" /> Edit
                </div>
                <div
                  className="px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer"
                  onClick={() => openModal("delete")}
                >
                  <MdOutlineDeleteForever className="mr-2" /> Delete
                </div>
              </ToggleDiv>,
            ]}
          />
        ))}
      </Table>
    </div>
  );
};

export default ManageBuildings;
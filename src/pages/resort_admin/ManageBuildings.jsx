import React, { useEffect, useState } from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import Modal from "../../components/ui/modals/Modal";
import InputField from "../../components/ui/form/InputField";

import { FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

const ManageBuildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("create");
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [buildingFormData, setBuildingFormData] = useState({
    name: "",
    floor_count: "",
    room_per_floor: "",
    room_image: null,
  });

  const openModal = (variant, building = null) => {
    setModalVariant(variant);
    setSelectedBuilding(building);

    if (building) {
      setBuildingFormData({
        name: building.name || "",
        floor_count: building.floor_count || "",
        room_per_floor: building.room_per_floor || "",
      });
    } else {
      setBuildingFormData({
        name: "",
        floor_count: "",
        room_per_floor: "",
      });
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBuilding(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuildingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setRoomFormData({
      ...roomFormData,
      room_image: e.target.files[0],
    });
  };

  const handleConfirm = async () => {
    try {
      const headers = { "Content-Type": "application/json" };
      let response;

      const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;

      if (modalVariant === "create") {
        response = await fetch("http://localhost:8000/api.php?controller=Buildings&action=addBuilding", {
          method: "POST",
          headers,
          body: JSON.stringify({ ...buildingFormData, resort_id }),
        });
      } else if (modalVariant === "update" && selectedBuilding) {
        response = await fetch(
          `http://localhost:8000/api.php?controller=Buildings&action=updateBuilding&id=${selectedBuilding.id}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify(buildingFormData),
          }
        );
      } else if (modalVariant === "delete" && selectedBuilding) {
        response = await fetch(
          `http://localhost:8000/api.php?controller=Buildings&action=deleteBuilding&id=${selectedBuilding.id}`,
          { method: "DELETE" }
        );
      }

      const data = await response.json();

      if (data.success) {
        setNotify({ type: "success", message: data.message || "Action successful" });
        closeModal();
        fetchBuildings(); // Refresh list
      } else {
        throw new Error(data.message || "Action failed");
      }
    } catch (err) {
      setNotify({ type: "error", message: err.message || "Something went wrong" });
    }
  };

  const fetchBuildings = async () => {
    try {
      const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;

      const res = await fetch(
        `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortId&resort_id=${resort_id}`
      );
      const data = await res.json();
      setBuildings(data);
    } catch (err) {
      setNotify({ type: "error", message: "Failed to fetch buildings" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Manage Buildings | Ocean View";
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
        message={
          modalVariant === "delete"
            ? `Are you sure you want to delete "${selectedBuilding?.name}"?`
            : undefined
        }
        onConfirm={handleConfirm}
        onCancel={closeModal}
      >
        {(modalVariant === "create" || modalVariant === "update" || modalVariant === "read") && (
          <form className="space-y-4">
            <div>
            <label className="block font-medium mb-1">Room Image</label>
            <input
              type="file"
              name="room_image"
              onChange={handleImageChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>
            <div>
              <label className="block mb-1 font-medium">Building Name</label>
              <input
                type="text"
                name="name"
                value={buildingFormData.name}
                onChange={handleInputChange}
                disabled={modalVariant === "read"}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Number of Floors</label>
              <input
                type="number"
                name="floor_count"
                value={buildingFormData.floor_count}
                onChange={handleInputChange}
                disabled={modalVariant === "read"}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Rooms Per Floor</label>
              <input
                type="number"
                name="room_per_floor"
                value={buildingFormData.room_per_floor}
                onChange={handleInputChange}
                disabled={modalVariant === "read"}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </form>
        )}
      </Modal>

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
                  onClick={() => openModal("read", bld)}
                >
                  <LuEye className="mr-2" /> View
                </div>
                <div
                  className="px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer"
                  onClick={() => openModal("update", bld)}
                >
                  <BiSolidEditAlt className="mr-2" /> Edit
                </div>
                <div
                  className="px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer"
                  onClick={() => openModal("delete", bld)}
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

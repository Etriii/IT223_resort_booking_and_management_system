import React, { useEffect, useState } from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import { FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import Modal from "../../components/ui/modals/Modal";
import InputField from "../../components/ui/form/InputField";

const ManageBuildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("create");
  const [roomFormData, setRoomFormData] = useState({
    building_id: "",
    room_type_id: "",
    room_name: "",
    description: "",
    inclusions: "",
    amenities: "",
    floor_number: "", // 👈 Add this
    price_per_night: "",
    is_available: "1", // Default to available
    room_image: null,
  });

  const openModal = (variant) => {
    setModalVariant(variant);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleBuildingChange = async (event) => {
    const buildingId = event.target.value;

    const selectedBuilding = buildings.find((bld) => String(bld.id) === String(buildingId));


    if (buildingId) {
      try {
        const res = await fetch(
          `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&building_id=${buildingId}`
        );
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        setNotify({
          type: "error",
          message: "Failed to fetch rooms for this building",
        });
      }
    } else {
      setRooms([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomFormData({
      ...roomFormData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setRoomFormData({
      ...roomFormData,
      room_image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you will handle the form submission to your server
    const formData = new FormData();
    for (const key in roomFormData) {
      formData.append(key, roomFormData[key]);
    }

    try {
      const response = await fetch("http://localhost:8000/api.php?controller=Rooms&action=addRoom", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setNotify({
          type: "success",
          message: "Room added successfully!",
        });
        closeModal();
        // Optionally, fetch rooms again
        fetchRooms();
      } else {
        setNotify({
          type: "error",
          message: "Failed to add room.",
        });
      }
    } catch (err) {
      setNotify({
        type: "error",
        message: "Failed to add room.",
      });
    }
  };

  const fetchRooms = async () => {
    if (selectedBuilding) {
      try {
        const res = await fetch(
          `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&building_id=${selectedBuilding.id}`
        );
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        setNotify({
          type: "error",
          message: "Failed to fetch rooms for this building",
        });
      }
    }
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
        if (data.length > 0) {
          setSelectedBuilding(data[0]);
          const firstBuildingId = data[0].id;
          const res = await fetch(
            `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&building_id=${firstBuildingId}`
          );
          const roomsData = await res.json();
          setRooms(roomsData);
        }
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
            ? "Add Room"
            : modalVariant === "update"
            ? "Edit Room"
            : modalVariant === "read"
            ? "View Room"
            : "Delete Room"
        }
        message="Modal content goes here"
        onConfirm={handleSubmit} // Handle form submission
        onCancel={closeModal}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Building</label>
            <select
            name="building_id"
            className="w-full border p-3 rounded-lg"
            value={roomFormData.building_id}
            onChange={handleInputChange}
            required
          >
  {buildings.map((bld) => (
    <option key={bld.id} value={bld.id}>
      {bld.name}
    </option>
  ))}
</select>
          </div>

          <div>
            <label className="block font-medium mb-1">Room Name</label>
            <input
              type="text"
              name="room_name"
              value={roomFormData.room_name}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

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
            <label className="block font-medium mb-1">Room Description</label>
            <textarea
              name="description"
              value={roomFormData.description}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-lg"
              rows="3"
            ></textarea>
          </div>
          
          <div>
            <label className="block font-medium mb-1">Floor Number</label>
              <input
                type="number"
                  name="floor_number"
                  value={roomFormData.floor_number}
                  onChange={handleInputChange}
                className="w-full border p-3 rounded-lg"
              required/>
            </div>

        <div>
           <label className="block font-medium mb-1">Amenities</label>
            <textarea
              name="amenities"
                value={roomFormData.amenities}
                  onChange={handleInputChange}
                className="w-full border p-3 rounded-lg"
              rows="3"></textarea>
          </div>

        <div>
          <label className="block font-medium mb-1">Inclusions</label>
            <textarea
              name="inclusions"
                value={roomFormData.inclusions}
              onChange={handleInputChange}
            className="w-full border p-3 rounded-lg"
          rows="3">
        </textarea>
      </div>


          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg">
              Save Room
            </button>
          </div>
        </form>
      </Modal>

      {notify && (
        <ActionNotification isOpen={true} variant={notify.type}>
          {notify.message}
        </ActionNotification>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <select
            id="building-select"
            value={selectedBuilding ? selectedBuilding.id : ""}
            onChange={handleBuildingChange}
            className="px-3 py-2 border rounded-md text-sm"
          >

            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>

          <button className="flex items-center gap-2 border px-3 py-2 rounded-md text-sm hover:bg-gray-100">
            <FiFilter />
            Filter
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>Search:</span>
          <InputField />
          <button
            className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-nowrap"
            onClick={() => openModal("create")}
          >
            <IoMdAdd />
            Add Room
          </button>
        </div>
      </div>

      <Table theadings={["ID", "Name", "Type", "Price", "Status", "Actions"]}>
        {rooms.map((room, index) => (
          <TableData
            key={room.id || index}
            columns={[
              room.id,
              room.name,
              room.type,
              room.price,
              room.status,
              <ToggleDiv buttonText="Actions">
                <div className="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer">
                  <LuEye className="mr-2" /> View
                </div>
                <div className="px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer">
                  <BiSolidEditAlt className="mr-2" /> Edit
                </div>
                <div className="px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer">
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

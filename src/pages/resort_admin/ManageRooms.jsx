import React, { useEffect, useState, useRef } from "react";
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

const ManageRooms = () => {
  const containerRef = useRef(null);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [notify, setNotify] = useState(null);

  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState("create");

  const [roomFormData, setRoomFormData] = useState({
    building_id: "",
    room_type_id: "",
    room_name: "",
    description: "",
    inclusions: "",
    amenities: "",
    floor_number: "",
    price_per_night: "",
    is_available: "1",
    room_image: null,
  });

  const openModal = (variant, room = null) => {
    setModalVariant(variant);
    setSelectedRoom(room);

    if (room) {
      setRoomFormData({
        ...room,
        room_image: null, // reset image field
      });
    } else {
      setRoomFormData({
        building_id: selectedBuilding?.id || "",
        room_type_id: "",
        room_name: "",
        description: "",
        inclusions: "",
        amenities: "",
        floor_number: "",
        price_per_night: "",
        is_available: "1",
        room_image: null,
      });
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleBuildingChange = async (e) => {
    const buildingId = e.target.value;
    const selected = buildings.find((bld) => String(bld.id) === String(buildingId));
    setSelectedBuilding(selected);
    setRoomFormData((prev) => ({ ...prev, building_id: buildingId }));
    fetchRooms(buildingId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setRoomFormData((prev) => ({
      ...prev,
      room_image: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in roomFormData) {
      formData.append(key, roomFormData[key]);
    }

    try {
      const endpoint =
        modalVariant === "create"
          ? "addRoom"
          : modalVariant === "update" && selectedRoom
          ? `updateRoom&id=${selectedRoom.id}`
          : "";

      const method = modalVariant === "create" ? "POST" : "POST";

      const res = await fetch(
        `http://localhost:8000/api.php?controller=Rooms&action=${endpoint}`,
        {
          method,
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setNotify({ type: "success", message: data.message || "Action successful" });
        closeModal();
        fetchRooms(selectedBuilding?.id);
      } else {
        throw new Error(data.message || "Action failed.");
      }
    } catch (err) {
      setNotify({ type: "error", message: err.message });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api.php?controller=Rooms&action=deleteRoom&id=${selectedRoom?.id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        setNotify({ type: "success", message: "Room deleted successfully!" });
        closeModal();
        fetchRooms(selectedBuilding?.id);
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (err) {
      setNotify({ type: "error", message: err.message });
    }
  };

  const fetchRooms = async (buildingId) => {
    if (!buildingId) return;
    try {
      const res = await fetch(
        `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&building_id=${buildingId}`
      );
      const data = await res.json();
      setRooms(data);
    } catch {
      setNotify({ type: "error", message: "Failed to fetch rooms" });
    }
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;
        const res = await fetch(
          `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortId&resort_id=${resort_id}`
        );
        const data = await res.json();
        setBuildings(data);
        if (data.length > 0) {
          setSelectedBuilding(data[0]);
          setRoomFormData((prev) => ({ ...prev, building_id: data[0].id }));
          fetchRooms(data[0].id);
        }
      } catch {
        setNotify({ type: "error", message: "Failed to fetch buildings" });
      }
    };

    document.title = "Manage Rooms | Ocean View";
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
        message={
          modalVariant === "delete"
            ? `Are you sure you want to delete "${selectedRoom?.room_name}"?`
            : "Provide room details below"
        }
        onConfirm={modalVariant === "delete" ? handleDelete : handleSubmit}
        onCancel={closeModal}
      >
        {(modalVariant === "create" || modalVariant === "update" || modalVariant === "read") && (
          <form className="space-y-6">
            <div>
              <label className="block font-medium mb-1">Building</label>
              <select
                name="building_id"
                value={roomFormData.building_id}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg"
                disabled={modalVariant === "read"}
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
                disabled={modalVariant === "read"}
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
                disabled={modalVariant === "read"}
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
                disabled={modalVariant === "read"}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Floor Number</label>
              <input
                type="number"
                name="floor_number"
                value={roomFormData.floor_number}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg"
                disabled={modalVariant === "read"}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Amenities</label>
              <textarea
                name="amenities"
                value={roomFormData.amenities}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg"
                rows="3"
                disabled={modalVariant === "read"}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Inclusions</label>
              <textarea
                name="inclusions"
                value={roomFormData.inclusions}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg"
                rows="3"
                disabled={modalVariant === "read"}
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
        <div className="flex gap-4 items-center">
          <select
            value={selectedBuilding?.id || ""}
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

      {/* Table */}
      <Table theadings={["ID", "Name", "Type", "Price", "Status", "Actions"]} containerRef={containerRef}>
        {rooms.map((room, index) => (
          <TableData
            key={room.id || index}
            columns={[
              room.id,
              room.room_name || "Unnamed",
              room.room_type_id || "N/A",
              room.price_per_night || "N/A",
              room.is_available === "1" ? "Available" : "Unavailable",
              <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                <div
                  className="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer"
                  onClick={() => openModal("read", room)}
                >
                  <LuEye className="mr-2" /> View
                </div>
                <div
                  className="px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer"
                  onClick={() => openModal("update", room)}
                >
                  <BiSolidEditAlt className="mr-2" /> Edit
                </div>
                <div
                  className="px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer"
                  onClick={() => openModal("delete", room)}
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

export default ManageRooms;

// import React, { useEffect, useState, useRef } from "react";
// import Table from "../../components/ui/table/Table";
// import TableData from "../../components/ui/table/TableData";
// import ToggleDiv from "../../components/ui/modals/ToggleDiv";
// import ActionNotification from "../../components/ui/modals/ActionNotification";
// import InputField from "../../components/ui/form/InputField";
// import { FiFilter } from "react-icons/fi";
// import { IoMdAdd } from "react-icons/io";
// import { LuEye } from "react-icons/lu";
// import { BiSolidEditAlt } from "react-icons/bi";
// import { MdOutlineDeleteForever } from "react-icons/md";

// // You will create these
// import CreateRoomsModal from "./modals/CreateRoomsModal";
// import UpdateRoomsModal from "./modals/UpdateRoomsModal";
// import ReadRoomsModal from "./modals/ReadRoomsModal";
// import DeleteRoomsModal from "./modals/DeleteRoomsModal";

// const ManageRooms = () => {
//   const containerRef = useRef(null);

//   const [buildings, setBuildings] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [selectedBuilding, setSelectedBuilding] = useState(null);
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   const [modalType, setModalType] = useState(null); // "create" | "update" | "view" | "delete"
//   const [notify, setNotify] = useState(null);

//   const fetchRooms = async (buildingId) => {
//     if (!buildingId) return;
//     try {
//       const res = await fetch(
//         `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&building_id=${buildingId}`
//       );
//       const data = await res.json();
//       setRooms(data);
//     } catch {
//       setNotify({ type: "error", message: "Failed to fetch rooms" });
//     }
//   };

//   const fetchBuildings = async () => {
//     try {
//       const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;
//       const res = await fetch(
//         `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortId&resort_id=${resort_id}`
//       );
//       const data = await res.json();
//       setBuildings(data);
//       if (data.length > 0) {
//         setSelectedBuilding(data[0]);
//         fetchRooms(data[0].id);
//       }
//     } catch {
//       setNotify({ type: "error", message: "Failed to fetch buildings" });
//     }
//   };

//   const handleBuildingChange = (e) => {
//     const buildingId = e.target.value;
//     const building = buildings.find((bld) => String(bld.id) === String(buildingId));
//     setSelectedBuilding(building);
//     fetchRooms(buildingId);
//   };

//   const openModal = (type, room = null) => {
//     setSelectedRoom(room);
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setModalType(null);
//     setSelectedRoom(null);
//   };

//   useEffect(() => {
//     document.title = "Manage Rooms | Ocean View";
//     fetchBuildings();
//   }, []);

//   return (
//     <div>
//       {modalType === "create" && (
//         <CreateRoomsModal
//           buildingId={selectedBuilding?.id}
//           onSuccess={() => {
//             fetchRooms(selectedBuilding?.id);
//             closeModal();
//             setNotify({ type: "success", message: "Room created successfully!" });
//           }}
//           onCancel={closeModal}
//         />
//       )}
//       {modalType === "update" && selectedRoom && (
//         <UpdateRoomsModal
//           room={selectedRoom}
//           onSuccess={() => {
//             fetchRooms(selectedBuilding?.id);
//             closeModal();
//             setNotify({ type: "success", message: "Room updated successfully!" });
//           }}
//           onCancel={closeModal}
//         />
//       )}
//       {modalType === "view" && selectedRoom && (
//         <ReadRoomsModal room={selectedRoom} onClose={closeModal} />
//       )}
//       {modalType === "delete" && selectedRoom && (
//         <DeleteRoomsModal
//           room={selectedRoom}
//           onSuccess={() => {
//             fetchRooms(selectedBuilding?.id);
//             closeModal();
//             setNotify({ type: "success", message: "Room deleted successfully!" });
//           }}
//           onCancel={closeModal}
//         />
//       )}

//       {notify && (
//         <ActionNotification isOpen={true} variant={notify.type}>
//           {notify.message}
//         </ActionNotification>
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-4 items-center">
//           <select
//             value={selectedBuilding?.id || ""}
//             onChange={handleBuildingChange}
//             className="px-3 py-2 border rounded-md text-sm"
//           >
//             {buildings.map((b) => (
//               <option key={b.id} value={b.id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//           <button className="flex items-center gap-2 border px-3 py-2 rounded-md text-sm hover:bg-gray-100">
//             <FiFilter />
//             Filter
//           </button>
//         </div>
//         <div className="flex items-center gap-2">
//           <span>Search:</span>
//           <InputField />
//           <button
//             className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-nowrap"
//             onClick={() => openModal("create")}
//           >
//             <IoMdAdd />
//             Add Room
//           </button>
//         </div>
//       </div>

//       <Table theadings={["ID", "Name", "Type", "Price", "Status", "Actions"]} containerRef={containerRef}>
//         {rooms.map((room, index) => (
//           <TableData
//             key={room.id || index}
//             columns={[
//               room.id,
//               room.room_name,
//               room.room_type_id,
//               room.price_per_night,
//               room.is_available === "1" ? "Available" : "Unavailable",
//               <ToggleDiv buttonText="Actions" containerRef={containerRef}>
//                 <div className="px-2 py-1 hover:bg-gray-200 cursor-pointer" onClick={() => openModal("view", room)}>
//                   <LuEye className="mr-2" /> View
//                 </div>
//                 <div className="px-2 py-1 hover:bg-gray-200 text-orange-600 cursor-pointer" onClick={() => openModal("update", room)}>
//                   <BiSolidEditAlt className="mr-2" /> Edit
//                 </div>
//                 <div className="px-2 py-1 hover:bg-gray-200 text-red-600 cursor-pointer" onClick={() => openModal("delete", room)}>
//                   <MdOutlineDeleteForever className="mr-2" /> Delete
//                 </div>
//               </ToggleDiv>,
//             ]}
//           />
//         ))}
//       </Table>
//     </div>
//   );
// };

// export default ManageRooms;

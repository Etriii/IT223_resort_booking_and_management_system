 import React, { useEffect, useState, useRef } from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import InputField from "../../components/ui/form/InputField";
import { FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

// You will create these
import { CreateRoomsModal, UpdateRoomsModal, ReadRoomsModal, DeleteRoomsModal } from "./modals";

const ManageRooms = () => {
  const containerRef = useRef(null);

  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [modalType, setModalType] = useState(null); // "create" | "update" | "view" | "delete"
  const [notify, setNotify] = useState(null);

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
        fetchRooms(data[0].id);
      }
    } catch {
      setNotify({ type: "error", message: "Failed to fetch buildings" });
    }
  };

  const handleBuildingChange = (e) => {
    const buildingId = e.target.value;
    const building = buildings.find((bld) => String(bld.id) === String(buildingId));
    setSelectedBuilding(building);
    fetchRooms(buildingId);
  };

  const openModal = (type, room = null) => {
    setSelectedRoom(room);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRoom(null);
  };

  useEffect(() => {
    document.title = "Manage Rooms | Ocean View";
    fetchBuildings();
  }, []);

  return (
    <div>
      {modalType === "create" && (
        <CreateRoomsModal
          buildingId={selectedBuilding?.id}
          onSuccess={() => {
            fetchRooms(selectedBuilding?.id);
            closeModal();
            setNotify({ type: "success", message: "Room created successfully!" });
          }}
          onCancel={closeModal}
        />
      )}
      {modalType === "update" && selectedRoom && (
        <UpdateRoomsModal
          room={selectedRoom}
          onSuccess={() => {
            fetchRooms(selectedBuilding?.id);
            closeModal();
            setNotify({ type: "success", message: "Room updated successfully!" });
          }}
          onCancel={closeModal}
        />
      )}
      {modalType === "view" && selectedRoom && (
        <ReadRoomsModal room={selectedRoom} onClose={closeModal} />
      )}
      {modalType === "delete" && selectedRoom && (
        <DeleteRoomsModal
          room={selectedRoom}
          onSuccess={() => {
            fetchRooms(selectedBuilding?.id);
            closeModal();
            setNotify({ type: "success", message: "Room deleted successfully!" });
          }}
          onCancel={closeModal}
        />
      )}

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
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
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

      <Table theadings={["ID", "Name", "Type", "Price", "Status", "Actions"]} containerRef={containerRef}>
        {rooms.map((room, index) => (
          <TableData
            key={room.id || index}
            columns={[
              room.id,
              room.room_name,
              room.room_type_id,
              room.price_per_night,
              room.is_available === "1" ? "Available" : "Unavailable",
              <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                <div className="px-2 py-1 hover:bg-gray-200 cursor-pointer" onClick={() => openModal("view", room)}>
                  <LuEye className="mr-2" /> View
                </div>
                <div className="px-2 py-1 hover:bg-gray-200 text-orange-600 cursor-pointer" onClick={() => openModal("update", room)}>
                  <BiSolidEditAlt className="mr-2" /> Edit
                </div>
                <div className="px-2 py-1 hover:bg-gray-200 text-red-600 cursor-pointer" onClick={() => openModal("delete", room)}>
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

// import Modal from "../../components/ui/modals/Modal";
// // You will create these
// import { CreateRoomsModal, UpdateRoomsModal, ReadRoomsModal, DeleteRoomsModal } from "./modals";

// const ManageRooms = () => {
//   const containerRef = useRef(null);

//   const [buildings, setBuildings] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [selectedBuilding, setSelectedBuilding] = useState(null);

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

//   // const openModal = (type, room = null) => {
//   //   setSelectedRoom(room);
//   //   setModalType(type);
//   // };

//   // const closeModal = () => {
//   //   setModalType(null);
//   //   setSelectedRoom(null);
//   // };

//   useEffect(() => {
//     document.title = "Manage Rooms | Ocean View";
//     fetchBuildings();
//   }, []);



//   const [modal, setModal] = useState({ isOpen: false, variant: 'default', children: <div></div>, loading: false, title: '' });

//   const openModal = (variant, resort) => {
//     let children;
//     let modal_title;

//     switch (variant) {
//       case 'create':
//         children = <CreateRoomsModal handleCreateFormInputChange={handleCreateFormInputChange} formData={createResortForm} />;
//         modal_title = 'Create Resort';
//         break;
//       case 'read':
//         children = <UpdateRoomsModal resort={resort} />;
//         modal_title = 'View Resort';
//         break;
//       case 'update':
//         children = <ReadRoomsModal resort={resort} handleEditFormInputChange={handleEditFormInputChange} editResortForm={{ values: resort }} />;
//         modal_title = 'Edit Resort';
//         break;
//       case 'delete':
//         children = <DeleteRoomsModal resort={resort} setDeleteResortForm={setDeleteResortForm} />;
//         modal_title = 'Delete Resort';
//         break;
//       case 'filter':
//         children = <FilterModal filters={filters} setFilters={setFilters} />;
//         modal_title = 'Filters';
//         break;
//       default:
//         children = <>Nahh wala</>;
//     }
//     setModal({ isOpen: true, variant, children, loading: false, title: modal_title });
//   };

//   const handleConfirm = () => {

//     setModal(prev => ({ ...prev, loading: true }));//pang loading rani sa button
//     setNotify({}); //reset ang notif ni ha

//     setTimeout(async () => {
//       let result;

//       try {
//         switch (modal.variant) {
//           case 'create':
//             result = await createResort(createResortForm.values);
//             break;
//           case 'update':
//             // console.log(editResortForm.values);
//             result = await editResort(editResortForm.values);
//             break;
//           case 'delete':
//             result = await deleteResort(deleteResortForm.resort_id);
//             break;
//           default:
//             throw new Error("Unknown action mode");
//         }
//       } catch (error) {
//         setModal(prev => ({ ...prev, loading: false }));
//         setNotify({
//           open: true,
//           type: 'error',  
//           message: error.message || 'Something went wrong!'
//         });
//         return;
//       }

//       setModal(prev => ({ ...prev, loading: false }));

//       if (result.success) {
//         fetchResorts();
//         setNotify({
//           open: true,
//           type: modal.variant,
//           message: result.message
//         });
//         closeModal();
//       } else {
//         setNotify({
//           open: true,
//           type: 'error',
//           message: result.message
//         });
//       }
//     }, 1000);
//   };

//   return (
//     <div>

//       <Modal isOpen={modal.isOpen} onClose={closeModal} variant={modal.variant} title={modal.title} loading={modal.loading} children={modal.children}/* Here ang mga body sa imong modal */ onConfirm={handleConfirm} onCancel={() => closeModal()} />

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
//             className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-nowrap"
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

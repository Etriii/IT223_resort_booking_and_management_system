import React, { useEffect, useState, useRef } from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import Modal from "../../components/ui/modals/Modal";
import Pagination from "../../components/ui/table/Pagination";
import FilterAndActions from "../../components/ui/table/FilterAndActions";

import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

import {
  CreateRoomsModal,
  UpdateRoomsModal,
  ReadRoomsModal,
  DeleteRoomsModal,
} from "./modals";

const ManageRooms = () => {
  const containerRef = useRef(null);

  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [modal, setModal] = useState({
    isOpen: false,
    variant: "",
    title: "",
    loading: false,
    room: null,
  });

  const [formData, setFormData] = useState({
    values: {
      room_number: "",
      floor_number: "",
      room_type: "",
      image: null,
    },
    errors: {},
  });

  const [notify, setNotify] = useState(null);

  const [filters, setFilters] = useState({
    paginate: 5,
    page: 1,
    room_name: "",
  });

  // Fetch room types
  const fetchRoomTypes = () => {
    const data = [
      { id: 1, name: "King Size", description: "", capacity: 5, base_price: 3500.0 },
      { id: 2, name: "Queen Size", description: "", capacity: 4, base_price: 3000.0 },
      { id: 3, name: "Twin Bed", description: "", capacity: 2, base_price: 2800.0 },
      { id: 4, name: "Deluxe Suite", description: "", capacity: 4, base_price: 5000.0 },
      { id: 5, name: "Family Room", description: "", capacity: 7, base_price: 4000.0 },
      { id: 6, name: "Penthouse Suite", description: "", capacity: 10, base_price: 8000.0 },
      { id: 7, name: "Bungalow Villa", description: "", capacity: 8, base_price: 6000.0 }
    ];
    setRoomTypes(data);
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

  const fetchRooms = async (buildingId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&building_id=${buildingId}`
      );
      let data = await res.json();
      data = data.map(room => {
        const typeObj = roomTypes.find(rt => String(rt.id) === String(room.room_type_id));
        return {
          ...room,
          room_type_name: typeObj ? typeObj.name : "Unknown",
        };
      });
      setRooms(data);
    } catch {
      setNotify({ type: "error", message: "Failed to fetch rooms" });
    }
  };

  const handleBuildingChange = (e) => {
    const buildingId = e.target.value;
    const building = buildings.find((b) => String(b.id) === String(buildingId));
    setSelectedBuilding(building);
    fetchRooms(buildingId);
    setFilters((prev) => ({ ...prev, page: 1, room_name: "" }));
  };

  const openModal = (variant, room = null) => {
    setModal({
      isOpen: true,
      variant,
      title:
        variant === "create"
          ? "Add Room"
          : variant === "update"
            ? "Edit Room"
            : variant === "view"
              ? "View Room"
              : variant === "delete"
                ? "Delete Room"
                : "",
      loading: false,
      room,
    });

    if (variant === "update" && room) {
      setFormData({
        values: room
      });
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, variant: "", title: "", loading: false, room: null });
  };

  const handleSuccess = (message) => {
    fetchRooms(selectedBuilding?.id);
    closeModal();
    setNotify({ type: "success", message });
  };

  const filteredRooms = rooms.filter((room) => {
    if (!filters.room_name) return true;
    return room.room_name?.toLowerCase().includes(filters.room_name.toLowerCase());
  });

  const totalPages = Math.ceil(filteredRooms.length / filters.paginate);
  const paginatedRooms = filteredRooms.slice(
    (filters.page - 1) * filters.paginate,
    filters.page * filters.paginate
  );

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.room_name, filters.paginate]);

  useEffect(() => {
    document.title = "Manage Rooms | Ocean View";
    fetchRoomTypes();
    fetchBuildings();
  }, []);

  return (
    <div>
      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        variant={modal.variant}
        title={modal.title}
        loading={modal.loading}
      >
        {modal.variant === "create" && (
          <CreateRoomsModal
            buildingId={selectedBuilding?.id}
            onSuccess={handleSuccess}
            onCancel={closeModal}
            roomTypes={roomTypes}
          />
        )}
        {modal.variant === "update" && (
          <UpdateRoomsModal
            formData={formData}
            setFormData={setFormData}
            onSuccess={handleSuccess}
            onCancel={closeModal}
            roomTypes={roomTypes}
          />
        )}
        {modal.variant === "view" && <ReadRoomsModal room={modal.room} onClose={closeModal} />}
        {modal.variant === "delete" && (
          <DeleteRoomsModal room={modal.room} onSuccess={handleSuccess} onCancel={closeModal} />
        )}
      </Modal>

      {/* Notification */}
      {notify && (
        <ActionNotification isOpen={true} variant={notify.type}>
          {notify.message}
        </ActionNotification>
      )}

      {/* Building Selector */}
      <div className="mb-4">
        <label htmlFor="building-selector" className="block text-sm font-medium text-gray-700 mb-1">
          Select Building
        </label>
        <select
          id="building-selector"
          value={selectedBuilding?.id || ""}
          onChange={handleBuildingChange}
          className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-1/3 text-sm"
        >
          {buildings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filter and Actions */}
      <FilterAndActions
        filters={filters}
        setFilters={setFilters}
        openModal={openModal}
        input_filter={{
          key_to_filter: "room_name",
          placeholder: "Search Room",
          create_label: "Add Room",
        }}
      />

      {/* Table */}
      <Table theadings={["ID", "Name", "Type", "Price", "Status", "Actions"]} containerRef={containerRef}>
        {paginatedRooms.length > 0 ? (
          paginatedRooms.map((room, index) => (
            <TableData
              key={room.id || index}
              columns={[
                room.id,
                room.room_name,
                roomTypes.find(rt => rt.id === Number(room.room_type_id))?.name || "Unknown",
                room.price_per_night,
                room.is_available === "1" ? "Available" : "Unavailable",
                <ToggleDiv buttonText="Actions" containerRef={containerRef} key={`actions-${room.id}`}>
                  <div className="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => openModal("view", room)}>
                    <LuEye className="mr-2" /> View
                  </div>
                  <div className="px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal("update", room)}>
                    <BiSolidEditAlt className="mr-2" /> Edit
                  </div>
                  <div className="px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal("delete", room)}>
                    <MdOutlineDeleteForever className="mr-2" /> Delete
                  </div>
                </ToggleDiv>,
              ]}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6}>
              <div className="p-2 border border-gray-100 text-center">No rooms found.</div>
            </td>
          </tr>
        )}
      </Table>

      {/* Pagination */}
      <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filtered={filteredRooms} />
    </div>
  );
};

export default ManageRooms;

import React from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";

import { FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

import Modal from "../../components/ui/modals/Modal";
import InputField from "../../components/ui/form/InputField";
import { useRef } from "react";
import FilterAndActions from "../../components/ui/table/FilterAndActions";

import Pagination from "../../components/ui/table/Pagination";

import {
  CreateBuildingModal,
  ReadBuildingModal,
  UpdateBuildingModal,
  DeleteBuildingModal,
  FilterModal,
} from "./modals";

const ManageBuildings = () => {
  const containerRef = useRef(null);
  const [notify, setNotify] = useState(null);
  const [buildings, setBuildings] = useState([]);

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

  useEffect(() => {
    document.title = "Manage Buildings | Ocean View";

    fetchBuildings();
  }, []);

  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    isOpen: false,
    variant: "default",
    children: <div></div>,
    loading: false,
    title: "",
  });

  const openModal = (variant, resort) => {
    let children;
    let modal_title;

    switch (variant) {
      case "create":
        children = (
          <CreateBuildingModal
            handleCreateFormInputChange={handleCreateFormInputChange}
            formData={createBuildingForm}
          />
        );
        modal_title = "Create Resort";
        break;
      case "read":
        children = <ReadBuildingModal />;
        modal_title = "View Resort";
        break;
      case "update":
        children = <UpdateBuildingModal />;
        modal_title = "Edit Resort";
        break;
      case "delete":
        children = <DeleteBuildingModal />;
        modal_title = "Delete Resort";
        break;
      case "filter":
        children = <FilterModal filters={filters} setFilters={setFilters} />;
        modal_title = "Filters";
        break;
      default:
        children = <>Nahh wala</>;
    }

    setModal({
      isOpen: true,
      variant,
      children,
      loading: false,
      title: modal_title,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const [createBuildingForm, setCreateBuildingForm] = useState({
    values: { name: "", image: "", floor_count: "", room_per_floor: "" },
    errors: { name: "", image: "", floor_count: "", room_per_floor: "" },
  });

  const [editBuildingForm, setEditBuildingForm] = useState({
    values: {
      id: "",
      name: "",
      image: "",
      floor_count: "",
      room_per_floor: "",
    },
    errors: {
      id: "",
      name: "",
      image: "",
      floor_count: "",
      room_per_floor: "",
    },
  });

  const [deleteBuildingForm, setDeleteBuildingForm] = useState({
    building_id: "",
  });

  const handleCreateFormInputChange = (e) => {
    const { name, value } = e.target;
    setCreateResortForm((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };

  const handleConfirm = () => {
    setModal((prev) => ({ ...prev, loading: true })); //pang loading rani sa button
    setNotify({}); //reset ang notif ni ha

    setTimeout(async () => {
      let result;

      try {
        switch (modal.variant) {
          case "create":
            result = await createBuilding(createBuildingForm.values);
            break;
          case "update":
            result = await editBuilding(editBuildingForm.values);
            break;
          case "delete":
            result = await deleteBuilding(deleteBuildingForm.building_id);
            break;
          default:
            throw new Error("Unknown action mode");
        }
      } catch (error) {
        setModal((prev) => ({ ...prev, loading: false }));
        setNotify({
          open: true,
          type: "error",
          message: error.message || "Something went wrong!",
        });
        return;
      }

      setModal((prev) => ({ ...prev, loading: false }));

      if (result.success) {
        setNotify({
          open: true,
          type: modal.variant,
          message: result.message,
        });
        closeModal();
      } else {
        setNotify({
          open: true,
          type: "error",
          message: result.message,
        });
      }
    }, 1000);
  };

  const [filters, setFilters] = useState({
    paginate: 10,
    page: 1,
    building_name: null,
  });

  const filteredBuildings =
    buildings?.filter((building) => {
      const nameMatch =
        !filters.building_name ||
        building.name
          ?.toLowerCase()
          .includes(filters.building_name.toLowerCase());

      return nameMatch;
    }) || [];

  const totalPages = Math.ceil(filteredBuildings.length / filters.paginate);
  const paginatedBuildings = filteredBuildings.slice(
    (filters.page - 1) * filters.paginate,
    filters.page * filters.paginate
  );

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [filters.building_name, filters.paginate]);

  return (
    <div>
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        variant={modal.variant}
        title={modal.title}
        loading={modal.loading}
        children={modal.children}
        /* Here ang mga body sa imong modal */ onConfirm={handleConfirm}
        onCancel={() => closeModal()}
      />

      {notify && (
        <ActionNotification isOpen={true} variant={notify.type}>
          {notify.message}
        </ActionNotification>
      )}

      <FilterAndActions
        filters={filters}
        setFilters={setFilters}
        openModal={openModal}
        input_filter={{
          key_to_filter: "building_name",
          placeholder: "Building Name",
          create_label: "Add Building",
        }}
      />

      <Table
        theadings={["ID", "Name", "Floors", "Rooms", "Actions"]}
        containerRef={containerRef}
      >
        {filteredBuildings.length > 0 ? (
          paginatedBuildings.map((bld, index) => (
            <TableData
              key={bld.id || index}
              columns={[
                bld.id,
                bld.name,
                bld.floor_count,
                bld.room_per_floor,
                <ToggleDiv buttonText="Actions" containerRef={containerRef}>
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
          ))
        ) : (
          <tr>
            <td colSpan={7}>
              <div className=" p-2 border border-gray-100">
                No resorts found.
              </div>
            </td>
          </tr>
        )}
      </Table>

      <Pagination
        filters={filters}
        setFilters={setFilters}
        totalPages={totalPages}
        filteredResorts={filteredBuildings}
      />
    </div>
  );
};

export default ManageBuildings;

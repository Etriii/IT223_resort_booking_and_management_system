// import React, { useEffect, useState, useRef } from "react";
// import Table from "../../components/ui/table/Table";
// import TableData from "../../components/ui/table/TableData";
// import ActionNotification from "../../components/ui/modals/ActionNotification";
// import ToggleDiv from "../../components/ui/modals/ToggleDiv";
// import Modal from "../../components/ui/modals/Modal";

// import { LuEye } from "react-icons/lu";
// import { BiSolidEditAlt } from "react-icons/bi";
// import { MdOutlineDeleteForever } from "react-icons/md";

// import FilterAndActions from "../../components/ui/table/FilterAndActions";

// import Pagination from "../../components/ui/table/Pagination";

// import { CreateBuildingModal, ReadBuildingModal, UpdateBuildingModal, DeleteBuildingModal, FilterModal, } from "./modals";

// const ManageBuildings = () => {
//   const [notify, setNotify] = useState(null);
//   const containerRef = useRef(null);

//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     document.title = "Manage Buildings | Ocean View";
//     fetchBuildings();
//   }, []);

//   const fetchBuildings = async () => {
//     try {
//       const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;

//       const res = await fetch(
//         `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortId&resort_id=${resort_id}`
//       );
//       const data = await res.json();
//       setBuildings(data);
//     } catch (err) {
//       setNotify({
//         type: "error",
//         message: "Failed to fetch buildings",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [modal, setModal] = useState({ isOpen: false, variant: "default", children: <div></div>, loading: false, title: "", });

//   const openModal = (variant, resort) => {
//     let children;
//     let modal_title;

//     switch (variant) {
//       case "create":
//         children = (
//           <CreateBuildingModal
//             handleCreateFormInputChange={handleCreateFormInputChange}
//             formData={createBuildingForm}
//           />
//         );
//         modal_title = "Create Resort";
//         break;
//       case "read":
//         children = <ReadBuildingModal />;
//         modal_title = "View Building";
//         break;
//       case "update":
//         children = <UpdateBuildingModal />;
//         modal_title = "Edit Building";
//         break;
//       case "delete":
//         children = <DeleteBuildingModal />;
//         modal_title = "Delete Building";
//         break;
//       case "filter":
//         children = <FilterModal filters={filters} setFilters={setFilters} />;
//         modal_title = "Filters";
//         break;
//       default:
//         children = <>Nahh wala</>;
//     }

//     setModal({ isOpen: true, variant, children, loading: false, title: modal_title, });
//   };

//   const closeModal = () => {
//     setModal((prev) => ({ ...prev, isOpen: false }));
//   };

//   const [createBuildingForm, setCreateBuildingForm] = useState({
//     values: { name: "", image: "", floor_count: "", room_per_floor: "" },
//     errors: { name: "", image: "", floor_count: "", room_per_floor: "" },
//   });

//   const [editBuildingForm, setEditBuildingForm] = useState({
//     values: { id: "", name: "", image: "", floor_count: "", room_per_floor: "", },
//     errors: { id: "", name: "", image: "", floor_count: "", room_per_floor: "", },
//   });

//   const [deleteBuildingForm, setDeleteBuildingForm] = useState({
//     building_id: "",
//   });

//   const handleCreateFormInputChange = (e) => {
//     const { name, value } = e.target;
//     setCreateResortForm((prev) => ({
//       ...prev,
//       values: {
//         ...prev.values,
//         [name]: value,
//       },
//     }));
//   };

//   const handleConfirm = () => {
//     setModal((prev) => ({ ...prev, loading: true })); //pang loading rani sa button
//     setNotify({}); //reset ang notif ni ha

//     setTimeout(async () => {
//       let result;

//       try {
//         switch (modal.variant) {
//           case "create":
//             result = await createBuilding(createBuildingForm.values);
//             break;
//           case "update":
//             result = await editBuilding(editBuildingForm.values);
//             break;
//           case "delete":
//             result = await deleteBuilding(deleteBuildingForm.building_id);
//             break;
//           default:
//             throw new Error("Unknown action mode");
//         }
//       } catch (error) {
//         setModal((prev) => ({ ...prev, loading: false }));
//         setNotify({ open: true, type: "error", message: error.message || "Something went wrong!", });
//         return;
//       }

//       setModal((prev) => ({ ...prev, loading: false }));

//       if (result.success) {
//         setNotify({ open: true, type: modal.variant, message: result.message, });
//         closeModal();
//       } else {
//         setNotify({ open: true, type: "error", message: result.message, });
//       }
//     }, 1000);
//   };

//   const [filters, setFilters] = useState({ paginate: 10, page: 1, building_name: null, });

//   const filteredBuildings = buildings?.filter((building) => {
//     const nameMatch = !filters.building_name || building.name?.toLowerCase().includes(filters.building_name.toLowerCase());

//     return nameMatch;
//   }) || [];

//   const totalPages = Math.ceil(filteredBuildings.length / filters.paginate);
//   const paginatedBuildings = filteredBuildings.slice(
//     (filters.page - 1) * filters.paginate,
//     filters.page * filters.paginate
//   );

//   useEffect(() => {
//     setFilters((prev) => ({ ...prev, page: 1 }));
//   }, [filters.building_name, filters.paginate]);

//   return (
//     <div>
//       <Modal
//         isOpen={modal.isOpen}
//         onClose={closeModal}
//         variant={modal.variant}
//         title={modal.title}
//         loading={modal.loading}
//         children={modal.children}
//         onCancel={() => closeModal()}
//         onConfirm={handleConfirm}
//       >
//         {/* {(modalVariant === "create" || modalVariant === "update" || modalVariant === "read") && (
//                 <form className="space-y-4">
//                   <div>
//                     <label className="block font-medium mb-1">Room Image</label>
//                     <input
//                       type="file"
//                       name="room_image"
//                       onChange={handleImageChange}
//                       className="w-full border p-3 rounded-lg"
//                       disabled={modalVariant === "read"}
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">Building Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={buildingFormData.name}
//                       onChange={handleInputChange}
//                       disabled={modalVariant === "read"}
//                       className="w-full border p-2 rounded"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">Number of Floors</label>
//                     <input
//                       type="number"
//                       name="floor_count"
//                       value={buildingFormData.floor_count}
//                       onChange={handleInputChange}
//                       disabled={modalVariant === "read"}
//                       className="w-full border p-2 rounded"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">Rooms Per Floor</label>
//                     <input
//                       type="number"
//                       name="room_per_floor"
//                       value={buildingFormData.room_per_floor}
//                       onChange={handleInputChange}
//                       disabled={modalVariant === "read"}
//                       className="w-full border p-2 rounded"
//                       required
//                     />
//                   </div>
//                 </form>
//               )} */}
//       </Modal>

//       {notify && (
//         <ActionNotification isOpen={true} variant={notify.type}>
//           {notify.message}
//         </ActionNotification>
//       )}

//       <FilterAndActions filters={filters} setFilters={setFilters} openModal={openModal} input_filter={{ key_to_filter: "building_name", placeholder: "Building Name", create_label: "Add Building", }} />

//       <Table theadings={["ID", "Name", "Floors", "Rooms", "Actions"]} containerRef={containerRef} >
//         {filteredBuildings.length > 0 ? (
//           paginatedBuildings.map((bld, index) => (
//             <TableData
//               key={bld.id || index}
//               columns={[
//                 bld.id,
//                 bld.name,
//                 bld.floor_count,
//                 bld.room_per_floor,
//                 <ToggleDiv buttonText="Actions" containerRef={containerRef}>
//                   <div className="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => openModal("read")} >
//                     <LuEye className="mr-2" /> View
//                   </div>
//                   <div className="px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal("update")} >
//                     <BiSolidEditAlt className="mr-2" /> Edit
//                   </div>
//                   <div className="px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal("delete")} >
//                     <MdOutlineDeleteForever className="mr-2" /> Delete
//                   </div>
//                 </ToggleDiv>
//               ]}
//             />
//           ))
//         ) : (
//           <tr>
//             <td colSpan={7}>
//               <div className=" p-2 border border-gray-100">
//                 No resorts found.
//               </div>
//             </td>
//           </tr>
//         )}
//       </Table>

//       <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filtered={filteredBuildings} />
//     </div >
//   );
// };
// export default ManageBuildings;

import React, { useEffect, useState, useRef } from "react";
import Table from "../../components/ui/table/Table";
import TableData from "../../components/ui/table/TableData";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import Modal from "../../components/ui/modals/Modal";

import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

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
  const [notify, setNotify] = useState(null);
  const containerRef = useRef(null);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    isOpen: false,
    variant: "default",
    children: <div></div>,
    loading: false,
    title: "",
  });

  const [createBuildingForm, setCreateBuildingForm] = useState({
    values: { name: "", image: "", floor_count: "", room_per_floor: "" },
    errors: { name: "", image: "", floor_count: "", room_per_floor: "" },
  });

  const [editBuildingForm, setEditBuildingForm] = useState({
    values: { id: "", name: "", image: "", floor_count: "", room_per_floor: "" },
    errors: { id: "", name: "", image: "", floor_count: "", room_per_floor: "" },
  });

  const [deleteBuildingForm, setDeleteBuildingForm] = useState({
    building_id: "",
  });

  const [filters, setFilters] = useState({
    paginate: 10,
    page: 1,
    building_name: null,
  });

  useEffect(() => {
    document.title = "Manage Buildings | Ocean View";
    fetchBuildings();
  }, []);

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

  const handleCreateFormInputChange = (e) => {
    const { name, value } = e.target;
    setCreateBuildingForm((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
    }));
  };

  const openModal = (variant, building = null) => {
    let children, modal_title;

    switch (variant) {
      case "create":
        children = (
          <CreateBuildingModal
            handleCreateFormInputChange={handleCreateFormInputChange}
            formData={createBuildingForm}
          />
        );
        modal_title = "Create Building";
        break;

      case "read":
        children = <ReadBuildingModal building={building} />;
        modal_title = "View Building";
        break;

      case "update":
        setEditBuildingForm({
          values: { ...building },
          errors: {
            id: "", name: "", image: "", floor_count: "", room_per_floor: "",
          },
        });
        children = (
          <UpdateBuildingModal
            formData={editBuildingForm}
            setFormData={setEditBuildingForm}
          />
        );
        modal_title = "Edit Building";
        break;

      case "delete":
        setDeleteBuildingForm({ building_id: building.id });
        children = <DeleteBuildingModal building={building} />;
        modal_title = "Delete Building";
        break;

      case "filter":
        children = <FilterModal filters={filters} setFilters={setFilters} />;
        modal_title = "Filters";
        break;

      default:
        children = <>Unknown modal variant</>;
    }

    setModal({ isOpen: true, variant, children, loading: false, title: modal_title });
  };

  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  const handleConfirm = async () => {
    setModal((prev) => ({ ...prev, loading: true }));
    setNotify(null);

    try {
      let result;
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
          throw new Error("Unknown modal action");
      }

      if (result.success) {
        setNotify({ open: true, type: modal.variant, message: result.message });
        fetchBuildings();
        closeModal();
      } else {
        setNotify({ open: true, type: "error", message: result.message });
      }
    } catch (error) {
      setNotify({
        open: true,
        type: "error",
        message: error.message || "Something went wrong",
      });
    } finally {
      setModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const filteredBuildings = buildings?.filter((building) => {
    const nameMatch =
      !filters.building_name ||
      building.name?.toLowerCase().includes(filters.building_name.toLowerCase());
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
        onCancel={closeModal}
        onConfirm={handleConfirm}
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
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <div className="p-2 border border-gray-100 text-center">
                No buildings found.
              </div>
            </td>
          </tr>
        )}
      </Table>

      <Pagination
        filters={filters}
        setFilters={setFilters}
        totalPages={totalPages}
        filtered={filteredBuildings}
      />
    </div>
  );
};

export default ManageBuildings;

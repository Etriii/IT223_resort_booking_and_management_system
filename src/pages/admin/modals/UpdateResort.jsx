// import React, { useEffect } from 'react'
// import InputField from '../../../components/ui/form/InputField';

// const UpdateResort = ({ handleEditFormInputChange, editResortForm }) => {
//   // if (!resort) return null;



//   return (
//     <div className='grid md:grid-cols-2  space-x-2'>
//       <div className='space-y-2 text W-80'>
//         <div className='bg-red-200 w-full h-56'></div>
//         <hr className='border border-gray-200' />
//         <div>
//           <InputField type="text" label={'Resort Name'} value={editResortForm.values.name} onChange={handleEditFormInputChange} name={'name'} required={true} />
//           <InputField type="text" label={'Location'} onChange={handleEditFormInputChange} name={'location'} required={true} />
//           <InputField type="text" label={'Location Coordinates'} onChange={handleEditFormInputChange} name={'location_coordinates'} required={true} />
//           <InputField type="number" label={'Tax Rate'} onChange={handleEditFormInputChange} name={'tax_rate'} required={true} />
//         </div>
//       </div>
//       <div>
//         tables ni here for mga admins. witch searching
//       </div>
//     </div>
//   )
// }

// export default UpdateResort

import React, { useState, useEffect, useRef } from 'react';
import InputField from '../../../components/ui/form/InputField';


import Table from '../../../components/ui/table/Table';
import TableData from '../../../components/ui/table/TableData';

import { useFetchUsersWithRoles } from '../../../hooks';
import SelectField from '../../../components/ui/form/SelectField';
import { MdOutlineDeleteForever } from 'react-icons/md';

import Modal from '../../../components/ui/modals/Modal';

import { DeleteUserRoleModal, CreateUserRoleModal } from './';

import ActionNotification from '../../../components/ui/modals/ActionNotification';

import { deleteUserRoleOfAdmin } from '../../../services';

const UpdateResort = ({ handleEditFormInputChange, editResortForm, resort }) => {
  const containerRef = useRef();

  const [localFormValues, setLocalFormValues] = useState({ ...editResortForm.values });

  const { admins, loading, error, fetchAdmins } = useFetchUsersWithRoles(resort.id);

  useEffect(() => {
    setLocalFormValues({ ...editResortForm.values });

    if (handleEditFormInputChange) {
      handleEditFormInputChange({ ...editResortForm.values });
    }
  }, [editResortForm]);

  const handleLocalInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormValues = {
      ...localFormValues,
      [name]: value,
    };
    setLocalFormValues(updatedFormValues);

    if (handleEditFormInputChange) {
      handleEditFormInputChange(updatedFormValues);
    }
  };



  const [createUserRoleForm, setCreateUserRoleForm] = useState({});
  const [deleteUserRoleForm, setDeleteUserRoleForm] = useState({ user_role_id: '' });

  const handleCreateResortRoleFormChange = (e) => {
    const { name, value } = e.target;
    setCreateUserRoleForm(prev => ({...prev, [name]: value}));
  }


  const [modal, setModal] = useState({ isOpen: false, variant: 'default', children: <div></div>, loading: false, title: '' });
  const [notify, setNotify] = useState({ open: '', variant: '', message: '' });

  const openModal = (variant, userRole) => {
    let children;
    let modal_title;

    switch (variant) {
      case 'create':
        children = <CreateUserRoleModal handleCreateResortRoleFormChange={handleCreateResortRoleFormChange} formData={createUserRoleForm} />;
        modal_title = 'Add Admin';
        break;
      case 'delete':
        // alert(JSON.stringify(userRole));
        children = <DeleteUserRoleModal userRole={userRole} setDeleteUserRoleForm={setDeleteUserRoleForm} />
        modal_title = 'Delete Admin Role';
        break;
      case 'filter':
        children = <FilterModal filters={filters} setFilters={setFilters} />;
        modal_title = 'Filters';
        break;
      default:
        children = <>Nahh wala</>;
    }
    setModal({ isOpen: true, variant, children, loading: false, title: modal_title });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {

    setModal(prev => ({ ...prev, loading: true }));//pang loading rani sa button
    setNotify({}); //reset ang notif ni ha

    setTimeout(async () => {
      let result;

      try {
        switch (modal.variant) {
          case 'create':
            // result = await createResort(createResortForm.values);
            break;
          case 'delete':
            result = await deleteUserRoleOfAdmin(deleteUserRoleForm.user_role_id);
            break;
          default:
            throw new Error("Unknown action mode");
        }
      } catch (error) {
        setModal(prev => ({ ...prev, loading: false }));
        setNotify({
          open: true,
          type: 'error',
          message: error.message || 'Something went wrong!'
        });
        return;
      }

      setModal(prev => ({ ...prev, loading: false }));

      if (result.success) {
        fetchAdmins();
        setNotify({
          open: true,
          type: modal.variant,
          message: result.message
        });
        closeModal();
      } else {
        setNotify({
          open: true,
          type: 'error',
          message: result.message
        });
      }
    }, 1000);
  };

  return (
    <div>
      {notify && (<ActionNotification isOpen={notify.open} variant={`${notify.type}`}> {notify.message} </ActionNotification>)}
      <Modal isOpen={modal.isOpen} onClose={closeModal} variant={modal.variant} title={modal.title} loading={modal.loading} children={modal.children}/* Here ang mga body sa imong modal */ onConfirm={handleConfirm} onCancel={() => closeModal()} />
      <div className='grid lg:grid-cols-2 space-x-2'>
        <div className='space-y-2 text W-80'>
          <div className='sticky top-4  space-y-1'>
            <div className=' size-72 mx-auto'>
              <img src={resort.main_image ? resort.main_image : '/images/default.png'} alt="Resort Image" className='w-full h-full object-cover bg-center' />
            </div>
            <hr className='border border-gray-200' />
            <div className='p-2 space-y-2'>
              <div>
                <InputField
                  type="text"
                  label={'Resort Name'}
                  value={localFormValues.name}
                  onChange={handleLocalInputChange}
                  name={'name'}
                  required={true}
                />
                <InputField
                  type="text"
                  label={'Location'}
                  value={localFormValues.location}
                  onChange={handleLocalInputChange}
                  name={'location'}
                  required={true}
                />
                <InputField
                  type="text"
                  label={'Location Coordinates'}
                  value={localFormValues.location_coordinates}
                  onChange={handleLocalInputChange}
                  name={'location_coordinates'}
                  required={true}
                />
                <InputField
                  type="number"
                  label={'Tax Rate'}
                  value={localFormValues.tax_rate}
                  onChange={handleLocalInputChange}
                  name={'tax_rate'}
                  required={true}
                />
                <SelectField label={'status'} name={'status'} value={localFormValues.status} options={[
                  { value: '', label: 'All' },
                  { value: "active", label: "Active" },
                  { value: "deactivated", label: "Deactivate" },
                ]} onChange={handleLocalInputChange} />
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className={` sticky top-[3.5rem]`}>
            <div className='p-1 flex justify-between items-center'><div>Resort Admins</div><div className='p-2 bg-green-600 text-white size-7 flex justify-center items-center rounded-full hover:cursor-pointer' onClick={() => { openModal('create') }}>+</div></div>
            <Table theadings={['user_id', 'Username', 'Role', 'action']} isLoading={loading} containerRef={containerRef} >
              {admins.length > 0 ? (
                admins.map((admin, index) => (
                  <TableData
                    key={index}
                    columns={[
                      admin.user_id,
                      admin.username || 'Unknown',
                      admin.role || "Secret",
                      <div className=" px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('delete', admin) }}> <MdOutlineDeleteForever className="size-5 mr-2" />Remove </div>
                    ]}
                  />
                ))
              ) : (
                <tr><td colSpan={7}><div className=" p-2 border border-gray-100">No Admins found.</div></td></tr>
              )}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateResort;
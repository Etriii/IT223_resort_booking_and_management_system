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


const UpdateResort = ({ handleEditFormInputChange, editResortForm, resort }) => {
  const containerRef = useRef();

  const [localFormValues, setLocalFormValues] = useState({ ...editResortForm.values });

  const { admins, loading, error } = useFetchUsersWithRoles(resort.id);

  useEffect(() => {
    setLocalFormValues({ ...editResortForm.values });
  }, [editResortForm]);

  const handleLocalInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
    // Send the entire localFormValues to the parent on every change
    if (handleEditFormInputChange) {
      handleEditFormInputChange(localFormValues);
    }
  };

  return (
    <div className='grid md:grid-cols-2 space-x-2'>
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
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='p-1 flex justify-between items-center'><div>Resort Admins</div><div className='p-2 bg-green-600 text-white size-7 flex justify-center items-center rounded-full hover:cursor-pointer'>+</div></div>
        <Table theadings={['user_id', 'Username', 'Role']} isLoading={loading} containerRef={containerRef} >
          {admins.length > 0 ? (
            admins.map((admin, index) => (
              <TableData
                key={index}
                columns={[
                  admin.id,
                  admin.username || 'Unknown',
                  admin.role || "Secret"
                ]}
              />
            ))
          ) : (
            <tr><td colSpan={7}><div className=" p-2 border border-gray-100">No Admins found.</div></td></tr>
          )}
        </Table>
      </div>
    </div>
  );
};

export default UpdateResort;
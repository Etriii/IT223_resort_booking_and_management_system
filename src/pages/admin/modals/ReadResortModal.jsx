import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import Table from '../../../components/ui/table/Table';
import TableData from '../../../components/ui/table/TableData';

import { useFetchUsersWithRoles } from '../../../hooks';

const ReadResortModal = ({ resort }) => {

  // if (!resort) return null;

  const { admins, loading, error } = useFetchUsersWithRoles(resort.id);
  const embedSrc = resort.location_coordinates;

  const containerRef = useRef();

  return (
    <div className='grid md:grid-cols-2 space-x-2'>
      <div className='space-y-2 text W-80'>
        <div className='sticky top-[4.5rem]'>
          <div className='bg-red-200 w-full h-56'>
            <img src={resort.main_image ? resort.main_image : '/images/default.png'} alt="Resort Image" className='w-full h-full object-cover bg-center' />
          </div>
          <hr className='border border-gray-200' />
          <div className='space-y-1 p-3'>
            <div className={`flex justify-between items-center`}><h1 className={`text-center text-lg text-ellipsis font-semibold`}>{resort.name}</h1><div>ID: {resort.id}</div></div>
            <div className='flex justify-between items-center'>
              <div className="text-sm truncate max-w-[75%] whitespace-nowrap overflow-hidden text-gray-700">
                {resort.location}
              </div>
              <div className='text-blue-700 text-sm'>
                <Link to={`/full-map?embedUrl=${encodeURIComponent(embedSrc)}`} target="_blank" rel="noopener noreferrer">
                  View in Map
                </Link>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex-1'>Tax Rate: {resort.tax_rate}%</div>
              <span className={`${resort.status == 'active' ? 'text-green-600' : 'text-red-600'}`}>{resort.status}</span>
            </div>
            <div>contact: {resort.contact_details ?? '?'}</div>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='p-1'>Resort Admins</div>
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
  )
}

export default ReadResortModal
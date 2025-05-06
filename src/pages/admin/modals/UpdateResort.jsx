import React from 'react'

const UpdateResort = ({ resort }) => {
  // if (!resort) return null;

  return (
    <div className='grid md:grid-cols-2 w-[800px]  space-x-2'>
      <div className='space-y-2 text W-80'>
        <div className='bg-red-200 w-full h-56'></div>
        <hr className='border border-gray-200' />
        <div>
          <div className={`flex justify-between items-center`}><h1 className={`text-center`}>Resort Name</h1><div>id:1</div></div>
          <div className='flex justify-between items-center'><div>ADSasd</div><span>View in Map</span></div>
          <div>tax rate,status, contact_details, </div>
        </div>
      </div>
      <div>
        tables ni here for mga admins. witch searching
      </div>
    </div>
  )
}

export default UpdateResort
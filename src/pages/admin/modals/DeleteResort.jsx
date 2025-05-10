import React, { useEffect } from 'react'

const DeleteResort = ({ resort, setDeleteResortForm }) => {
  useEffect(() => {
    setDeleteResortForm(
      { resort_id: resort.id }
    );
  }, []);
  return (
    <div className='px-5 py-2 text-xl text-center rounded-lg text-red-900 max-w-96'>Are you sure you want to delete resort with a resort id {resort['id']} ?</div>
  )
}

export default DeleteResort
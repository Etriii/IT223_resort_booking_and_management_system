import React from 'react'
import { Navigate, useParams } from 'react-router-dom';

const ManageRooms = () => {

  const { building_id } = useParams();

  // check first if naa ang id sa building.
  // getBuildingById siguro tas if false e reject niya then i butang sa page na PageNotFound

  /*
    process ata ani kay get nimo tanan buildings nga naa sa imong resorts (please see localstorage naa didto ang resort id nimo)
    then after ana e check nimo if ang gi pasa sa wildcard nga building_id kay wala sa imong buildings kay e butang sa page not found
  */ 

  if (!building_id) {
    return <Navigate to="/oceanview/pagenotfound" replace />
  }

  return (
    <div>ManageRooms of Building id {building_id}</div>
  )
}

export default ManageRooms
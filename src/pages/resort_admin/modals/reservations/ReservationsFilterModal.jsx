// import React, { useEffect, useState } from 'react'

// const ReservationsFilterModal = ({ filters, setFilters }) => {

//   const [localFilter, setLocalFilter] = useState(filters);

//   const handleLocalChange = (e) => {
//     const { name, value } = e.target;
//     setLocalFilter((prev) => ({ ...prev, [name]: value }));
//   }

//   useEffect(() => {
//     // console.log(localFilter);
//     setFilters(localFilter);
//   }, [localFilter]);

//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-2xl w-full max-w-3xl">
//       {/* Start Date */}
//       <div className="flex flex-col w-full md:w-1/3">
//         <label htmlFor="startDate" className="text-sm font-medium text-gray-600">Start Date</label>
//         <input
//           type="date"
//           name="start_date"
//           id="start_date"
//           value={localFilter.start_date}
//           onChange={handleLocalChange}
//           className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* End Date */}
//       <div className="flex flex-col w-full md:w-1/3">
//         <label htmlFor="endDate" className="text-sm font-medium text-gray-600">End Date</label>
//         <input
//           type="date"
//           name="end_date"
//           id="end_date"
//           value={localFilter.end_date}
//           onChange={handleLocalChange}
//           className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Status Dropdown */}
//       <div className="flex flex-col w-full md:w-1/3">
//         <label htmlFor="status" className="text-sm font-medium text-gray-600">Status</label>
//         <select
//           name="status"
//           id="status"
//           value={localFilter.status}
//           onChange={handleLocalChange}
//           className="mt-1 p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Confirmed">Confirmed</option>
//           <option value="Cancelled">Cancelled</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>
//     </div>
//   )
// }

// export default ReservationsFilterModal

// import React, { useEffect, useState } from 'react'

// const ReservationsFilterModal = ({ filters, setFilters }) => {
//   const [localFilter, setLocalFilter] = useState(filters);

//   const handleLocalChange = (e) => {
//     const { name, value } = e.target;

//     setLocalFilter((prev) => {
//       const updated = { ...prev, [name]: value };

//       if (name === "start_date" && new Date(updated.end_date) < new Date(value)) {
//         const newEnd = new Date(value);
//         newEnd.setDate(newEnd.getDate() + 1);
//         updated.end_date = newEnd.toISOString().split("T")[0];
//       }

//       if (name === "end_date" && new Date(value) < new Date(prev.start_date)) {
//         return prev; // skip update to end_date if it's invalid
//       }

//       return updated;
//     });
//   };

//   useEffect(() => {
//     setFilters(localFilter);
//   }, [localFilter]);

//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-2xl w-full max-w-3xl">
//       {/* Start Date */}
//       <div className="flex flex-col w-full md:w-1/3">
//         <label htmlFor="startDate" className="text-sm font-medium text-gray-600">Start Date</label>
//         <input
//           type="date"
//           name="start_date"
//           id="start_date"
//           value={localFilter.start_date}
//           onChange={handleLocalChange}
//           className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           min={new Date().toISOString().split("T")[0]} // prevent past dates
//         />
//       </div>

//       {/* End Date */}
//       <div className="flex flex-col w-full md:w-1/3">
//         <label htmlFor="endDate" className="text-sm font-medium text-gray-600">End Date</label>
//         <input
//           type="date"
//           name="end_date"
//           id="end_date"
//           value={localFilter.end_date}
//           onChange={handleLocalChange}
//           className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           min={localFilter.start_date} // prevent end date earlier than start date
//         />
//       </div>

//       {/* Status Dropdown */}
//       <div className="flex flex-col w-full md:w-1/3">
//         <label htmlFor="status" className="text-sm font-medium text-gray-600">Status</label>
//         <select
//           name="status"
//           id="status"
//           value={localFilter.status}
//           onChange={handleLocalChange}
//           className="mt-1 p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Confirmed">Confirmed</option>
//           <option value="Cancelled">Cancelled</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>
//     </div>
//   )
// }

// export default ReservationsFilterModal;


import React, { useEffect, useState } from 'react';

const ReservationsFilterModal = ({ filters, setFilters }) => {
  const [localFilter, setLocalFilter] = useState(filters);

  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    setLocalFilter((prev) => {
      const updated = { ...prev, [name]: value };

      // If start_date is changed and end_date is before it, adjust end_date
      if (name === "start_date" && new Date(updated.end_date) < new Date(value)) {
        const newEnd = new Date(value);
        newEnd.setDate(newEnd.getDate() + 1);
        updated.end_date = newEnd.toISOString().split("T")[0];
      }

      // If end_date is set earlier than start_date, ignore the change
      if (name === "end_date" && new Date(value) < new Date(prev.start_date)) {
        return prev;
      }

      return updated;
    });
  };

  useEffect(() => {
    setFilters(localFilter);
  }, [localFilter]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-2xl w-full max-w-3xl">
      {/* Start Date */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="startDate" className="text-sm font-medium text-gray-600">Start Date</label>
        <input
          type="date"
          name="start_date"
          id="start_date"
          value={localFilter.start_date}
          onChange={handleLocalChange}
          className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-green-500"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="endDate" className="text-sm font-medium text-gray-600">End Date</label>
        <input
          type="date"
          name="end_date"
          id="end_date"
          value={localFilter.end_date}
          onChange={handleLocalChange}
          className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-green-500"
          min={localFilter.start_date} // Ensure valid range
        />
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="status" className="text-sm font-medium text-gray-600">Status</label>
        <select
          name="status"
          id="status"
          value={localFilter.status}
          onChange={handleLocalChange}
          className="mt-1 p-2 border rounded-lg bg-white focus:ring-1 focus:ring-green-500"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default ReservationsFilterModal;

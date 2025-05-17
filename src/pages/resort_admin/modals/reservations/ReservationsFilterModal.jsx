import React from 'react'

const ReservationsFilterModal = ({ filters, setFilters }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-2xl w-full max-w-3xl">
      {/* Start Date */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="startDate" className="text-sm font-medium text-gray-600">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={filters.start_date}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="endDate" className="text-sm font-medium text-gray-600">End Date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-col w-full md:w-1/3">
        <label htmlFor="status" className="text-sm font-medium text-gray-600">Status</label>
        <select
          name="status"
          id="status"
          value={filters.status}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  )
}

export default ReservationsFilterModal
import React, { useEffect, useState } from 'react';

import { FaClipboardCheck, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { FaRegCircleCheck } from "react-icons/fa6";

import StatCard from './StatCard';

const ReservationStat = () => {


  const [filters, setFilters] = useState({
    time: 'day',
  });

  const handleOnChangeTimeFilter = (e) => {
    setFilters(prev => ({
      ...prev, time: e.target.value
    }));
  }

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-lg lg:order-2">

      <div className="mb-6">
        <label htmlFor="timeFilter" className="block mb-2 text-sm font-medium text-gray-700 outline-none">
          Filter by Time
        </label>
        <select id="timeFilter" value={filters.time} onChange={handleOnChangeTimeFilter} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value={'year'}>Year</option>
          <option value={'month'}>Month</option>
          <option value={'week'}>Week</option>
          <option value={'day'}>Day</option>
        </select>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 shadow flex flex-col items-center">
          <div className="h-40 w-40 bg-gray-100 rounded-full mb-4 flex items-center justify-center text-gray-400">
            Pie Chart Placeholder
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div><span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-full"></span>Completed</div>
            <div><span className="inline-block w-3 h-3 bg-blue-500 mr-2 rounded-full"></span>Confirmed</div>
            <div><span className="inline-block w-3 h-3 bg-yellow-400 mr-2 rounded-full"></span>Pending</div>
            <div><span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span>Cancelled</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <StatCard label={`Pending Approvals`} count={96} color={`bg-orange-500`} icon={<FaHourglassHalf className="text-5xl text-white/30 absolute top-4 left-4" />} />
        <StatCard label={`Confirmed Bookings`} count={30} color={`bg-green-500`} icon={<FaRegCircleCheck className="text-5xl text-white/30 absolute top-4 left-4" />} />
        <StatCard label={`Completed Bookings`} count={69} color={`bg-blue-500`} icon={<FaClipboardCheck className="text-5xl text-white/30 absolute top-4 left-4" />} />
        <StatCard label={`Cancelled Bookings`} count={0} color={`bg-red-500`} icon={<FaTimesCircle className="text-5xl text-white/30 absolute top-4 left-4" />} />
      </div>
    </div >
  );
};

export default ReservationStat;

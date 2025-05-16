// import React, { useEffect, useState } from 'react';

// import { FaClipboardCheck, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
// import { FaRegCircleCheck } from "react-icons/fa6";

// import StatCard from './StatCard';


// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const ReservationStat = () => {

//   const data = {
//     labels: ['Completed', 'Confirmed', 'Pending', 'Cancelled'],
//     datasets: [
//       {
//         data: [30, 20, 10, 5],
//         backgroundColor: ['#22c55e', '#3b82f6', '#facc15', '#ef4444'],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const [filters, setFilters] = useState({
//     time: 'day',
//   });

//   const handleOnChangeTimeFilter = (e) => {
//     setFilters(prev => ({
//       ...prev, time: e.target.value
//     }));
//   }

//   return (
//     <div className="bg-blue-50 p-4 rounded-lg shadow-lg lg:order-2">

//       <div className="mb-6">
//         <label htmlFor="timeFilter" className="block mb-2 text-sm font-medium text-gray-700 outline-none">
//           Filter by Time
//         </label>
//         <select id="timeFilter" value={filters.time} onChange={handleOnChangeTimeFilter} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
//           <option value={'year'}>Year</option>
//           <option value={'month'}>Month</option>
//           <option value={'week'}>Week</option>
//           <option value={'day'}>Day</option>
//         </select>
//       </div>

//       <div className="mb-6">
//         <div className="bg-white rounded-lg p-4 shadow flex flex-col items-center">
//           <div className="mb-4">
//             <Doughnut data={data} />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
//         <StatCard label={`Pending Approvals`} count={96} color={`bg-orange-500`} icon={<FaHourglassHalf className="text-5xl text-white/30 absolute top-4 left-4" />} />
//         <StatCard label={`Confirmed Bookings`} count={30} color={`bg-green-500`} icon={<FaRegCircleCheck className="text-5xl text-white/30 absolute top-4 left-4" />} />
//         <StatCard label={`Completed Bookings`} count={69} color={`bg-blue-500`} icon={<FaClipboardCheck className="text-5xl text-white/30 absolute top-4 left-4" />} />
//         <StatCard label={`Cancelled Bookings`} count={0} color={`bg-red-500`} icon={<FaTimesCircle className="text-5xl text-white/30 absolute top-4 left-4" />} />
//       </div>
//     </div >
//   );
// };

// export default ReservationStat;


import React, { useEffect, useState } from 'react';
import { FaClipboardCheck, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { FaRegCircleCheck } from "react-icons/fa6";
import { apiFetch } from '../../../utils/apiFetch';
import StatCard from './StatCard';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReservationStat = () => {
  const [filters, setFilters] = useState({
    time: 'day',
  });

  const [stats, setStats] = useState([]);

  const timeKeyMap = {
    day: 'today',
    week: 'this_week',
    month: 'this_month',
    year: 'this_year',
  };

  const handleOnChangeTimeFilter = (e) => {
    setFilters(prev => ({
      ...prev, time: e.target.value
    }));
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiFetch('controller=Bookings&action=getBookingStats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch booking stats", error);
      }
    };

    fetchStats();
  }, []);


  const getCount = (status) => {
    const item = stats.find(s => s.status === status);
    return item ? parseInt(item[timeKeyMap[filters.time]]) || 0 : 0;
  };

  const doughnutData = {
    labels: ['Completed', 'Confirmed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [
          getCount('Completed'),
          getCount('Confirmed'),
          getCount('Pending'),
          getCount('Cancelled')
        ],
        backgroundColor: ['#22c55e', '#3b82f6', '#facc15', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-lg lg:order-2">
      <div className="mb-6">
        <label htmlFor="timeFilter" className="block mb-2 text-sm font-medium text-gray-700">
          Filter by Time
        </label>
        <select
          id="timeFilter"
          value={filters.time}
          onChange={handleOnChangeTimeFilter}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="year">Year</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 shadow flex flex-col items-center">
          <div className="mb-4">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <StatCard
          label="Pending Approvals"
          count={getCount('Pending')}
          color="bg-orange-500"
          icon={<FaHourglassHalf className="text-5xl text-white/30 absolute top-4 left-4" />}
        />
        <StatCard
          label="Confirmed Bookings"
          count={getCount('Confirmed')}
          color="bg-green-500"
          icon={<FaRegCircleCheck className="text-5xl text-white/30 absolute top-4 left-4" />}
        />
        <StatCard
          label="Completed Bookings"
          count={getCount('Completed')}
          color="bg-blue-500"
          icon={<FaClipboardCheck className="text-5xl text-white/30 absolute top-4 left-4" />}
        />
        <StatCard
          label="Cancelled Bookings"
          count={getCount('Cancelled')}
          color="bg-red-500"
          icon={<FaTimesCircle className="text-5xl text-white/30 absolute top-4 left-4" />}
        />
      </div>
    </div>
  );
};

export default ReservationStat;

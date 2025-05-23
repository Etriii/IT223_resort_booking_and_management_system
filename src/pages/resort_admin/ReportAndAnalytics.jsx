// import React from 'react'

// const ReportAndAnalytics = () => {
//   document.title = "Reports and Analytics | Ocean View";

//   return (
//     <div>ReportAndAnalytics</div>
//   )
// }

// export default ReportAndAnalytics

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ResortAdminDashboard = () => {
  document.title = "Reports and Analytics | Ocean View";

  // Dummy data – replace with real API data
  const monthlyBookings = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [45, 70, 50, 90, 65, 100],
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
    ],
  };

  const paymentMethods = {
    labels: ['GCash', 'Cash'],
    datasets: [
      {
        label: 'Payment Methods',
        data: [100, 300],
        backgroundColor: ['#10b981', '#3b82f6'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Resort Analytics</h1>
      <div>I think pwede rani siya wala na page ba wala ko kabalo unsay e butang here kay pwede rman pud ni siya sa dashboard</div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-600 text-sm mb-2">Total Bookings</h2>
          <p className="text-2xl font-semibold text-blue-600">340</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-600 text-sm mb-2">Total Earnings</h2>
          <p className="text-2xl font-semibold text-green-600">₱135,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-600 text-sm mb-2">Unique Guests</h2>
          <p className="text-2xl font-semibold text-purple-600">198</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Bookings</h3>
          <Bar data={monthlyBookings} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Method Distribution</h3>
          <Pie data={paymentMethods} />
        </div>
      </div>
    </div>
  );
};

export default ResortAdminDashboard;

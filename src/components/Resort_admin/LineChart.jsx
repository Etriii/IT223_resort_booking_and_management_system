import React from "react";
import { Chart as ChartJS, DoughnutController } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const Labels = [
    { label: "Jan", revenue: 64854, cost: 32652 },
    { label: "Feb", revenue: 54628, cost: 42393 },
    { label: "Mar", revenue: 117238, cost: 50262 },
    { label: "Apr", revenue: 82830, cost: 64731 },
    { label: "May", revenue: 91208, cost: 41893 },
    { label: "Jun", revenue: 103609, cost: 83809 },
    { label: "Jul", revenue: 90974, cost: 44772 },
    { label: "Aug", revenue: 82919, cost: 37590 },
    { label: "Sep", revenue: 62407, cost: 43349 },
    { label: "Oct", revenue: 82528, cost: 45324 },
    { label: "Nov", revenue: 56979, cost: 47978 },
    { label: "Dec", revenue: 87436, cost: 39175 }
  ];

  const chartData = {
    labels: Labels.map(item => item.label),
    datasets: [
      {
        label: 'Revenue',
        data: Labels.map(item => item.revenue),
        backgroundColor: 'rgba(255, 99, 132, 1)', 
        tension: 0.4,// Example color
      },
      {
        label: 'Cost',
        data: Labels.map(item => item.cost),
        backgroundColor: 'rgba(54, 162, 235, 1)', 
        tension: 0.4,// Example color
      }
    ]
  };
  
const Linechart = () => {
  return (
<div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
<div className="col-span-2 bg-white rounded-xl shadow p-4">
    {/* Placeholder for the chart */}
    <div className="h-64 flex items-center justify-center text-gray-400">
      {/* Replace with your line chart */}
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  </div>

        </div>

  
  )
}

export default Linechart

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, DoughnutController } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const Linechart = ({ monthlyData, dailyData, span, height }) => {
  const [filter, setFilter] = React.useState("monthly");
  const filteredData = (filter === "30days" ? dailyData : monthlyData) || [];

  const chartData = {
    labels: filteredData.map((item) => item.label),
    datasets: [
      {
        label: "Profit",
        data: filteredData.map((item) => item.cost),
        backgroundColor: "rgba(54, 162, 235, 1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div
      className={`col-span-8 ${span} bg-gray-50 dark:bg-gray-100 shadow-xs rounded-xl`}
    >
      <div className="flex mb-2 space-x-1">
        <button
          onClick={() => setFilter("monthly")}
          className={`px-4 py-2 rounded ${
            filter === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setFilter("30days")}
          className={`px-4 py-2 rounded ${
            filter === "30days" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Last 30 Days
        </button>
      </div>
      <div className="col-span-2 bg-white shadow p-1">
        <div
          className={`${height} flex items-center justify-center text-gray-400`}
        >
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default Linechart;

import React, {useEffect, useState} from "react";
import { Chart as ChartJS, DoughnutController } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const Linechart = ({ span , height }) => {
  const [filter, setFilter] = React.useState("monthly");
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const resort_id = localStorage.getItem("user_role")
            ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
            : null;
  
          const response = await fetch(
            `http://localhost:8000/api.php?controller=Bookings&action=getTotalBookingsByResortId&resort_id=${resort_id}`
          );
  
          const data = await response.json();
          setBookings(data);
        } catch (error) {
          setNotify({
            type: "error",
            message: error.message || "Something went wrong!",
          });
        } finally {
          setTimeout(() => setLoading(false), 500);
        }
      };
  
      fetchBookings();
    }, []);

  const Labels = [
    { label: "Jan", cost: 32652 },
    { label: "Feb", cost: 42393 },
    { label: "Mar", cost: 50262 },
    { label: "Apr", cost: 64731 },
    { label: "May", cost: 41893 },
    { label: "Jun", cost: 90809 },
    { label: "Jul", cost: 44772 },
    { label: "Aug", cost: 37590 },
    { label: "Sep", cost: 43349 },
    { label: "Oct", cost: 45324 },
    { label: "Nov", cost: 47978 },
    { label: "Dec", cost: 39175 },
  ];

  const getFilteredData = () => {
    if (filter === "30days") {
      const today = new Date();
      const days = [...Array(30).keys()].map((i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (29 - i));
        return {
          label: d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          revenue: Math.floor(Math.random() * 100000),
          cost: Math.floor(Math.random() * 50000),
        };
      });
      return days;
    }
    return Labels;
  };

  const filteredData = getFilteredData();

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
      className={`col-span-8 ${span} bg-gray-100 dark:bg-gray-200 shadow-xs rounded-xl`}
    >
      <div className="flex mb-2">
        <button
          onClick={() => setFilter("monthly")}
          className={`px-4 py-2 rounded ${
            filter === "monthly" ? "bg-blue-600 text-white" : "bg-gray-400"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setFilter("30days")}
          className={`px-4 py-2 rounded ${
            filter === "30days" ? "bg-blue-600 text-white" : "bg-gray-400"
          }`}
        >
          Last 30 Days
        </button>
      </div>
      <div className="col-span-2 bg-white shadow p-1">
        <div className={`${height} flex items-center justify-center text-gray-400`}>
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

import React from "react";

const UpcomingBalanceCard = ({title}) => {
  return (
    <>
      <div className="bg-gray-100 rounded-xl shadow p-4 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl tracking-wide">{title}</h2>
          <span className="text-xs text-gray-400">Last 30 days</span>
        </div>
        <p className="text-3xl font-bold text-blue-600 mt-2">₱32,513.25</p>
      </div>
    </>
  );
};

export default UpcomingBalanceCard;

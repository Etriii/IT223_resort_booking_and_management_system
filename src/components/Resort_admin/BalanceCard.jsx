import React from "react";

const UpcomingBalanceCard = ({title}) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base tracking-wide">{title}</h2>
          <span className="text-xs text-gray-400">Last 30 days</span>
        </div>
        <p className="text-2xl font-bold text-blue-600 mt-2">₱32,513.25</p>
      </div>
    </>
  );
};

export default UpcomingBalanceCard;

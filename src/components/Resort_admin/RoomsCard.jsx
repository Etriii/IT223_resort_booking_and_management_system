import React from "react";

const RoomsCard = () => {
  const roomTypes = [
    { label: "King Room", count: 3 },
    { label: "Queen Room", count: 4 },
    { label: "Suite Room", count: 4 },
    { label: "Double Room", count: 6 },
    { label: "Single Room", count: 10 },
  ];

  return (
    <div className="col-span-4  bg-gray-100 shadow-md rounded-lg p-8 tracking-wider space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Total Rooms:{" "}
          <span className="text-blue-600 text-2xl font-bold">27</span>
        </h2>
      </div>
      <div>
        <h2 className="text-lg font-semibold">
          Total Floors:{" "}
          <span className="text-blue-600 text-xl font-bold">5</span>
        </h2>
      </div>
      <hr />
      <div>
        <h3 className="text-md font-semibold mb-2">Types</h3>
        <div className="space-y-1">
          {roomTypes.map((room, index) => (
            <div className="flex justify-between" key={index}>
              <span>{room.label}:</span>
              <span>{room.count}</span>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default RoomsCard;

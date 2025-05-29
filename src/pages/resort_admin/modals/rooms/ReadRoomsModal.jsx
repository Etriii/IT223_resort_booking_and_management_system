import React from "react";

const ReadRoomsModal = ({ room }) => {
  if (!room) return null;

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      <div>
        <label className="block mb-1 font-medium">Room Image</label>
        <div className="w-72 h-48 rounded border overflow-hidden">
          {room.image ? (
            <img
              src={room.image}
              alt="Room"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
              No Image Available
            </div>
          )}
        </div>
      </div>

      {/* Read-Only Details */}
      <div>
        <label className="block mb-1 font-medium">Room Number</label>
        <div className="w-full border p-2 rounded bg-gray-100">
          {room.room_number || "N/A"}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Floor Number</label>
        <div className="w-full border p-2 rounded bg-gray-100">
          {room.floor_number || "N/A"}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Room Type</label>
        <div className="w-full border p-2 rounded bg-gray-100">
          {room.room_type || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default ReadRoomsModal;

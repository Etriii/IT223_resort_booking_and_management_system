import React from "react";

const ReadRoomsModal = ({ room }) => {
  if (!room) return null;

  const renderValue = (label, value) => (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <div className="w-full border p-2 rounded bg-gray-100">{value ?? "N/A"}</div>
    </div>
  );

  return (
    <div className="space-y-4 max-w-lg">
      {/* Room Image */}
      <div>
        <label className="block mb-1 font-medium">Room Image</label>
        <div className=" h-60 rounded border overflow-hidden">
          {room.room_image ? (
            <img
              src={room.room_image}
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

      {renderValue("Room ID", room.id)}
      {renderValue("Building ID", room.building_id)}
      {renderValue("Resort ID", room.resort_id)}
      {renderValue("Room Type ID", room.room_type_id)}
      {renderValue("Room Name", room.room_name)}
      {renderValue("Description", room.description)}
      {renderValue("Inclusions", room.inclusions)}
      {renderValue("Amenities", room.amenities)}
      {renderValue("Price per Night", room.price_per_night ? `₱${room.price_per_night}` : "N/A")}
      {renderValue("Availability", room.is_available ? "Available" : "Not Available")}
    </div>
  );
};

export default ReadRoomsModal;

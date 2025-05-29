import React from "react";

const DeleteRoomsModal = ({ room }) => {
  return (
    <div className="space-y-4 text-sm">
      <p>
        Are you sure you want to delete the room{" "}
        <strong className="text-red-600">{room?.room_name}</strong>?
      </p>
      <p className="text-gray-600">
        This action is irreversible and will remove all associated bookings and data.
      </p>
    </div>
  );
};

export default DeleteRoomsModal;


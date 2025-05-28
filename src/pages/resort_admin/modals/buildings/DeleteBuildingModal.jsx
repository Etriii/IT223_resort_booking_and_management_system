import React from "react";

const DeleteBuildingModal = ({ building }) => {
  return (
    <div className="space-y-4 text-sm">
      <p>
        Are you sure you want to delete the building{" "}
        <strong className="text-red-600">{building?.name}</strong>?
      </p>
      <p className="text-gray-600">
        This action is irreversible and will remove all associated rooms and floors.
      </p>
    </div>
  );
};

export default DeleteBuildingModal;

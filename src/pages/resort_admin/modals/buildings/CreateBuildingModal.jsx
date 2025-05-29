import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const CreateBuildingModal = ({ handleCreateFormInputChange, formData }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      handleCreateFormInputChange({
        target: {
          name: "image",
          value: file,
        },
      });
    }
  };

  return (
    <form className="space-y-4">
      {/* Upload Box */}
      <div>
        <label className="block mb-1 font-medium">Upload Building Image</label>
        <div className="w-72 h-48 border-2 border-dashed border-gray-400 rounded bg-gray-100 flex items-center justify-center cursor-pointer relative overflow-hidden">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <FaCloudUploadAlt className="text-3xl mb-2" />
              <p className="font-semibold">Upload Image</p>
              <p className="text-xs">Drag file here to upload</p>
            </div>
          )}
        </div>
      </div>

      {/* Text Inputs */}
      <div>
        <label className="block mb-1 font-medium">Building Name</label>
        <input
          type="text"
          name="name"
          value={formData.values.name}
          onChange={handleCreateFormInputChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Number of Floors</label>
        <input
          type="number"
          name="floor_count"
          value={formData.values.floor_count}
          onChange={handleCreateFormInputChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Rooms Per Floor</label>
        <input
          type="number"
          name="room_per_floor"
          value={formData.values.room_per_floor}
          onChange={handleCreateFormInputChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
    </form>
  );
};

export default CreateBuildingModal;

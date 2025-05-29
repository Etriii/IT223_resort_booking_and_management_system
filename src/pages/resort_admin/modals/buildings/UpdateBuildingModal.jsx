import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const UpdateBuildingModal = ({ formData, setFormData }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (formData.values.image && typeof formData.values.image === "string") {
      setPreview(formData.values.image);
    }
  }, [formData.values.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        values: { ...prev.values, image: file },
      }));
    }
  };

  const { values, errors } = formData;

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
          value={values.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Number of Floors</label>
        <input
          type="number"
          name="floor_count"
          value={values.floor_count}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        {errors.floor_count && <p className="text-red-500 text-sm">{errors.floor_count}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Rooms Per Floor</label>
        <input
          type="number"
          name="room_per_floor"
          value={values.room_per_floor}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        {errors.room_per_floor && <p className="text-red-500 text-sm">{errors.room_per_floor}</p>}
      </div>
    </form>
  );
};

export default UpdateBuildingModal;

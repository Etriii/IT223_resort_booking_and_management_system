import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const CreateRoomsModal = ({ buildingId, onSuccess, onCancel }) => {
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    room_name: "",
    room_type_id: "",
    price_per_night: "",
    is_available: "1",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("building_id", buildingId);
    Object.entries(formData).forEach(([key, val]) => {
      payload.append(key, val);
    });

    try {
      const res = await fetch("http://localhost:8000/api.php?controller=Rooms&action=createRoom", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (data?.success) {
        onSuccess("Room successfully created.");
      } else {
        alert("Failed to create room.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the room.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Upload Image */}
      <div>
        <label className="block mb-1 font-medium">Upload Room Image</label>
        <div className="w-72 h-48 border-2 border-dashed border-gray-400 rounded bg-gray-100 flex items-center justify-center cursor-pointer relative overflow-hidden">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {preview ? (
            <img src={preview} alt="Preview" className="object-cover w-full h-full" />
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
        <label className="block mb-1 font-medium">Room Name</label>
        <input
          type="text"
          name="room_name"
          value={formData.room_name}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Room Type ID</label>
        <input
          type="text"
          name="room_type_id"
          value={formData.room_type_id}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Price Per Night</label>
        <input
          type="number"
          name="price_per_night"
          value={formData.price_per_night}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Availability</label>
        <select
          name="is_available"
          value={formData.is_available}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        >
          <option value="1">Available</option>
          <option value="0">Unavailable</option>
        </select>
      </div>
    </form>
  );
};

export default CreateRoomsModal;

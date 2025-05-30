
import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const UpdateRoomsModal = ({
  formData,
  setFormData,
  onSubmit = () => { },
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Initialize preview with existing image URL (if any)
    if (
      formData &&
      formData.values &&
      formData.values.room_image &&
      typeof formData.values.room_image === "string"
    ) {
      setPreview(formData.values.room_image);
    } else {
      setPreview(null);
    }
  }, [formData]);

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
      // Release previous preview URL to avoid memory leaks
      if (preview && typeof preview !== "string") {
        URL.revokeObjectURL(preview);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFormData((prev) => ({
        ...prev,
        values: { ...prev.values, image: file },
      }));
    }
  };

  const values = formData?.values || {};
  const errors = formData?.errors || {};

  const data = [
    { id: 1, name: "King Size", description: "", capacity: 5, base_price: 3500.0 },
    { id: 2, name: "Queen Size", description: "", capacity: 4, base_price: 3000.0 },
    { id: 3, name: "Twin Bed", description: "", capacity: 2, base_price: 2800.0 },
    { id: 4, name: "Deluxe Suite", description: "", capacity: 4, base_price: 5000.0 },
    { id: 5, name: "Family Room", description: "", capacity: 7, base_price: 4000.0 },
    { id: 6, name: "Penthouse Suite", description: "", capacity: 10, base_price: 8000.0 },
    { id: 7, name: "Bungalow Villa", description: "", capacity: 8, base_price: 6000.0 }
  ];

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      noValidate
    >
      {/* Image Upload */}
      <div>
        <label
          htmlFor="room-image-upload"
          className="block mb-1 font-medium cursor-pointer"
        >
          Upload Room Image
        </label>
        <div className="w-72 h-48 border-2 border-dashed border-gray-400 rounded bg-gray-100 flex items-center justify-center cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <input
            id="room-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-describedby="imageUploadHelp"
          />
          {preview ? (
            <img
              src={preview}
              alt="Room Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500 pointer-events-none select-none">
              <FaCloudUploadAlt className="text-3xl mb-2" />
              <p className="font-semibold">Upload Image</p>
              <p id="imageUploadHelp" className="text-xs">
                Drag file here or click to upload
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Room Number */}
      <div>
        <label htmlFor="room_number" className="block mb-1 font-medium">
          Room Name
        </label>
        <input
          id="room_number"
          type="text"
          name="room_number"
          value={values.room_name || ""}
          onChange={handleChange}
          className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${errors.room_number ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          required
          aria-invalid={errors.room_number ? "true" : "false"}
          aria-describedby={errors.room_number ? "roomNumberError" : undefined}
        />
        {errors.room_number && (
          <p id="roomNumberError" className="text-red-500 text-sm mt-1">
            {errors.room_number}
          </p>
        )}
      </div>

      {/* Room Type */}
      {/* <div>
        <label htmlFor="room_type" className="block mb-1 font-medium">
          Room Type
        </label>
        <input
          id="room_type"
          type="text"
          name="room_type"
          value={values.room_type || ""}
          onChange={handleChange}
          className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${errors.room_type ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          required
          aria-invalid={errors.room_type ? "true" : "false"}
          aria-describedby={errors.room_type ? "roomTypeError" : undefined}
        />
        {errors.room_type && (
          <p id="roomTypeError" className="text-red-500 text-sm mt-1">
            {errors.room_type}
          </p>
        )}
      </div> */}


      {/* Room Type ID */}
      <div>
        <label htmlFor="room_type_id" className="block mb-1 font-medium">
          Room Type ID
        </label>
        <input
          id="room_type_id"
          type="number"
          name="room_type_id"
          value={values.room_type_id || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={values.description || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      {/* Inclusions */}
      <div>
        <label htmlFor="inclusions" className="block mb-1 font-medium">
          Inclusions (comma-separated)
        </label>
        <input
          id="inclusions"
          type="text"
          name="inclusions"
          value={values.inclusions || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Amenities */}
      <div>
        <label htmlFor="amenities" className="block mb-1 font-medium">
          Amenities (comma-separated)
        </label>
        <input
          id="amenities"
          type="text"
          name="amenities"
          value={values.amenities || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price Per Night */}
      <div>
        <label htmlFor="price_per_night" className="block mb-1 font-medium">
          Price Per Night
        </label>
        <input
          id="price_per_night"
          type="number"
          name="price_per_night"
          step="0.01"
          value={values.price_per_night || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Is Available */}
      <div className="flex items-center">
        <input
          id="is_available"
          type="checkbox"
          name="is_available"
          checked={!!values.is_available}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="is_available" className="font-medium">
          Is Available
        </label>
      </div>

    </form>
  );
};

export default UpdateRoomsModal;

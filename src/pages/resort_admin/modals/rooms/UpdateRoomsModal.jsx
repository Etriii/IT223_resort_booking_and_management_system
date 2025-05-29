// import React, { useState, useEffect } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";

// const UpdateRoomsModal = ({ formData = { values: {} }, setFormData }) => {
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     if (
//       formData &&
//       formData.values &&
//       formData.values.image &&
//       typeof formData.values.image === "string"
//     ) {
//       setPreview(formData.values.image);
//     }
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       values: { ...prev.values, [name]: value },
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//       setFormData((prev) => ({
//         ...prev,
//         values: { ...prev.values, image: file },
//       }));
//     }
//   };

//   // Destructure safely
//   const values = formData?.values || {};
//   const errors = formData?.errors || {};

//   return (
//     <form className="space-y-4">
//       {/* Upload Box */}
//       <div>
//         <label className="block mb-1 font-medium">Upload Room Image</label>
//         <div className="w-72 h-48 border-2 border-dashed border-gray-400 rounded bg-gray-100 flex items-center justify-center cursor-pointer relative overflow-hidden">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           />
//           {preview ? (
//             <img
//               src={preview}
//               alt="Room Preview"
//               className="object-cover w-full h-full"
//             />
//           ) : (
//             <div className="flex flex-col items-center text-gray-500">
//               <FaCloudUploadAlt className="text-3xl mb-2" />
//               <p className="font-semibold">Upload Image</p>
//               <p className="text-xs">Drag file here to upload</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Text Inputs */}
//       <div>
//         <label className="block mb-1 font-medium">Room Number</label>
//         <input
//           type="text"
//           name="room_number"
//           value={values.room_number || ""}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         {errors.room_number && (
//           <p className="text-red-500 text-sm">{errors.room_number}</p>
//         )}
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Floor Number</label>
//         <input
//           type="number"
//           name="floor_number"
//           value={values.floor_number || ""}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         {errors.floor_number && (
//           <p className="text-red-500 text-sm">{errors.floor_number}</p>
//         )}
//       </div>

//       <div>
//         <label className="block mb-1 font-medium">Room Type</label>
//         <input
//           type="text"
//           name="room_type"
//           value={values.room_type || ""}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         {errors.room_type && (
//           <p className="text-red-500 text-sm">{errors.room_type}</p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default UpdateRoomsModal;

import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const UpdateRoomsModal = ({
  formData = { values: {} },
  setFormData,
  onSubmit = () => {},
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Initialize preview with existing image URL (if any)
    if (
      formData &&
      formData.values &&
      formData.values.image &&
      typeof formData.values.image === "string"
    ) {
      setPreview(formData.values.image);
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
          Room Number
        </label>
        <input
          id="room_number"
          type="text"
          name="room_number"
          value={values.room_number || ""}
          onChange={handleChange}
          className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${
            errors.room_number ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
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

      {/* Floor Number */}
      <div>
        <label htmlFor="floor_number" className="block mb-1 font-medium">
          Floor Number
        </label>
        <input
          id="floor_number"
          type="number"
          name="floor_number"
          value={values.floor_number || ""}
          onChange={handleChange}
          className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${
            errors.floor_number ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          required
          aria-invalid={errors.floor_number ? "true" : "false"}
          aria-describedby={errors.floor_number ? "floorNumberError" : undefined}
        />
        {errors.floor_number && (
          <p id="floorNumberError" className="text-red-500 text-sm mt-1">
            {errors.floor_number}
          </p>
        )}
      </div>

      {/* Room Type */}
      <div>
        <label htmlFor="room_type" className="block mb-1 font-medium">
          Room Type
        </label>
        <input
          id="room_type"
          type="text"
          name="room_type"
          value={values.room_type || ""}
          onChange={handleChange}
          className={`w-full border p-2 rounded focus:outline-none focus:ring-2 ${
            errors.room_type ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
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
      </div>
    </form>
  );
};

export default UpdateRoomsModal;

import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const CarouselImageCard = ({ title, styles }) => {

  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oceanview");
    formData.append("folder", "oceanview_photos"); // replace with your preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpa4l9gxw/image/upload", // replace with your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.secure_url); // Save the URL to show the uploaded image
      console.log(data.public_id); // You can save public_id to your database!
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles}`}>
      <label className="title bold mb-2 text-lg tracking-wider font-medium text-gray-700">
        {title}
      </label>
      {imageUrl ? (
        <div className="flex flex-col items-center h-[40lvh] justify-center border bg-gray-200 rounded-lg">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center h-[40lvh] justify-center border bg-gray-200 rounded-lg p-6 ">
          <label className="flex flex-col items-center justify-center cursor-pointer text-center w-full h-full gap-1">
            <FaCloudUploadAlt className="text-[7rem] text-gray-400" />
            <span className="font-bold z-0">Upload Image</span>
            <span className="text-sm text-gray-600 z-0">
              Drag file here to upload
            </span>
            <input
              type="file"
              accept="room_upload"
              onChange={handleImageUpload}
              className="absolute hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default CarouselImageCard;

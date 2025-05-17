import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import fetchImages from "../../hooks/cloudinary/useFetchImages";
import { uploadResortImageById } from "../../utils/cloudinaryapi";

const CLOUD_NAME = "dpa4l9gxw";

const CarouselImageCard = ({ title, styles, imageField }) => {
  const [imageUrl , setImageUrl] = fetchImages(imageField);

  // useEffect(() => {
  //   const resort_id = localStorage.getItem("user_role")
  //     ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
  //     : null;

  //   if (!resort_id) return;

  //   const fetchImage = async () => {
  //     const data = await getResortById(resort_id);

  //     if (data?.success && data.resort?.[imageField]) {
  //       const publicId = data.resort[imageField];
  //       const constructedUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
  //       setImageUrl(constructedUrl);
  //     }
  //   };

  //   fetchImage();
  // }, [imageField]);

  const handleImageUpload = async (event) => {
    const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]
      ?.resort_id;
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oceanview");
    formData.append("folder", `${resort_id}`);

    try {
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await cloudRes.json();
      setImageUrl(data.secure_url);
      const publicId = data.public_id;

      await uploadResortImageById(resort_id, imageField, publicId);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   const resort_id = localStorage.getItem("user_role")
  //     ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
  //     : null;

  //   if (!resort_id) return;

  //   const fetchImage = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/api.php?controller=Resorts&action=getResortById&id=${resort_id}`
  //       );
  //       const data = await response.json();

  //       if (data.success && data.resort && data.resort[imageField]) {
  //         const publicId = data.resort[imageField];
  //         const constructedUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
  //         setImageUrl(constructedUrl);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching image:", error);
  //     }
  //   };

  //   fetchImage();
  // }, [imageField]);

  // const handleImageUpload = async (event) => {
  //   const resort_id = localStorage.getItem("user_role")
  //     ? JSON.parse(localStorage.getItem("user_role"))[0]["resort_id"]
  //     : null;
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "oceanview");
  //   formData.append("folder", `${resort_id}`);

  //   try {
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, // replace with your cloud name
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const data = await response.json();
  //     setImageUrl(data.secure_url); // Save the URL to show the uploaded image

  //     const publicId = data.public_id;

  //     await fetch(
  //       `http://localhost:8000/api.php?controller=Resorts&action=uploadResortImageById`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           id: resort_id,
  //           imageField: imageField,
  //           image: data.public_id,
  //         }),
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className={`${styles}`}>
        <label className="title bold mb-2 text-lg tracking-wider font-medium text-gray-700">
          {title}
        </label>
        {imageUrl ? (
          <label className="flex flex-col items-center h-[40lvh] justify-center border bg-gray-200 rounded-lg cursor-pointer relative w-full">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute hidden"
            />
          </label>
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
    </>
  );
};

export default CarouselImageCard;

import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Manage_Resort = ({title}) => {
  const baseStyle = "col-span-1 sm:col-span-3 lg:col-span-3";
  // "relative overflow-hidden lg:col-span-3 sm:col-span-6 text-center h-[40lvh] flex flex-col justify-end bg-gray-200 rounded-2xl";

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
    <>
      <div className={baseStyle}>
        <label class="title bold mb-2 text-lg tracking-wider font-medium text-gray-700">
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
            <label className="flex flex-col items-center justify-center text-center cursor-pointer w-full h-full gap-1">
              <FaCloudUploadAlt className="text-[9rem] text-gray-400 pointer-events-none" />
              <span className="font-bold text-lg z-0">Upload Image</span>
              <span className="text-sm text-gray-600 z-0">
                Drag file here to upload
              </span>
              <input
                type="file"
                accept="image/*"
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
// const rows = [
//   {
//     preview: {
//       title: "Preview Card 1",
//       bg: "bg-gray-200",
//     },
//     carousels: [
//       { title: "Carousel 1", value: "16", bg: "bg-green-500" },
//       { title: "Carousel 2", value: "75%", bg: "bg-blue-500" },
//       { title: "Carousel 3", value: "16", bg: "bg-yellow-500" },
//     ],
//   },
//   {
//     preview: {
//       title: "Preview Card 2",
//       bg: "bg-gray-200",
//     },
//     carousels: [
//       { title: "Carousel 4", value: "33", bg: "bg-purple-500" },
//       { title: "Carousel 5", value: "88%", bg: "bg-pink-500" },
//       { title: "Carousel 6", value: "21", bg: "bg-red-500" },
//     ],
//   },
// ];
{
  /* <div className={`${baseStyle} flex flex-col justify-between`}>
  <div>
    <h1 className="text-4xl font-semibold mb-2">sdf</h1>
    <p className="text-gray-600 mb-4">paihi</p>
  </div>
  <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
    Upload Image
  </button>
</div> */
}

export default Manage_Resort;

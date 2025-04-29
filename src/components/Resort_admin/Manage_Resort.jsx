import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Manage_Resort = () => {
  const baseStyle =
    "relative overflow-hidden lg:col-span-3 sm:col-span-6 text-center p-6 h-[40lvh] flex flex-col justify-end bg-gray-200 rounded-2xl";

  return (
    <>
      <div className={baseStyle}>
        <button
          className="absolute inset-0 flex items-center justify-center opacity-80 hover:opacity-30 transition-all"
          onClick={() => console.log("Background clicked")}
        >
          <FaCloudUploadAlt className="text-[10rem] text-gray-400 pointer-events-none" />
        </button>

        <button className="relative z-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Main Image
        </button>
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

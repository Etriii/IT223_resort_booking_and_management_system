import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const CarouselImageCard = ({ label }) => {
  const carouselStyle =
    "relative overflow-hidden lg:col-span-2 sm:col-span-2 text-center p-6 h-[40lvh] flex flex-col justify-end bg-gray-200 rounded-2xl";
  const buttonLAyout = "absolute inset-0 flex items-center justify-center opacity-80 hover:opacity-30 transition-all";

  return (
    <>
    <div className={carouselStyle}>
      <div>
      <button
        className={buttonLAyout}
      >
        <FaCloudUploadAlt className="text-[10rem] text-gray-400 pointer-events-none" />
      </button>
      </div>

      <button className="labels relative z-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        {label}
      </button>
    </div>
    </>
    
  );
};

export default CarouselImageCard;

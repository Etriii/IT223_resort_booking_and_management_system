import { useEffect } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";
import React from "react";
import CarouselImageCard from "../../components/Resort_admin/CarouselImageCard";

const ManageResort = () => {
  useEffect(() => {
    document.title = "Manage Resort | Ocean View";
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 items-center sm:grid-cols-6 lg:grid-cols-9 gap-4 p-3">
        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-3" title="Main Image" />
        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-2" title="Image 1" />
        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-2" title="Image 2" />
        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-2" title="Image 3" />

        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-2" title="Image 4"/>
        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-2" title="Image 5" />
        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-3" title="Room Image 1" />
        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-2" title="Room Image 2" />
    
        <CarouselImageCard styles="col-span-1 sm:col-span-3 lg:col-span-2" title="Room Image 3" />

        <div className="col-span-7 tracking-wider text-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resort Description
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Description
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amenities
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </>
  );
};

export default ManageResort;

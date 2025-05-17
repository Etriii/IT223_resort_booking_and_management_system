import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";
import CarouselImageCard from "../../components/Resort_admin/CarouselImageCard";

const ManageResort = () => {
  const [resortDescription, setResortDescription] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [amenities, setAmenities] = useState("");

  useEffect(() => {
    const fetchResortDetails = async () => {
      try {
        const userRole = localStorage.getItem("user_role");
        const resort_id = userRole ? JSON.parse(userRole)[0]["resort_id"] : null;

        const response = await fetch(
          `http://localhost:8000/api.php?controller=Resorts&action=getDetailsByResortId&id=${resort_id}`
        );
        const data = await response.json();

        if (data?.success && data.resort) {
          setResortDescription(data.resort.resort_description || "");
          setRoomDescription(data.resort.room_description || "");
          setAmenities((data.resort.amenities || ""));
        }
      } catch (error) {
        console.error("Error fetching resort details:", error);
      }
    };

    fetchResortDetails();
  }, []);

  const handleUpdate = async () => {
  try {
    const userRole = localStorage.getItem("user_role");
    const resort_id = userRole ? JSON.parse(userRole)[0]["resort_id"] : null;

    if (!resort_id) return;

    const response = await fetch(
      `http://localhost:8000/api.php?controller=Resorts&action=updateResortDetails`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: resort_id,
          resort_description: resortDescription,
          room_description: roomDescription,
          amenities:amenities,
        }),
      }
    );

    const data = await response.json();
    if (data.success) {
      alert("Resort details updated successfully!");
    } else {
      alert("Update failed: " + (data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Update error:", error);
    alert("Error updating resort details.");
  }
};


  return (
    <>
      <div className="grid grid-cols-4 items-center sm:grid-cols-6 lg:grid-cols-9 gap-4 p-3">
        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-3" title="Main Image" imageField="main_image"/>
        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-2" title="Image 1" imageField="image1"/>
        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-2" title="Image 2" imageField="image1_2"/>
        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-2" title="Image 3" imageField="image1_3"/>

        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-2" title="Image 4" imageField="image2"/>
        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-2" title="Image 5" imageField="image3"/>
        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-3" title="Room Image 1" imageField="room_image_1"/>
        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-2" title="Room Image 2" imageField="room_image_2"/>
        <CarouselImageCard styles="col-span-2 sm:col-span-3 lg:col-span-2" title="Room Image 3" imageField="room_image_3"/>

        <div className="col-span-7 tracking-wider text-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resort Description
          </label>
          <input
            type="text"
            placeholder="Type here..."
            value={resortDescription}
            onChange={(e) => setResortDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Description
          </label>
          <input
            type="text"
            placeholder="Type here..."
            value={roomDescription}
            onChange={(e) => setRoomDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amenities
          </label>
          <input
            type="text"
            placeholder="Type here..."
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1 sm:col-span-6 lg:col-span-9 flex justify-end space-x-2">
        <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default ManageResort;

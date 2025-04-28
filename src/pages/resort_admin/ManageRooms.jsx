import AdminLayout from "../../layouts/ResortAdminLayout";
import { useState } from "react";

const ManageResort = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <AdminLayout>
      {/* Sidebar */}
      {showSidebar && (
        <div id="sidebar" className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 shadow-lg z-40">
          {/* Sidebar content goes here */}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300 mb-4"
          >
            Close Sidebar
          </button>
          <p>Sidebar Content</p>
        </div>
      )}
      {showSidebar && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      <main className="p-8 max-w-6xl mx-auto space-y-12">
        <div className="flex justify-end">
          <button
            onClick={toggleSidebar}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md"
          >
            {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
          </button>
        </div>

        <section className="bg-gray-100 p-6 mt-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Room</h2>
          <form action="save_room.php" method="POST" encType="multipart/form-data" className="space-y-4">
            <div>
              <label className="block font-medium">Building</label>
              <select name="building_id" className="w-full border p-2 rounded-lg" required>
                <option value="1">Punta Verde Building 1</option>
                <option value="2">Bruzy Building 1</option>
              </select>
            </div>

            <div>
              <h3 className="text-md mb-2">Room Image</h3>
              <label className="bg-gray-200 rounded-lg h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer relative">
                <input type="file" name="room_upload" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <i className="fas fa-cloud-upload-alt text-3xl text-gray-500 mb-2 z-0"></i>
                <span className="font-bold z-0">Upload Image</span>
                <span className="text-sm text-gray-600 z-0">Drag file here to upload</span>
              </label>
            </div>

            <div>
              <label className="block font-medium">Room Type</label>
              <select name="room_type_id" className="w-full border p-2 rounded-lg" required>
                <option value="1">Standard</option>
                <option value="2">Deluxe</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Room Name</label>
              <input type="text" name="room_name" className="w-full border p-2 rounded-lg" required />
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea name="description" className="w-full border p-2 rounded-lg" rows="3"></textarea>
            </div>

            <div>
              <label className="block font-medium">Inclusions</label>
              <textarea name="inclusions" className="w-full border p-2 rounded-lg" rows="2"></textarea>
            </div>

            <div>
              <label className="block font-medium">Amenities</label>
              <textarea name="amenities" className="w-full border p-2 rounded-lg" rows="2"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Price per Night</label>
                <input type="number" name="price_per_night" step="0.01" className="w-full border p-2 rounded-lg" required />
              </div>
              <div>
                <label className="block font-medium">Available?</label>
                <select name="is_available" className="w-full border p-2 rounded-lg">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save Room
            </button>
          </form>
        </section>
      </main>
    </AdminLayout>
  );
};

export default ManageResort;

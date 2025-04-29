import { useEffect } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";
import { useState } from "react";

const ManageBuildings = () => {
    useEffect(() => {
        document.title = "Manage Building | Ocean View";
    }, []);
   
  const [showPopup, setShowPopup] = useState(false);
  const [buildings, setBuildings] = useState([
    {
      id: 1,
      image: "b1.jpg",
      name: "ALEX BUILDING",
      floors: 15,
      rooms: 10,
    },
    {
      id: 2,
      image: "b2.jpg",
      name: "MICAH BUILDING",
      floors: 10,
      rooms: 5,
    },
    {
      id: 3,
      image: "b3.jpg",
      name: "JELOU BUILDING",
      floors: 10,
      rooms: 5,
    },
  ]);

  const handleAddBuilding = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newBuilding = {
      id: buildings.length + 1,
      image: URL.createObjectURL(formData.get("image")),
      name: formData.get("name"),
      floors: Number(formData.get("floor_count")),
      rooms: Number(formData.get("room_per_floor")),
    };

    setBuildings([...buildings, newBuilding]);
    setShowPopup(false);
    e.target.reset();
  };

  const handleRemoveBuilding = (id) => {
    const updatedBuildings = buildings.filter(building => building.id !== id);
    setBuildings(updatedBuildings);
  };

  return (
    <AdminLayout>
      {/* --Sidebar-- */}

      {/* Add New Building Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setShowPopup(true)}
          className="mt-5 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded w-50 shadow-md mr-20"
        >
          Add New Building
        </button>
      </div>

      {/* Building Table */}
      <main className="p-8 max-w-7xl mx-auto space-y-12">
        <section className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-blue-600 text-white h-24">
              <tr>
                <th className="px-4 py-3 text-left text-xl font-bold">ID</th>
                <th className="px-4 py-3 text-left text-xl font-bold">Image</th>
                <th className="px-4 py-3 text-left text-xl font-bold">Building Name</th>
                <th className="px-4 py-3 text-left text-xl font-bold">Floors</th>
                <th className="px-4 py-3 text-left text-xl font-bold">Rooms</th>
                <th className="px-4 py-3 text-center text-xl font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {buildings.map((building) => (
                <tr key={building.id} className="border-t border-gray-300">
                  <td className="px-4 py-6 text-center border-b border-gray-300 text-2xl font-semibold">
                    {building.id}
                  </td>
                  <td className="px-4 py-6 border-b border-gray-300">
                    <img
                      src={building.image}
                      alt={building.name}
                      className="w-64 h-full object-cover rounded-md shadow-lg"
                    />
                  </td>
                  <td className="px-4 py-6 font-bold border-b border-gray-300 text-xl">
                    {building.name}
                  </td>
                  <td className="px-4 py-6 text-left border-b border-gray-300 text-xl">
                    {building.floors}
                  </td>
                  <td className="px-4 py-6 text-left border-b border-gray-300 text-xl">
                    {building.rooms}
                  </td>
                  <td className="px-4 py-6 space-y-2 border-b border-gray-300">
                    <div className="flex flex-col items-center space-y-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded w-32 shadow-md">
                        Edit Building
                      </button>
                      <button 
                        onClick={() => handleRemoveBuilding(building.id)}
                        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded w-32 shadow-md"
                      >
                        Remove
                      </button>
                      <button 
                        onClick={() => alert(`Viewing rooms for ${building.name}`)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded w-32 shadow-md"
                      >
                        View Rooms
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Popup Form Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
            >
              <i className="fas fa-times"></i>
            </button>

            <h2 className="text-2xl font-semibold mb-6">Add New Building</h2>
            <form onSubmit={handleAddBuilding} className="space-y-4">
              <div>
                <label className="block font-medium">Resort ID</label>
                <input
                  type="number"
                  name="resort_id"
                  className="w-full border p-2 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Building Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border p-2 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Floor Count</label>
                  <input
                    type="number"
                    name="floor_count"
                    className="w-full border p-2 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Rooms Per Floor</label>
                  <input
                    type="number"
                    name="room_per_floor"
                    className="w-full border p-2 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium">Building Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                Save Building
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageBuildings;
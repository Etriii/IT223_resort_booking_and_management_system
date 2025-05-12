import React, { useEffect, useState } from 'react'
import { FiFilter } from 'react-icons/fi';

import ActionNotification from '../../components/ui/modals/ActionNotification';

const ResortSchedules = ({ }) => {
  document.title = "Reservation Schedules | Ocean View";

  const [buildings, setBuildings] = useState([]);
  const [notify, setNotify] = useState({ open: '', variant: '', message: '' });


  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;
        const res = await fetch(
          `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortId&resort_id=${resort_id}`
        );
        const data = await res.json();
        setBuildings(data);
        if (data.length > 0) {
          setSelectedBuilding(data[0]);
          setRoomFormData((prev) => ({ ...prev, building_id: data[0].id }));
          fetchRooms(data[0].id);
        }
      } catch {
        setNotify({ type: "error", message: "Failed to fetch buildings" });
      }
    };

    fetchBuildings();
  }, []);

  // FILTERS
  const [filters, setFilters] = useState({ paginate: 5, page: 1 });



  // 
  const days = Array.from({ length: 15 }, (_, i) => i + 12); // Days 12 to 26
  const availability = Array(15).fill(0); // Assuming 0 means available (green)

  return (
    <div className={`space-y-1`}>
      {notify && (<ActionNotification isOpen={notify.open} variant={`${notify.type}`}> {notify.message} </ActionNotification>)}

      <div className="flex items-center gap-4 justify-between">
        <div className={`flex items-center space-x-2`}>
          <div>
            <select
              name="building_id"
              value={""}
              onChange={() => { }}
              className="w-full border p-2 rounded-lg outline-none"
              disabled={false}
              required
            >
              {buildings.map((bld) => (
                <option key={bld.id} value={bld.id}>
                  {bld.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-green-500"
            onClick={() => openModal('filter')}
          >
            <FiFilter className="text-lg" />
            Filter
          </button>
        </div>
        <button className={`px-2 py-1 bg-blue-600 border-none text-white rounded-md flex items-center`}>
          <span className={` text-xl mr-1`}>+</span> Reservation
        </button>
      </div>
      <div className="bg-blue-600 p-3 flex items-center justify-center w-full">
        <div className="flex gap-1">
          <button onClick={() => { }} className="px-2 py-1 text-sm text-blue-600 bg-white rounded hover:bg-blue-100 transition" >
            ««
          </button>
          <button onClick={() => { }} className="px-2 py-1 text-sm text-blue-600 bg-white rounded hover:bg-blue-100 transition"  >
            «
          </button>
          <button onClick={() => { }} className="px-2 py-1 text-sm text-blue-600 bg-white rounded hover:bg-blue-100 transition"  >
            »
          </button>
          <button onClick={() => { }} className="px-2 py-1 text-sm text-blue-600 bg-white rounded hover:bg-blue-100 transition" >
            »»
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="min-w-[80px] border border-gray-300 px-4 py-2 text-left"></th>
              <th className="border border-gray-300 px-4 py-2 text-center" colSpan={15}>
                2025
              </th>
            </tr>
            <tr>
              <th className="min-w-[80px] border border-gray-300 px-4 py-2 text-left"></th>
              <th className="border border-gray-300 px-4 py-2 text-center text-blue-500" colSpan={15}>
                May
              </th>
            </tr>
            <tr>
              <th className="min-w-[80px] border border-gray-300 px-4 py-2 text-left"></th>
              {days.map((day) => (
                <th key={day} className="border border-gray-300 px-4 py-2 text-center">
                  Day {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Rooms</th>
              {availability.map((count, index) => (
                <td
                  key={`rooms-${index}`}
                  className={`border border-gray-300 px-4 py-2 text-center ${count === 0 ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
                    }`}
                >
                  {count}
                </td>
              ))}
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">1-1</th>
              {availability.map((_, index) => (
                <td key={`room-1-1-${index}`} className="border border-gray-300 px-4 py-2 text-center"></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResortSchedules
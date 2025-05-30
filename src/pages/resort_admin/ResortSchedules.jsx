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
                  {day}
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
            {Array.from({ length: 20 }, (_, roomIndex) => {
              let cols = 15;
              const cells = [];
              const maxSpan = 7;
              let colIndex = 0;

              while (colIndex < cols) {
                const span = Math.min(Math.ceil(Math.random() * maxSpan), cols - colIndex);
                const isBooked = Math.random() < 0.5;

                if (isBooked) {
                  const username = ['alex99', 'lunaX', 'beachBum', 'marco23', 'waveRider', 'jenny7', 'sunnyD', 'coralReef', 'zane23', 'amyOcean', 'leoWave', 'karenZ', 'blueTide', 'noahHill', 'surfGirl', 'derekSun', 'islaMoon', 'glenCoast', 'mira99', 'oceanJay'][roomIndex];
                  cells.push(
                    <td
                      key={`room-${roomIndex}-col-${colIndex}`}
                      colSpan={span}
                      className="border border-gray-300 px-4 py-2 text-center bg-blue-500 text-white"
                    >
                      {username}
                    </td>
                  );
                } else {
                  for (let i = 0; i < span; i++) {
                    cells.push(
                      <td
                        key={`room-${roomIndex}-col-${colIndex + i}`}
                        className="border border-gray-300 px-4 py-2 text-center"
                      ></td>
                    );
                  }
                }

                colIndex += span;
              }

              return (
                <tr key={`room-${roomIndex}`}>
                  <th className="border border-gray-300 px-4 py-2 text-left">{`Room ${roomIndex + 1}`}</th>
                  {cells}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResortSchedules
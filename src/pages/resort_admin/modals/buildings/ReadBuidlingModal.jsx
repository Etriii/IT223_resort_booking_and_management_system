// import React from 'react'

// const ReadBuildingModal = ({ data }) => {
//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="block mb-1 font-medium">Building Name</label>
//         <input
//           type="text"
//           value={data?.name}
//           readOnly
//           className="w-full border p-2 rounded bg-gray-100"
//         />
//       </div>
//       <div>
//         <label className="block mb-1 font-medium">Number of Floors</label>
//         <input
//           type="number"
//           value={data?.floor_count}
//           readOnly
//           className="w-full border p-2 rounded bg-gray-100"
//         />
//       </div>
//       <div>
//         <label className="block mb-1 font-medium">Rooms per Floor</label>
//         <input
//           type="number"
//           value={data?.room_per_floor}
//           readOnly
//           className="w-full border p-2 rounded bg-gray-100"
//         />
//       </div>
//       <div>
//         <label className="block mb-1 font-medium">Image</label>
//         <img
//           src={data?.image}
//           alt="Building"
//           className="w-72 h-64 object-cover rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default ReadBuildingModal;

import React from "react";

const ReadBuildingModal = ({ building }) => {
  if (!building) return null;

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      <div>
        <label className="block mb-1 font-medium">Building Image</label>
        <div className="w-72 h-48 rounded border overflow-hidden">
          {building.image ? (
            <img
              src={building.image}
              alt="Building"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
              No Image Available
            </div>
          )}
        </div>
      </div>

      {/* Read-Only Details */}
      <div>
        <label className="block mb-1 font-medium">Building Name</label>
        <div className="w-full border p-2 rounded bg-gray-100">
          {building.name || "N/A"}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Number of Floors</label>
        <div className="w-full border p-2 rounded bg-gray-100">
          {building.floor_count || "N/A"}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Rooms Per Floor</label>
        <div className="w-full border p-2 rounded bg-gray-100">
          {building.room_per_floor || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default ReadBuildingModal;

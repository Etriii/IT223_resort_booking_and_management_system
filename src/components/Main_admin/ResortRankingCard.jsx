import React from "react";


const ResortRankingCard = () => {
    const rankingData = [
      {
        rank: 1,
        name: "Punta Verde Resort",
        location: "Island Garden City of Samal",
        total: "₱76,056",
      },
      {
        rank: 2,
        name: "Friday Beach Resort",
        location: "Boracay Island, Philippines",
        total: "₱73,056",
      },
    ];

  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-4 tracking-wider">
      <h2 className="text-lg font-semibold mb-4">Resort's Contribution Ranking</h2>

      <div className="grid grid-cols-3 font-semibold text-sm text-gray-700 border-b pb-2 mb-3">
        <div>Ranking</div>
        <div>Resort</div>
        <div className="text-end">Total</div>
      </div>
     <div className="space-y-3">
        {rankingData.map((resort) => (
          <div
            key={resort.rank}
            className="grid grid-cols-3 items-start bg-gray-100 p-2 rounded-lg"
          >
        
            <div className="text-xl font-bold text-yellow-500">{resort.rank}
            </div>

     
            <div>
              <div className="font-semibold">{resort.name}</div>
              <div className="text-sm text-gray-500">{resort.location}</div>
            </div>


            <div className="font-bold text-right">{resort.total}</div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}

export default ResortRankingCard;

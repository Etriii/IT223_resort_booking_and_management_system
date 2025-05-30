import React from 'react'

const RecentProfitCard = () => {
    const profitData = [
        {
          date: "05/10/2024",
          resort: "PUNTAVERDE RESORT",
          customer: "Alex Apar",
          profit: 9000,
        },
        {
          date: "05/19/2024",
          resort: "CANIBAD BEACH RESORT",
          customer: "Aileen Lugs",
          profit: 7900,
        },
        {
          date: "05/15/2024",
          resort: "FRIDAY BEACH RESORT",
          customer: "Jeloy Mark",
          profit: 4000,
        },
        {
          date: "05/09/2024",
          resort: "CANIBAD BEACH RESORT",
          customer: "Jeremaya Joy",
          profit: 8000,
        },
      ];
    
      return (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg  font-semibold mb-4">Recent Profits</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left font-semibold bg-blue-500 text-white border-b">
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-2">Resort</th>
                  <th className="py-2 px-2">Customer Name</th>
                  <th className="py-2 px-2">Profit</th>
                </tr>
              </thead>
              <tbody>
                {profitData.map((entry, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-2">{entry.date}</td>
                    <td className="py-2 px-2 text-blue-600">{entry.resort}</td>
                    <td className="py-2 px-2">{entry.customer}</td>
                    <td className="py-2 px-2 font-semibold">₱{entry.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
    
export default RecentProfitCard
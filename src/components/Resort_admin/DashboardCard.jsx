import React from "react";

const DashboardCards = ({title , value , bg}) => {
    // const cardColor = [
    //   {
    //     bg: "bg-green-500",
    //   },
    //   {
    //     bg: "bg-blue-500",
    //   },
    //   {
    //     bg: "bg-yellow-500",
    //   },
    //   {
    //     bg: "bg-red-500",
    //   },
    // ];
  
    return (
        <>
        {/* {cardColor.map((cardColor ,idx) => ( */}
            <div
              className={`rounded-xl ${bg} text-white p-4 shadow-md`}
            >
              <h2 className="title text-lg text-center tracking-wide font-bold mb-1">{title}</h2>
              <p className="value text-3xl text-center font-bold mb-4">{value}</p>
              <div className="flex justify-between text-sm font-medium">
                <div>
                  <p>Tomorrow</p>
                  <p className="text-white/80 text-center">28</p>
                </div>
                <div>
                  <p>Week</p>
                  <p className="text-white/80 text-center">53</p>
                </div>
                <div>
                  <p>Month</p>
                  <p className="text-white/80 text-center">235</p>
                </div>
              </div>
            </div>

       {/* ))} */}
       </>
    );
  };
  
  export default DashboardCards;
  
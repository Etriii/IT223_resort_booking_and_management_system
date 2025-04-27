import React, { useState, useEffect, useRef } from 'react';
import backgroundImage from "../../../assets/images/home/backgroundaboutus.jpg";
import ambot from "../../../assets/images/home/ambot.jpg";
import gal1 from "../../../assets/images/home/gal1.jpg";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const resorts = [
    {
      image: backgroundImage,
      title: "Friday’s Beach Resort",
      location: "Boracay Island, Philippines",
      description: "Fridays Beach in Boracay Island, Philippines is a resort with boundless opportunities for family adventures, productive meetings, and memorable special events.",
      buttonLink: "#",
    },
    {
      image: ambot,
      title: "Punta Verde Resort",
      location: "Palawan, Philippines",
      description: "Experience paradise like never before with crystal clear waters and white sand beaches.",
      buttonLink: "#",
    },
    {
      image: gal1,
      title: "Sea Eagles",
      location: "Palawan, Philippines",
      description: "Experience paradise like never before with crystal clear waters and white sand beaches.",
      buttonLink: "#",
    },
  ];

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + resorts.length) % resorts.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % resorts.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % resorts.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="w-full px-12 pb-16 relative">
      <div className="relative overflow-hidden">
        {resorts.map((resort, i) => (
          <div
            key={i}
            className={`${i === index ? "block" : "hidden"} transition-all duration-700`}
          >

            {/*left*/}
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-full md:w-7/12 h-[350px] overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                <img
                  src={resort.image}
                  alt={resort.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-5 left-5 bg-black/50 p-4 rounded-md text-white">
                  <h2 className="text-2xl font-bold drop-shadow-lg">{resort.title}</h2>
                  <h5 className="text-md drop-shadow-lg">{resort.location}</h5>
                  <hr className="border-white border-t-2 w-1/2 mt-2" />
                </div>
              </div>

              {/* Right */}
              <div className="w-full md:w-5/12 bg-cyan-800 text-white flex flex-col justify-start items-start p-8 rounded-b-lg md:rounded-r-lg md:rounded-bl-none h-[350px]">
                <h2 className="text-2xl font-bold">{resort.title}</h2>
                <hr className="w-full border-t border-white my-2" />
                <p className="text-lg">{resort.description}</p>
                <a
                  href={resort.buttonLink}
                  className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg no-underline"
                >
                  Visit now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-16 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 pb-4 rounded-full text-5xl"
      >
        &#8249; 
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-16 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 pb-4 rounded-full text-5xl"
      >
        &#8250; 
      </button>
    </div>
  );
}

export default ControlledCarousel;

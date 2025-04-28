import React, { useState, useEffect, useRef } from 'react';

function RoomControlledCarousel({ id }) {  
  const [index, setIndex] = useState(0);
  const [resort, setResort] = useState(null);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    document.title = "Resort Details | Ocean View";
    fetchResortDetails();
  }, [id]);  

  const fetchResortDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api.php?controller=Resorts&action=getResorts&id=${id}`
      );
      const data = await response.json();
      console.log("Resort API response:", data);

      if (Array.isArray(data)) {
        const resortFound = data.find((res) => res.id === parseInt(id));
        setResort(resortFound);
      } else if (data?.name && data?.location) {
        setResort(data);
      } else if (data?.data?.name && data?.data?.location) {
        setResort(data.data);
      } else {
        setError("Failed to load resort details: Invalid data format.");
      }
    } catch (err) {
      setError("Failed to load resort details.");
      console.error(err);
    }
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const resortImages = resort ? [
    resort.image1,
    resort.image1_2,
    resort.image1_3, 
  ] : [];

  return (
    <div className="w-full relative">
      <div className="relative overflow-hidden">
        {resort ? (
          <div className="relative">
            <div
              className={`${index === 0 ? 'block' : 'hidden'} transition-all duration-700`}
            >
              <div className="flex flex-col  md:flex-row items-center rounded-xl bg-black">
                <div className="relative w-full md:w-7/12 h-[250px] overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                  <img
                    src={`/images/resort_images/${resortImages[0]}`}
                    alt="Resort Image 1"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              className={`${index === 1 ? 'block' : 'hidden'} transition-all duration-700`}
            >
              <div className="flex flex-col md:flex-row items-center rounded-xl bg-slate-700">
                <div className="relative w-full md:w-7/12 h-[250px] overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                  <img
                    src={`/images/resort_images/${resortImages[1]}`}
                    alt="Resort Image 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              className={`${index === 2 ? 'block' : 'hidden'} transition-all duration-700`}
            >
              <div className="flex flex-col md:flex-row items-center rounded-xl bg-slate-800">
                <div className="relative w-full md:w-7/12 h-[250px] overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                  <img
                    src={`/images/resort_images/${resortImages[2]}`}
                    alt="Resort Image 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading resort details...</p> 
        )}
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 pb-4 rounded-full text-3xl"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 pb-4 rounded-full text-3xl"
      >
        &#8250;
      </button>
    </div>
  );
}

export default RoomControlledCarousel;

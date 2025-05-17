// hooks/useResortsWithMainImage.js
import { useEffect, useState } from "react";

const CLOUD_NAME = "dpa4l9gxw";

const useResortsMainImage = () => {
  const [resorts, setResorts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api.php?controller=Resorts&action=getResorts");
        const data = await res.json();

        const resortsWithMainImage = data.map((resort) => ({
          ...resort,
           mainImageUrl: resort.main_image
            ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${resort.main_image}`
            : null,
        }));
        
        setResorts(resortsWithMainImage);
      } catch (err) {
        setError(err.message || "Error fetching resorts");
      }
    };

    fetchResorts();
  }, []);

  return { resorts, error };
};

export default useResortsMainImage;

import { useState, useEffect } from "react";

const useFetchResorts = () => {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api.php?controller=Resorts&action=getResorts`);
        const data = await response.json();
        setResorts(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, []);

  return { resorts, loading, error };
};

export default useFetchResorts;

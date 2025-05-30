import React from "react";

import { useState, useEffect } from "react";

const useFetchBuildings = ({setNotify}) => {

    // Error ni ha
    // const [buildings, setBuildings] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // const fetchBuildings = async () => {
    //     try {
    //         const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;
    //         const res = await fetch(
    //             `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortIds&resort_id=${resort_id}`
    //         );
    //         const data = await res.json();
    //         setBuildings(data);
    //         if (data.length > 0) {
    //             setSelectedBuilding(data[0]);
    //             setRoomFormData((prev) => ({ ...prev, building_id: data[0].id }));
    //             fetchRooms(data[0].id);
    //         }
    //     } catch {
    //         setNotify({ type: "error", message: "Failed to fetch buildings" });
    //     } finally {
    //         const timer = setTimeout(() => {
    //             setLoading(false);
    //         }, 500);

    //         return () => clearTimeout(timer);
    //     }
    // };

    // useEffect(() => {
    //     fetchBuildings();
    // }, []);

    return { buildings, setBuildings, loading, error, setError, fetchBuildings };
}

export default useFetchBuildings;

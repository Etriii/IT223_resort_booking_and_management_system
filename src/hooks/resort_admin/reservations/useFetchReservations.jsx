import React, { useEffect, useState } from 'react'

import { apiFetch } from '../../../utils/apiFetch';

const useFetchReservations = ({ resort_id }) => {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservations = async () => {
        try {
            const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;
            const res = await apiFetch(`controller=Bookings&action=getBookingsInRangeOf`
            );
            const data = await res.json();
            setBuildings(data);
            if (data.length > 0) {
                setSelectedBuilding(data[0]);
                setRoomFormData((prev) => ({ ...prev, building_id: data[0].id }));
                fetchRooms(data[0].id);
            }
        } catch {
            setNotify({ type: "error", message: "Failed to fetch Reservations" });
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500);//hawaa rani or bawasi if hawaon ang dugat na loading :>

            return () => clearTimeout(timer);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return { reservations, setReservations, loading, error, setError, fetchReservations };
}

export default useFetchReservations
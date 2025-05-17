import React, { useEffect, useState } from 'react'

import { apiFetch } from '../../../utils/apiFetch';

// const useFetchReservations = ({ resort_id, start_date = , end_date =  }) => {
const useFetchReservations = ({ resort_id, start_date = new Date(Date.now() + 86400000).toISOString().split('T')[0], end_date = new Date(Date.now() + 86400000).toISOString().split('T')[0] }) => {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservations = async () => {
        try {
            const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;
            const res = await apiFetch(`controller=Bookings&action=getBookingsInRangeOf&resort_id=${resort_id}&start_date=${start_date}&end_date=${end_date}`);
            const data = await res.json();
            setReservations(data);
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
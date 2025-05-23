import React, { useEffect, useState } from 'react'

import { apiFetch } from '../../../utils/apiFetch';
import { useFetchUserRoleWithResortId } from '../../../hooks'

// const useFetchReservations = ({ resort_id, start_date = , end_date =  }) => {start_date = new Date(Date.now() + 86400000).toISOString().split('T')[0], end_date = new Date(Date.now() + 86400000).toISOString().split('T')[0]
const useFetchReservations = ({ filters }) => {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservations = async () => {
        try {
            const res = await apiFetch(`controller=Bookings&action=getBookingsInRangeOf&resort_id=${useFetchUserRoleWithResortId()}&start_date=${filters.start_date}&end_date=${filters.end_date}`);
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
        // console.log(filters);
        fetchReservations();
    }, [filters.start_date, filters.end_date]);

    return { reservations, setReservations, loading, error, setError, fetchReservations };
}

export default useFetchReservations
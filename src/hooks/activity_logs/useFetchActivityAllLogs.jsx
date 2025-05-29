import React, { useEffect, useState } from 'react'

import { apiFetch } from '../../utils/apiFetch';

import useFetchUsername from '../utils/useFetchUsername';

const useFetchActivityAllLogs = ({ filters }) => {

    const [activityLogs, setActivityLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchActivityLogs = async () => {
        try {
            const res = await apiFetch(`controller=TriggerLogs&action=getAllLogs&start_date=${filters.start_date}&end_date=${filters.end_date}&table=${filters.table}`);
            const data = await res.json();

            // const updatedData = await Promise.all(
            //     data.map(async (record) => {
            //         if (record.triggered_by === null || record.triggered_by === '') {
            //             return record; // Leave the record unchanged
            //         }
            //         // const username = await useFetchUsername(record.triggered_by);

            //         // return {
            //         //     ...record,
            //         //     triggered_by: username, // Replace ID with username
            //         // };
            //     })
            // );

            setActivityLogs(data);
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
        fetchActivityLogs();
    }, [filters.start_date, filters.end_date, filters.table]);

    return { activityLogs, setActivityLogs, loading, error, setError, fetchActivityLogs };
}

export default useFetchActivityAllLogs
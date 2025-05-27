import React, { useEffect, useState } from 'react'

import { apiFetch } from '../../utils/apiFetch';

const useFetchRoomById = (room_id) => {

    const [room, setRoom] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRoom = async () => {
        try {
            const res = await apiFetch(`controller=Rooms&action=getRoomById&id=${room_id}`);
            const data = await res.json();
            setRoom(data);
            // console.log(data);
        } catch {
            setNotify({ type: "error", message: "Failed to fetch Room" });
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500);//hawaa rani or bawasi if hawaon ang dugat na loading :>

            return () => clearTimeout(timer);
        }
    };

    useEffect(() => {
        fetchRoom();
    }, []);

    return { room, setRoom, loading, error, setError, fetchRoom };
}

export default useFetchRoomById
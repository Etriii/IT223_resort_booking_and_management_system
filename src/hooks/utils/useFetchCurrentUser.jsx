import React, { useEffect, useState } from 'react'

import { apiFetch } from '../../utils/apiFetch';

const useFetchCurrentUser = () => {

    const user_id = JSON.parse(localStorage.getItem("user_id"));

    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const res = await apiFetch(`controller=User&action=getUserById&id=${user_id}`);
            const data = await res.json();
            setCurrentUser(data);
        } catch (err) {
            console.error("Failed to fetch current user", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return { currentUser, loading };
}

export default useFetchCurrentUser
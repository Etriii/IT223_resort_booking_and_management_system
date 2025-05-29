import { useState, useEffect } from "react";
import { apiFetch } from '../../utils/apiFetch';

const useFetchAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllUsers = async () => {
        try {
            const response = await apiFetch(`controller=User&action=getAllUsers`);
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message || "Something went wrong n Fetching all users!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return { users, setUsers, loading, error, fetchAllUsers };
};

export default useFetchAllUsers; 

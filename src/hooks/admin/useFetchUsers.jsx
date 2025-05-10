import { useState, useEffect } from "react";

const useFetchUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api.php?controller=User&action=getAllUsers`);
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error, fetchUsers };
};

export default useFetchUsers; 

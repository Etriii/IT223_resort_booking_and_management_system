import { useState, useEffect } from "react";

const useFetchUsersWithRoles = (resort_id) => {

    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdmins = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api.php?controller=Resorts&action=getResortAdminsByResortId&resort_id=${resort_id}`);
            const data = await response.json();
            setAdmins(data);
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
        fetchAdmins();
    }, []);

    return { admins, loading, error, fetchAdmins };
};

export default useFetchUsersWithRoles; 

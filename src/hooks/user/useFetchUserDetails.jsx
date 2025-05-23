import { useState, useEffect } from "react";
import { apiFetch } from '../../utils/apiFetch';

const useFetchUserDetails = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserDetails = async () => {
        try {
            const response = await apiFetch(`controller=User&action=getUserDetails&user_id=4`);
            const data = await response.json();
            setUserDetails(data);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return { userDetails, setUserDetails, loading, error, fetchUserDetails };
};

export default useFetchUserDetails; 

import React, { useEffect, useState } from 'react'

import { apiFetch } from '../../../utils/apiFetch';

import { useFetchCurrentUser } from '../../';

const useFetchUserBookmarks = () => {

    const { currentUser, loading: userLoading } = useFetchCurrentUser();

    const [bookmarkedResorts, setBookmarkedResorts] = useState([]);
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchBookmarkedResorts = async () => {
        try {
            const res = await apiFetch(`controller=Bookmarks&action=getBookmarksByUserId&user_id=${currentUser['id']}`);
            const data = await res.json();
            setBookmarkedResorts(data);
        } catch {
            setNotify({ type: "error", message: "Failed to fetch bookmarks" });
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500);//hawaa rani or bawasi if hawaon ang dugat na loading :>

            return () => clearTimeout(timer);
        }
    };

    useEffect(() => {
        if (!userLoading && currentUser?.id) {
            fetchBookmarkedResorts();
        }
    }, [userLoading, currentUser]);

    return { bookmarkedResorts, setBookmarkedResorts, loading, error, setError, fetchBookmarkedResorts };
}

export default useFetchUserBookmarks
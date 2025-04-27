import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const Bookmarks = () => {
    useEffect(() => {
        document.title = "Bookmarks | Ocean View";
    }, []);
    return (
        <>
            User Bookmarks
        </>
    );
}

export default Bookmarks;
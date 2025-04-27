import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const ResortRoomList = () => {
    useEffect(() => {
        document.title = "Resort Room List | Ocean View";
    }, []);
    return (
        <>
            Resort Room List
        </>
    );
}

export default ResortRoomList;
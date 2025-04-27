import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const ResortDetails = () => {
    useEffect(() => {
        document.title = "Resort Details | Ocean View";
    }, []);
    return (
        <>
            ResortDetails
        </>
    );
}

export default ResortDetails;
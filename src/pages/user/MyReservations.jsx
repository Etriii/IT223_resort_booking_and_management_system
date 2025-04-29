import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const MyReservation = () => {
    useEffect(() => {
        document.title = "My Reservations | Ocean View";
    }, []);
    return (
        <>
            My Reservation
        </>
    );
}

export default MyReservation;
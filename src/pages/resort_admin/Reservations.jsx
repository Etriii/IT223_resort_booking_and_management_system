import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";

import { ReservationStat, ReservationTables } from "../../components/Resort_admin";
import { useFetchReservations, useFetchUserRoleWithResortId } from '../../hooks'


const ManageResort = () => {
    useEffect(() => {
        document.title = "Reservations | Ocean View";
    }, []);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 31);
    const formatDate = (date) => date.toISOString().split('T')[0];
    const [filters, setFilters] = useState({ paginate: 5, page: 1, start_date: formatDate(today), end_date: formatDate(tomorrow), status: 'Pending', user_name: '' });

    const { reservations, setReservations, loading, error, setError, fetchReservations } = useFetchReservations({ filters });

    return (
        <div className={`grid lg:grid-cols-[1fr_300px] gap-2`}>
            <ReservationStat reservation_data={{ reservations, setReservations, loading, error, setError, fetchReservations }} />
            <ReservationTables filters_data={[filters, setFilters]} reservation_data={{ reservations, setReservations, loading, error, setError, fetchReservations }} />
        </div>
    );
}

export default ManageResort;
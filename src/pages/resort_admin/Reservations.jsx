import { useEffect } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";

import { ReservationStat, ReservationTables } from "../../components/Resort_admin";

const ManageResort = () => {
    useEffect(() => {
        document.title = "Reservations | Ocean View";
    }, []);
    return (
        <div className={`grid lg:grid-cols-[1fr_300px] gap-2`}>
            <ReservationStat />
            <ReservationTables />
        </div>
    );
}

export default ManageResort;
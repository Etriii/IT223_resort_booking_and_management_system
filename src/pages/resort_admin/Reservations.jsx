import { useEffect } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";

const ManageResort = () => {
    useEffect(() => {
        document.title = "Reservations | Ocean View";
    }, []);
    return (
        <>
            Reservations
        </>
    );
}

export default ManageResort;
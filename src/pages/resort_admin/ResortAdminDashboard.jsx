import { useEffect } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";

const ResortAdminDashboard = () => {
    useEffect(() => {
        document.title = "Dashboard | Ocean View";
    }, []);
    return (
        <>
            Resort Admin Dashboard
        </>
    );
}

export default ResortAdminDashboard;
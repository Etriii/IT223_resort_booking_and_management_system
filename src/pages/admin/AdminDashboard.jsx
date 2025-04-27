// import AdminLayout from "../../layouts/AdminLayout";
import { useEffect } from "react";
const Dashboard = () => {

    useEffect(() => {
        document.title = "Admin Dashboard | Ocean View";
    }, []);

    return (
        <p>Admin Dashboard</p>
    );
}

export default Dashboard;
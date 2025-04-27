import { useEffect } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";

const ManageBuildings = () => {
    useEffect(() => {
        document.title = "Manage Building | Ocean View";
    }, []);
    return (
        <>
            Manage Buildings. 
        </>
    );
}

export default ManageBuildings;
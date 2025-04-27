import { useEffect } from "react";
import AdminLayout from "../../layouts/ResortAdminLayout";

const ManageResort = () => {
    useEffect(() => {
        document.title = "Manage Resort | Ocean View";
    }, []);
    return (
        <>
            Manage Resort Edited Yeheyyy
        </>
    );
}

export default ManageResort;
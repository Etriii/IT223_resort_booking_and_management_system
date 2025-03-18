import { Outlet } from 'react-router-dom'

import AdminHeading from "../components/ui/layout/headings/AdminHeading";
import AdminSideNav from "../components/ui/layout/side_navs/AdminSideNav";

// const AdminLayout = ({ children }) => {
//     return (
//         <div className="flex">
//             <div>
//                 <AdminSideNav />
//             </div>
//             <div>
//                 <AdminHeading />
//                 <main className="p-4">{children}</main>
//             </div>
//         </div>
//     );
// }

const AdminLayout = () => {
    return (
        <div className="flex">
            <AdminSideNav />
            <div className="w-full">
                <AdminHeading />
                <main className="p-4">
                    <Outlet /> {/* This is where page content will be rendered */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
import { Outlet } from 'react-router-dom'

import ResortAdminHeading from "../components/ui/layout/headings/ResortAdminHeading";
import ResortAdminSideNav from "../components/ui/layout/side_navs/ResortAdminSideNav";

const ResortAdminLayout = ({ children }) => {
    return (
        // <div className="flex">
        //     <ResortAdminSideNav />
        //     <div>
        //         <ResortAdminHeading />
        //         <main className="p-4">{children}</main>
        //     </div>
        // </div>
        <div className="flex">
            <ResortAdminSideNav />
            <div className="w-full">
                <ResortAdminHeading />
                <main className="p-4">
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
}

export default ResortAdminLayout;
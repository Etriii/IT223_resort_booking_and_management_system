import { Outlet } from 'react-router-dom'
import { useState } from 'react';

import ResortAdminHeading from "../components/ui/layout/headings/ResortAdminHeading";
import ResortAdminSideNav from "../components/ui/layout/side_navs/ResortAdminSideNav";

const ResortAdminLayout = () => {

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    return (
        // <div className="flex">
        //     <ResortAdminSideNav />
        //     <div>
        //         <ResortAdminHeading />
        //         <main className="p-4">{children}</main>
        //     </div>
        // </div>
        <div className="flex">
            <ResortAdminSideNav isOpen={isSideNavOpen} />
            <div className="w-full">
                <ResortAdminHeading toggleSideNav={() => setIsSideNavOpen(!isSideNavOpen)} isOpen={isSideNavOpen} />
                <main className="p-2">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ResortAdminLayout;
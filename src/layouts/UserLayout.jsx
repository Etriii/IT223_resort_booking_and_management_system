import { Outlet } from 'react-router-dom'

import UserHeading from "../components/ui/layout/headings/UserHeading";
import UserSideNav from "../components/ui/layout/side_navs/UserSideNav";

const UserLayout = ({ children }) => {
    return (
        // <div className="flex">
        //     <UserSideNav />
        //     <div className="w-full">
        //         <UserHeading />
        //         <main className="p-4">{children}</main>
        //     </div>
        // </div>
        <div className="flex">
            {/* <UserSideNav /> */}
            <div className="w-full">
                <UserHeading />
                <main className="p-2 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default UserLayout;
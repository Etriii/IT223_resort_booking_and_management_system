import { NavLink } from "react-router-dom";
const ResortAdminSideNav = () => {
    return (
        <aside className="w-64 border border-gray-500 p-4 h-lvh">
            <h2 className="text-xl font-bold">Resort Admin Menu</h2>
            <br />
            <ul>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/resortadmin">Dashboard</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/resortadmin/manageresort">Manage Resort</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/resortadmin/reservations">Reservations</NavLink>
                </li>
                <li>
                    Audit Logs
                </li>
                <li>
                    Reports & Analytics
                </li>
                <li className="text-red-600">
                    <NavLink to="/oceanview/login">Logout</NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default ResortAdminSideNav;
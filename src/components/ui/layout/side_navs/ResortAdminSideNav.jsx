import { NavLink, useNavigate } from "react-router-dom";
import logout from '../../../../utils/logout'

const ResortAdminSideNav = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        logout(navigate);
    }

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
                    <button type="button" className="text-red-500" onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </aside>
    );
}

export default ResortAdminSideNav;
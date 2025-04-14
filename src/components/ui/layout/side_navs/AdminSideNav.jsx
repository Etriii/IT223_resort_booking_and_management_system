import { NavLink, useNavigate } from "react-router-dom";
import logout from "../../../../utils/logout";

const AdminSideNav = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        logout(navigate);
    }

    return (
        <aside className="w-64 border border-gray-500 p-4 h-lvh ">
            <h2 className="text-xl font-bold">Admin Menu</h2>
            <br />
            <ul>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/admin">Dashboard</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/admin/resorts">Resorts</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/admin/users">Users</NavLink>
                </li>
                <br />
                {/* <li className="text-blue-600">
                    <NavLink to="/oceanview/admin/myaccount">My Account</NavLink>
                </li> */}
                <button className="text-red-600" onClick={handleLogout}>
                    Log Out
                </button>
            </ul>
        </aside>
    );
}

export default AdminSideNav;
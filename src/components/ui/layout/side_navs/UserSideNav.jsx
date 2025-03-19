import { NavLink } from "react-router-dom";

const UserSideNav = () => {
    return (
        <aside className=" h-lvh w-64 border border-gray-500 p-4">
            <h2 className="text-xl font-bold">User Menu</h2>
            <ul>
                <li className="text-blue-600">
                    <NavLink to="/oceanview">OceanView | Home</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/about">About Ocean View</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/termsandprivacy">Terms and Privacy</NavLink>
                </li>
                <br />
                <li className="text-blue-600">
                    <NavLink to="/oceanview/bookmarks">Bookmarks</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/myaccount">My Account</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/myreservations">My Reservations</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/transactionshistory">Transactions History</NavLink>
                </li>
                <br />
                <li className="text-blue-600">
                    <NavLink to="/oceanview/resortdetails">Resort Details</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/resortroomlist">Resort Room List</NavLink>
                </li>
                <li className="text-blue-600">
                    <NavLink to="/oceanview/resortslist">Resorts List</NavLink>
                </li>

                <li className="text-red-600">
                    <NavLink to="/oceanview/login">Logout</NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default UserSideNav;
import { Navigate } from "react-router-dom";

// ProtectedRoute component
const ProtectedRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Simulated auth check

    if (!user) {
        return <Navigate to="/login" replace />; // Redirect if not logged in
    }

    if (role && user.role !== role) {
        return <Navigate to="/unauthorized" replace />; // Redirect if wrong role
    }

    return children;
};

export default ProtectedRoute;
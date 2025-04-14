import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {

    // // mag check if naka assign naba ang user_role sa user then e skip nalang ang query para dele na sig quert usab

    // // then ang user roles i balik pud here e boolean nalang to para magamit for confirmation unsa nga role iya pilion ! not sure diay. didto raman day na sa log in as

    // const [authorized, setAuthorized] = useState(false); // I think e isa nalang nku ni. i all in one nalang nakuu ni sa logas. ipa pili unsa iya na role and resort then store sa local storage

    // const userRole = localStorage.getItem('user_role')[0];

    // const [userRoles, setUserRoles] = useState({});

    // // if multiple roels ma fetch ipa redirect sa loginas

    // useEffect(() => {
    //     const fetchUserRoles = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8000/api.php?controller=UserRoles&action=getUserRoles&user_id=${user_id}`);

    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }

    //             const data = await response.json();

    //             setUserRoles(data);

    //             // e remove nalang ning local storage then here nalang yung condition then e check if naa ba here ang role then ipa proceed if naa
    //             localStorage.setItem('user_roles', JSON.stringify(data));
    //         } catch (error) {
    //             console.error('Error fetching user roles:', error);
    //         }
    //     };

    //     fetchUserRoles();
    // }, []);


    // console.log(userRoles);


    // CANCEL NI TANAN. Lain man day siya kay mo daku imong programmon. Like kunware e access niya ang log in page sag naka log in na. Asa to siya i butang na page? if kunware daghan siyag role. sa resort admin ba or sa main na dashboard a dunno maong langgkaton naalng ni

    const userRole = JSON.parse(localStorage.getItem('user_role')) ?? [{ 'role': 'guest' }];
    if (!userRole || !allowedRoles.includes(userRole[0]['role'])) {
        return <Navigate to="/oceanview/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

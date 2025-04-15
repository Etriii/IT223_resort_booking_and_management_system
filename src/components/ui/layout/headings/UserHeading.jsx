import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../../../../utils/logout";
const UserHeading = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    const navigateToLogInPage = () => {
        navigate('/oceanview/login');
    };

    const handleLogout = () => {
        logout(navigate);
    }

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        setLoggedIn(!!userId);
    }, []);

    return (
        <header className="border border-gray-400 py-3 w-full sticky top-0 bg-white z-10 px-4">
            {loggedIn ?
                <div className="flex justify-between items-center">
                    <h1 className="">User heading Logged In</h1>
                    <button type="button" onClick={handleLogout}>Log Out</button>
                </div>
                :
                <div className="flex justify-between items-center">
                    <h1 className="">User heading Not Logged In</h1>
                    <button type="button" onClick={navigateToLogInPage}>Log In</button>
                </div>
            }
        </header>
    );
}

export default UserHeading;
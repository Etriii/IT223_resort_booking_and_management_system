import { useNavigate } from "react-router-dom";
import logout from '../../utils/logout';
import { useEffect } from "react";
const Unauthorized = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Unauthorized Access";
    }, []);

    const isUnAuthorized = (
        <div className="space-y-2">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative space-x-2"
                role="alert"  >
                <strong className="font-bold">Access Denied!</strong>
                <span className="block sm:inline">
                    You are currently logged in, but your user role does not have permission to access this page. Please{' '}
                    <span onClick={() => logout(navigate)} className="underline cursor-pointer mr-1 font-bold text-red-600"  >
                        log out
                    </span>
                    and sign in with an authorized account.
                </span>
            </div>
            <div>
                Or go to
                <span className=" font-semibold cursor-pointer ml-2" onClick={() => navigate('/oceanview/login')}>
                    Home
                </span>
            </div>
        </div>
    );

    return (
        <div className="flex justify-center items-center h-lvh flex-col text-center space-y-5 p-2">
            <div>
                <h2 className="text-red-600 text-xl">403 - Unauthorized</h2>
                <p>You do not have permission to access this page.</p>
            </div>

            {localStorage.getItem('user_id') ? isUnAuthorized : ''}
        </div>
    );
};

export default Unauthorized;
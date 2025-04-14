import { useNavigate } from "react-router-dom";

const Unauthorized = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex justify-center items-center h-lvh ">
            <div>
                <h2 className="text-red-600 text-xl">403 - Unauthorized</h2>
                <p>You do not have permission to access this page.</p>
                {/* <button onClick={handleBack} className="border border-gray-400 px-2 rounded">Go Back</button> */}
            </div>
        </div>
    );
};

export default Unauthorized;
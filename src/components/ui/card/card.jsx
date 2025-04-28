import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Resorts = () => {
    const navigate = useNavigate();
    const [resorts, setResorts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "Resorts | Ocean View";

        const fetchResorts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api.php?controller=Resorts&action=getResorts`);
                const data = await response.json();
                setResorts(data);
            } catch (error) {
                setError(error.message || 'Something went wrong!');
            }
        };

        fetchResorts();
    }, []);

    return (
        <div>
            <h2 className="pt-10 text-center text-2xl font-semibold">All Resorts</h2>

            {error && (
                <div className="text-center text-red-500 mt-4">
                    {error}
                </div>
            )}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">    
                {resorts && resorts.length > 0 ? (
                    resorts.map((resort, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-xl flex justify-center items-center mb-10"
                            style={{ width: "100%", height: "100%" }}
                        >
                            <div className="relative w-full h-full">
                                <img
                                    src={resort.main_image}
                                    alt={resort.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-black bg-opacity-60 p-6 pl-8 pr-8">
                                    <h1 className="text-white text-xl font-bold">{resort.name}</h1>
                                    <h5 className="text-white text-sm">{resort.location}</h5>
                                    <NavLink
                                         to={`/oceanview/resortdetails/${resort.id}`}
                                        className="mt-3 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full text-sm"
                                    >
                                        Visit now
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">No Resorts Available</div>
                )}
            </div>
        </div>
    );
};

export default Resorts;

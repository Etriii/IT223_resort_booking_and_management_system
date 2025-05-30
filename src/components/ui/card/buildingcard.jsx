import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import backgroundImage from '../../../assets/images/home/backgroundaboutus.jpg';

const ResortBuildings = () => {
    const { id } = useParams();
    const [resort, setResort] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "Resort Buildings List | Ocean View";
        getBuildingsByResortId();
    }, [id]);

    const getBuildingsByResortId = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api.php?controller=Buildings&action=getBuildingsByResortId&resort_id=${id}`
            );
            const data = await response.json();
            console.log("Resort API response:", data);

            if (Array.isArray(data)) {
                setResort(data);
            } else {
                setError("No buildings found or invalid format.");
            }
        } catch (err) {
            setError("Failed to load resort buildings.");
            console.error(err);
        }
    };

    return (
        <div>
            <div id="body" className="px-40">
                <div className="py-4">
                    <h1 className="text-xl font-bold">Choose a building</h1>
                    <hr className="w-full border-t border-black my-2" />

                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                        {resort && resort.length > 0 ? (
                            resort.map((building, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden rounded-xl flex justify-center items-center mb-10"
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={building.image ? building.image : backgroundImage}
                                            alt={building.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-black bg-opacity-70 pb-4 pt-3 pl-4 pr-4">
                                            <h1 className="text-white text-base font-bold text-center">{building.name}</h1>
                                            <NavLink
                                                to={`/oceanview/resortroomlist/${building.id}`}
                                                className="mt-3 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded-full text-base"
                                            >
                                                Choose
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">No Buildings To Display</div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ResortBuildings;

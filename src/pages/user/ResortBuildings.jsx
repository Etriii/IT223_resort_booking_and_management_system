import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserFooter from "../../components/ui/layout/footers/UserFooter.jsx";
import ResortBuildings from "../../components/ui/card/buildingcard.jsx"

const ResortBuilding = () => {
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
                `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&resort_id=${id}`
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
              <ResortBuildings/>
            </div>

            {/* <UserFooter /> */}
        </div>
    );
};

export default ResortBuilding;

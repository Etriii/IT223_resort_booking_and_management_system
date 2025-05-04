import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import backgroundImage from '../../assets/images/home/backgroundaboutus.jpg';

const ResortRoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoomDetails(id);
    }, [id]);
    

    const fetchRoomDetails = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/api.php?controller=Rooms&action=getRoomById&id=${id}`);
            const data = await response.json();

            if (data && data.id) {
                setRoom(data);
                setError(null);
            } else {
                setError("Room not found or invalid data.");
            }
        } catch (err) {
            setError("Failed to load room details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-40 min-h-screen">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                room && (
                    <div className="bg-white rounded-xl border border-neutral-400 overflow-hidden mb-6 h-60">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <img
                                src={room.main_image ? room.room_image : backgroundImage}
                                alt={room.room_name}
                                className="w-full h-full object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{room.room_name}</h2>
                                <hr className="w-full border-t border-neutral-400 my-2" />
                                <p className="text-sm text-gray-600 mt-1">{room.description}</p>
                                <p className="text-xs text-black font-bold mt-2">{room.room_type_name}</p>
                                <p className="text-xs text-black font-bold mt-2">₱ {room.price_per_night}</p>
                                <p className="text-xs text-black font-bold mt-2">Capacity: {room.room_type_capacity}</p>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default ResortRoomDetails;

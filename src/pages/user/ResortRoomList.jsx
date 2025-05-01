import UserLayout from '../../layouts/UserLayout';
import UserFooter from "../../components/ui/layout/footers/UserFooter.jsx";
import { useParams } from 'react-router-dom';
import backgroundImage from '../../assets/images/home/backgroundaboutus.jpg';
import { useState, useEffect } from 'react';
import FilterCard from '../../components/ui/card/roomsfiltercard.jsx';
import RoomDetailModal from '../../components/ui/modals/roomdetails.jsx';
import RoomBookingModal from '../../components/ui/modals/roombooking.jsx';
import { useNavigate } from 'react-router-dom';

const ResortRoomList = () => {
    const { building_id } = useParams();
    const [allRooms, setAllRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        budget: [0, 50000],
        checkInDate: '',
        checkOutDate: '',
        floor: 'All',
        roomNumber: 'All',
        roomType: 'All',
        guests: ''
    });

    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isRoomDetailModalOpen, setIsRoomDetailModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Rooms in Building | Ocean View";
        getRoomsByBuildingId();
    }, [building_id, filters.checkInDate, filters.checkOutDate]);

    useEffect(() => {
        if (allRooms.length > 0) {
            applyFilters();
        }
    }, [filters, allRooms]);

    const getRoomsByBuildingId = async () => {
        try {
            setLoading(true);

            const { checkInDate, checkOutDate } = filters;

            let url = `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&building_id=${building_id}`;

            if (checkInDate && checkOutDate) {
                url += `&start_date=${encodeURIComponent(checkInDate)}&end_date=${encodeURIComponent(checkOutDate)}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            console.log("Rooms API response:", data);

            if (Array.isArray(data)) {
                setAllRooms(data);
                setFilteredRooms(data);
                setError(null);
            } else {
                setError("No rooms found or invalid format.");
            }
        } catch (err) {
            setError("Failed to load rooms.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        const filtered = allRooms.filter(room => {
            const price = parseFloat(room.price_per_night);
            if (price < filters.budget[0] || price > filters.budget[1]) return false;

            if (filters.roomType !== 'All' && room.room_type_name !== filters.roomType) return false;

            if (filters.guests && parseInt(room.room_type_capacity) < parseInt(filters.guests)) return false;

            return true;
        });

        setFilteredRooms(filtered);
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleBudgetChange = (newBudget) => {
        setFilters(prev => ({ ...prev, budget: newBudget }));
    };

    const handleDateChange = (checkIn, checkOut) => {
        setFilters(prev => ({
            ...prev,
            checkInDate: checkIn,
            checkOutDate: checkOut
        }));
    };

    const openRoomDetailModal = (room) => {
        setSelectedRoom(room);
        setIsRoomDetailModalOpen(true);
        setIsBookingModalOpen(false);
    };

    const closeRoomDetailModal = () => {
        setIsRoomDetailModalOpen(false);
    };

    const openBookingModal = (room) => {
        setSelectedRoom(room);
        setIsBookingModalOpen(true);
        setIsRoomDetailModalOpen(false);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
    };

const handleBookNow = (room) => {
    if (localStorage.getItem('user_id')) {
        console.log("Yes po")
        openBookingModal(room);
    } else {
        const confirmLogin = window.confirm("You need to log in to book a room. Do you want to go to the login page?");
        if (confirmLogin) {
            navigate('/oceanview/login');
        }
    }
};
    return (
        <div>
            <div className="px-40 min-h-screen">
                <div className="flex px-10 justify-between items-center pt-6">
                    <div className="flex-1 text-left">
                        <h1 className="text-xl font-bold">
                            {allRooms.length > 0 ? allRooms[0]?.building_name : 'Loading...'}
                        </h1>
                    </div>
                    <div className="flex-1 pl-4">
                        <h1 className="text-lg font-medium">
                            Available Rooms ({filteredRooms.length})
                        </h1>
                    </div>
                    <div className="flex-1" />
                </div>
                <div className="flex gap-8 pt-6">

                    {/* Left */}
                    <div className="w-2/6 sticky top-16 h-fit text-white p-4 rounded">
                        <FilterCard
                            initialBudget={filters.budget}
                            onBudgetChange={handleBudgetChange}
                            onDateChange={handleDateChange}
                            onFiltersChange={handleFiltersChange}
                        />
                    </div>

                    {/* Right */}
                    <div className="w-4/6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        {loading && !error && (
                            <p className="text-gray-600 text-center">Loading rooms...</p>
                        )}

                        {!loading && filteredRooms.length === 0 && !error && (
                            <p className="text-gray-600 text-center">No rooms match your filters. Try adjusting your criteria.</p>
                        )}

                        {filteredRooms.length > 0 && (
                            <div>
                                {filteredRooms.map((room) => (
                                    <div key={room.id} className="bg-white rounded-xl border border-neutral-400 overflow-hidden mb-6 h-60">
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <img
                                                src={room.main_image ? room.room_image : backgroundImage}
                                                alt={room.room_name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="p-4">
                                                <h2 className="text-xl font-semibold text-gray-800">{room.room_name}</h2>
                                                <hr className="w-full border-t border-neutral-400 my-2" />
                                                <div className="flex w-full">
                                                    {/* Left */}
                                                    <div className="w-4/5 pr-4">
                                                        <p className="text-sm text-gray-600 mt-1">{room.description}</p>

                                                        <button
                                                            onClick={() => openRoomDetailModal(room)}
                                                            className="text-blue-600 no-underline py-3 text-sm font-bold inline-block mt-2 hover:text-blue-900"
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>

                                                    {/* Right */}
                                                    <div className="w-1/4 text-end">
                                                        <p className="text-xs text-black font-bold mt-2">{room.room_type_name}</p>
                                                        <hr className="w-full border-t border-neutral-400 my-2" />
                                                        <p className="text-xs text-black font-bold mt-2">₱ {room.price_per_night}</p>
                                                        <p className="text-xs text-black font-bold mt-2">Capacity: {room.room_type_capacity}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleBookNow(room)}
                                                        className="text-white px-8 rounded-lg bg-blue-600 no-underline py-3 text-xs hover:bg-blue-700 font-bold inline-block"
                                                    >
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isRoomDetailModalOpen && (
                                    <RoomDetailModal
                                        room={selectedRoom}
                                        isOpen={isRoomDetailModalOpen}
                                        onClose={closeRoomDetailModal}
                                        onBookNow={openBookingModal}
                                    />
                                )}

                                {isBookingModalOpen && (
                                    <RoomBookingModal
                                        room={selectedRoom}
                                        isOpen={isBookingModalOpen}
                                        onClose={closeBookingModal}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResortRoomList;

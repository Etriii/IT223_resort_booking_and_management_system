import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import backgroundImage from '../../../assets/images/home/backgroundaboutus.jpg';
import { useParams } from 'react-router-dom';
import Payment from '../../../components/ui/modals/paymentbooking.jsx';

const RoomBookingModal = ({
    room,
    isOpen,
    onClose,
    onBookNow,
    parentCheckInDate,
    parentCheckOutDate,
    parentDaysOfStay,
    parentGuests,
    parentFilters,
    parentRoomType,
    parentRoomName,
    taxRate, 
}) => {
    const { building_id } = useParams();
    const [guestDetails, setGuestDetails] = useState(null);
    const [allRooms, setAllRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [checkInDate, setCheckInDate] = useState(parentCheckInDate || '');
    const [checkOutDate, setCheckOutDate] = useState(parentCheckOutDate || '');
    const [daysOfStay, setDaysOfStay] = useState(parentDaysOfStay || 1);
    const [numberOfGuests, setNumberOfGuests] = useState(parentGuests || 1);
    const [selectedRoomType, setSelectedRoomType] = useState(parentRoomType || '');
    const [roomNumber, setRoomName] = useState(parentRoomName || '');

    const [filters, setFilters] = useState(parentFilters || {
        checkInDate: parentCheckInDate || '',
        checkOutDate: parentCheckOutDate || '',
        budget: [0, 10000],
        roomType: 'All',
        guests: parentGuests || 1
    });

    const [resortId, setResortId] = useState(null);
    const [resortEvents, setResortEvents] = useState([]);
    const [eventDiscountRate, setEventDiscountRate] = useState(0);

    useEffect(() => {
        if (isOpen) {
            getGuestDetails();
            if (building_id) getRoomsByBuildingId();
        }
    }, [isOpen, building_id]);

    useEffect(() => {
        if (parentCheckInDate) setCheckInDate(parentCheckInDate);
        if (parentCheckOutDate) setCheckOutDate(parentCheckOutDate);
        if (parentDaysOfStay) setDaysOfStay(parentDaysOfStay);
        if (parentGuests) setNumberOfGuests(parentGuests);
        if (parentFilters) setFilters(parentFilters);
        if (parentRoomType) setSelectedRoomType(parentRoomType);
        if (parentRoomName) setRoomName(parentRoomName);
    }, [parentCheckInDate, parentCheckOutDate, parentDaysOfStay, parentGuests, parentFilters, parentRoomType, parentRoomName]);

    const getGuestDetails = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            setError("You need to log in to book a room.");
            return;
        }
        try {
            setLoading(true);
            setError(null);

            const url = `http://localhost:8000/api.php?controller=GuestDetails&action=getGuestDetails&user_id=${userId}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data?.length > 0) {
                const guest = data.find(item => item.user_id === parseInt(userId, 10));
                setGuestDetails(guest || null);
                setError(guest ? null : "No guest details found for this user.");
            } else {
                setError(data.message || "Failed to load guest details.");
            }
        } catch (err) {
            setError("Failed to load guest details: " + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getRoomsByBuildingId = async () => {
        try {
            setLoading(true);
            const startDate = parentCheckInDate || filters.checkInDate;
            const endDate = parentCheckOutDate || filters.checkOutDate;

            let url = `http://localhost:8000/api.php?controller=Rooms&action=getRoomsByBuildingId&building_id=${building_id}`;
            if (startDate && endDate) url += `&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`;

            const response = await fetch(url);
            const data = await response.json();
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

    useEffect(() => {
        const fetchResortAndEvents = async () => {
            if (!building_id) return;

            try {
                const resortRes = await fetch(`http://localhost:8000/api.php?controller=Buildings&action=getBuildingById&building_id=${building_id}`);
                const resortData = await resortRes.json();

                if (!resortData || !resortData.resort_id) {
                    console.error("No resort ID found for building:", resortData);
                    setResortId(null);
                    setResortEvents([]);
                    setEventDiscountRate(0);
                    return;
                }

                const resId = resortData.resort_id;
                setResortId(resId);

                const eventsRes = await fetch(`http://localhost:8000/api.php?controller=Events&action=getEventByResortId&resort_id=${resId}`);
                const eventsData = await eventsRes.json();

                if (Array.isArray(eventsData)) {
                    setResortEvents(eventsData);
                } else {
                    setResortEvents([]);
                }
            } catch (err) {
                console.error("Error fetching resort/events:", err);
                setResortEvents([]);
                setEventDiscountRate(0);
            }
        };

        if (isOpen) {
            fetchResortAndEvents();
        } else {
            setResortEvents([]);
            setEventDiscountRate(0);
        }
    }, [isOpen, building_id]);

    useEffect(() => {
        if (!checkInDate || !checkOutDate || resortEvents.length === 0) {
            setEventDiscountRate(0);
            return;
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const matchingEvent = resortEvents.find(event => {
            const eventStart = new Date(event.start_date);
            const eventEnd = new Date(event.end_date);

            return (checkIn <= eventEnd) && (checkOut >= eventStart);
        });

        if (matchingEvent && matchingEvent.discount_rate) {
            setEventDiscountRate(parseFloat(matchingEvent.discount_rate));
        } else {
            setEventDiscountRate(0);
        }
    }, [checkInDate, checkOutDate, resortEvents]);

    const roomSubtotal = room?.price_per_night ? room.price_per_night * daysOfStay : 0;

    const discountedSubtotal = roomSubtotal * (1 - eventDiscountRate / 100);

    const totalTaxes = discountedSubtotal + (discountedSubtotal * (taxRate / 100));
    const totalBillWithTax = discountedSubtotal + totalTaxes;

const handleBookNow = async () => {
    try {
        const currentUserId = localStorage.getItem('user_id');

        const now = new Date().toISOString().slice(0, 19).replace('T', ' '); 

        const payload = {
            user_id: currentUserId,
            room_id: room.id,
            check_in: checkInDate,
            check_out: checkOutDate,
            price_per_night: parseFloat(room.price_per_night),
            nights: daysOfStay,
            discount: eventDiscountRate,
            tax_rate: taxRate,
            sub_total: roomSubtotal,                 
            total_amount: totalBillWithTax,      
            status: 'Pending',
            created_at: now,
            updated_at: now,
        };

        console.log("Frontend JSON Payload:", payload);

        const response = await fetch('http://localhost:8000/api.php?controller=Bookings&action=createBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), 
        });

        const data = await response.json();

        if (data.success) {
            alert('Booking confirmed!');
            onClose();
        } else {
            alert(`Booking failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Booking error:', error);
        alert('An error occurred while booking.');
    }
};



return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'flex' : 'hidden'} bg-black/50 overflow-auto`}>
        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-lg w-full max-w-[80vw] max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="bg-white rounded-xl py-6 px-12 overflow-hidden flex flex-col h-full">
                <div className="flex flex-col md:flex-row gap-12 flex-grow overflow-y-auto">
                    <div className="w-full md:w-1/2 flex flex-col order-2 md:order-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 text-start">Guest Details</h4>
                        <hr className="w-full border-t border-neutral-300 my-2" />
                        {loading && <p className="text-gray-700 text-sm italic">Loading guest details...</p>}
                        {error && <p className="text-red-500 text-sm italic">{error}</p>}

                        {!loading && !error && guestDetails && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {['first_name', 'middle_name', 'sur_name', 'phone_number'].map((field) => (
                                    <div key={field}>
                                        <label htmlFor={field} className="block text-gray-700 text-xs font-bold mb-2">{field.replace('_', ' ').toUpperCase()}</label>
                                        <input
                                            type="text"
                                            id={field}
                                            value={guestDetails[field] ?? 'N/A'}
                                            readOnly
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <h2 className="text-lg font-semibold text-gray-800 my-4">Booking Preference</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
                            <div>
                                <label htmlFor="check-in" className="block text-gray-700 text-xs font-bold mb-2">CHECK-IN</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="check-in"
                                        value={checkInDate}
                                        readOnly
                                        placeholder="DD/MM/YYYY"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="check-out" className="block text-gray-700 text-xs font-bold mb-2">CHECK-OUT</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="check-out"
                                        value={checkOutDate}
                                        readOnly
                                        placeholder="DD/MM/YYYY"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="days-of-stay" className="block text-gray-700 text-xs font-bold mb-2">DAYS OF STAY</label>
                                <input
                                    id="days-of-stay"
                                    type="number"
                                    value={daysOfStay}
                                    readOnly
                                    onChange={(e) => setDaysOfStay(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div>
                                <label htmlFor="number-of-guests" className="block text-gray-700 text-xs font-bold mb-2">
                                    NUMBER OF GUESTS
                                </label>
                                <input
                                    type="text"
                                    id="number-of-guests"
                                    value={numberOfGuests}
                                    readOnly
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight cursor-not-allowed"
                                />
                            </div>

                        </div>
                        <div className="mb-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="room-type-1" className="block text-gray-700 text-xs font-bold mb-2">ROOM TYPE</label>
                                    <input
                                        type="text"
                                        id="room-type-1"
                                        value={selectedRoomType}
                                        readOnly
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="room-type-2" className="block text-gray-700 text-xs font-bold mb-2">FLOOR NUMBER</label>
                                    <input
                                        type="text"
                                        id="room-name"
                                        value={roomNumber || ''}
                                        readOnly
                                        onChange={(e) => setRoomName(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="w-full md:w-2/2 flex flex-col order-1 md:order-2">
                        <div className="w-full h-[22rem]">
                            <img
                                src={room?.image || backgroundImage}
                                alt={room?.room_name}
                                className="w-full h-full object-cover rounded-xl mx-auto"
                            />
                        </div>

                        <h4 className="text-base font-semibold text-center text-gray-900 mt-4">{room?.room_name}</h4>
                        <div className="flex items-center my-2 w-full justify-center">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="mx-4 text-2xl font-semibold text-gray-900 whitespace-nowrap">{room?.resort_name || ""}</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        <span className="text-start">
                            <h5 className="text-lg font-semibold text-gray-900 mb-2 text-start">{room?.building_name}</h5>
                            <p className="text-gray-700 mt-2 text-sm text-start">{room?.description || 'No description available.'}</p>
                            <hr className="w-full border-t border-neutral-300 my-3" />
                            <p className="text-sm text-gray-900 mt-2 text-start">Room Type: {room?.room_type_name}</p>
                            <p className="text-sm text-gray-900 mt-2 text-start">
                                Price: ₱{(parseFloat(room?.price_per_night) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-gray-900 mt-2 text-start">Capacity: {room?.room_type_capacity}</p>
                            <p className="text-lg font-medium text-gray-900 mt-3 text-start">Amenities</p>
                            <p className="text-sm text-gray-900 mt-2 text-start">{room?.amenities ?? 'No Amenities Listed'}</p>
                            <hr className="w-full border-t border-neutral-300 my-3" />
                            <p className="text-lg font-medium text-gray-900 mt-3 text-start">Booking Invoice</p>
                            <p className="text-base text-gray-700 mt-2 text-start font-base">
                                Subtotal:
                                <span className="font-bold"> ₱{roomSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </p>
                            {eventDiscountRate > 0 && (
                                <>
                                    <p className="text-sm text-green-700 mt-2 text-start font-semibold">
                                        Event Discount: {eventDiscountRate}%
                                    </p>
                                    <p className="text-base text-gray-700 mt-2 text-start font-base">
                                        Subtotal after discount:
                                        <span className="font-bold"> ₱{discountedSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </p>
                                </>
                            )}
                            <p className="text-sm text-gray-900 mt-2 text-start">
                                Resort Taxes ({taxRate}%): ₱{totalTaxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-xl text-gray-700 mt-2 text-start font-bold">
                                Total: ₱{totalBillWithTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </span>


                    </div>

                </div>

                <div className="flex justify-between mt-12">
                    <button
                        onClick={onClose}
                        className="text-white bg-neutral-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-700 transition-all duration-300 ease-in-out"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleBookNow}
                        className="text-white px-4 rounded-lg bg-blue-600 no-underline py-2 text-sm hover:bg-blue-700 font-bold whitespace-nowrap"
                    >
                        Confirm Payment
                    </button>

                </div>
            </div>
        </div>
    </div>
);
};

export default RoomBookingModal;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const MyReservation = () => {
    // State variables
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchReservations = async () => { 
            const currentUserId = localStorage.getItem('user_id');

            if (!currentUserId) {
                setError("You must be logged in to view your reservations.");
                setLoading(false);
                navigate('/login'); 
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`http://localhost:8000/api.php?controller=BookingDetails&action=getBookingDetails&user_id=${currentUserId}`);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Server error' }));
                    throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
                }

                const data = await response.json();
                console.log("Fetched User Reservations:", data);

                if (Array.isArray(data)) {
                    setReservations(data);
                } else {
                    setError("Expected an array of reservations, but received different format.");
                    setReserved(false); 
                    setReservations([]);
                }
            } catch (err) {
                console.error("Failed to fetch reservations:", err);
                setError(`Failed to load reservations: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [navigate]); 
                   
                  

    return (
    
            <div className="container mx-auto p-6 md:p-10 bg-white shadow-lg rounded-xl my-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">My Hotel Reservations</h1>
                <div className="space-y-6">
                    {reservations.map((reservation) => (
                        <div key={reservation.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <h3 className="text-2xl font-bold text-blue-700">Booking ID: #{reservation.booking_id}</h3>
                                <span className={`text-lg font-semibold px-4 py-1 rounded-full
                                    ${reservation.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                    reservation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    reservation.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'}`}>
                                    Status: {reservation.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                                <div>
                                    <p className="font-semibold">Room:</p>
                                    <p>{reservation.room_name} ({reservation.room_type_name})</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Check-in:</p>
                                    <p>{new Date(reservation.check_in).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Check-out:</p>
                                    <p>{new Date(reservation.check_out).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Nights:</p>
                                    <p>{reservation.nights}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Price per Night:</p>
                                    <p>₱{parseFloat(reservation.price_per_night).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Subtotal:</p>
                                    <p>₱{parseFloat(reservation.room_subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Discount:</p>
                                    <p>₱{parseFloat(reservation.discount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Tax:</p>
                                    <p>₱{parseFloat(reservation.tax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                        Total: ₱{parseFloat(reservation.final_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 text-right">Booked On: {new Date(reservation.created_at).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>

    );
};
};

export default MyReservation;

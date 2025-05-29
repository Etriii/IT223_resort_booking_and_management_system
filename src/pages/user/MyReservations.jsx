import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationItem from '../../components/User/ReservationItem.jsx';
import PaymentModal from '../../components/ui/modals/paymentbooking.jsx';

const MyReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(reservations.length / itemsPerPage);
    const paginatedReservations = reservations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const openPaymentModal = (reservation) => {
        setSelectedBooking(reservation);
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        fetchReservations();
        setShowPaymentModal(false);
    };
    

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
                setReservations([]);
            }
        } catch (err) {
            console.error("Failed to fetch reservations:", err);
            setError(`Failed to load reservations: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [navigate]);

    if (loading) {
        return <div className="text-center py-8">Loading reservations...</div>;
    }

    if (err) {
        return <div className="text-center py-8 text-red-600">Error: {err}</div>;
    }

    if (!reservations || reservations.length === 0) {
        return <div className="text-center py-8">No reservations found.</div>;
    }

    return (
        <div className="rounded-2xl border border-gray-300 shadow-lg pb-10 bg-white max-w-full overflow-x-auto">
            <div className="px-8 py-6 border-gray-300 rounded-t-2xl bg-gradient-to-r">
                <h2 className="text-xl text-center font-extrabold text-black tracking-wide">
                    My Reservations
                </h2>
            </div>
            <div className="px-40">
                <table className="min-w-full text-center text-gray-700 text-xs divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            {[
                                "Booking ID",
                                "Room",
                                "Room Type",
                                "Check-in",
                                "Check-out",
                                "Nights",
                                "Total",
                                "Created_at",
                                "Status",
                                "Action",
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-4 font-semibold uppercase tracking-wider select-none"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {paginatedReservations.map((reservation) => (
                            <ReservationItem
                                key={reservation.booking_id}
                                reservation={reservation}
                                handlePayment={openPaymentModal}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center items-center gap-2 py-6">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white hover:bg-gray-100'
                            }`}
                    >
                        Previous
                    </button>

                    <span className="text-sm font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-white hover:bg-gray-100'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>

            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                reservation={selectedBooking}
                onPaymentSuccess={handlePaymentSuccess}
                fetchReservations={fetchReservations}
            />
        </div>
    );
};

export default MyReservation;

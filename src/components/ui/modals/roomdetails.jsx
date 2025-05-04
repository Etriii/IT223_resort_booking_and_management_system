import React, { useState } from 'react';
import backgroundImage from '../../../assets/images/home/backgroundaboutus.jpg';
import { useNavigate } from 'react-router-dom';
import Modal from '../../ui/modals/Modal';

const RoomDetailModal = ({ room, isOpen, onClose, onBookNow }) => {
    const navigate = useNavigate();
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleBookNow = async (room) => {
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
            const confirmLogin = window.confirm("You need to log in to book a room. Do you want to go to the login page?");
            if (confirmLogin) {
                navigate('/oceanview/login');
            }
            return;
        }
        
        try {
            setLoading(true);
            
            const response = await fetch(`http://localhost:8000/api.php?controller=GuestDetails&action=getGuestDetails&user_id=${userId}`);
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Guest details response:", data);
            
            let guestArray = data;
            
            if (!Array.isArray(data) && data.data && Array.isArray(data.data)) {
                guestArray = data.data;
            }
            
            if (!Array.isArray(guestArray) && typeof guestArray === 'object') {
                guestArray = [guestArray];
            }
        
            const userIdStr = String(userId);
            const userHasGuestProfile = Array.isArray(guestArray) && 
                guestArray.some(guest => String(guest.user_id) === userIdStr);
            
            console.log("User has guest profile:", userHasGuestProfile);
            console.log("Guest array:", guestArray);
            
            if (!userHasGuestProfile) {
                alert("You need to complete your guest profile before booking. Please update your profile information.");
                // navigate('/oceanview/profile');
                return;
            }
            
            onBookNow(room);
            onClose();
            
        } catch (err) {
            console.error("Error validating guest:", err);
            alert("An error occurred while verifying your information. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'} bg-black/50`}
        >
            <div className="max-w-[50vw] max-h-[90vh] relative">
                <div className="bg-white rounded-xl p-8 border border-neutral-200 overflow-hidden shadow-lg flex flex-col justify-between h-full">
                    <div className="flex p-2 flex-grow">
                        {/* Left */}
                        <div className="flex-1 pr-6">
                            <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                                {room?.room_name || 'Loading...'}
                            </h4>
                            <hr className="w-full border-t border-neutral-300 my-3" />
                            <h5 className="text-xl font-semibold text-gray-900 mb-2">
                                {room?.building_name || 'Building Name'}
                            </h5>
                            <p className="text-gray-700 mt-2 text-base">
                                {room?.description || 'No description available.'}
                            </p>
                            <p className="text-base text-gray-900 mt-4">
                                Room Type: {room?.room_type_name || 'N/A'}
                            </p>
                            <p className="text-base text-gray-900 mt-2">
                                Price: ₱ {room?.price_per_night || '0.00'}
                            </p>
                            <p className="text-base text-gray-900 mt-2">
                                Capacity: {room?.room_type_capacity || 'N/A'}
                            </p>

                            <p className="text-lg font-medium text-gray-900 mt-3">Amenities</p>
                            <p className="text-base text-gray-900 mt-2">{room?.amenities || 'No amenities listed.'}</p>
                        </div>

                        {/* Right */}
                        <div className="flex-shrink-0">
                            <img
                                src={room?.image || backgroundImage}
                                alt={room?.room_name || 'Room Image'}
                                className="w-96 h-fit object-cover rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={onClose}
                            className="text-white bg-neutral-600 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-700 transition-all duration-300 ease-in-out"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => handleBookNow(room)}
                            disabled={loading}
                            className={`text-white px-8 rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} no-underline py-3 text-xs font-bold inline-block transition-all duration-300 ease-in-out`}
                        >
                            {loading ? 'Checking...' : 'Book Now'}
                        </button>
                    </div>
                </div>
            </div>

            {showGuestModal && (
                <Modal
                    isOpen={showGuestModal}
                    onClose={() => setShowGuestModal(false)}
                    variant="information"
                    title="Guest Information"
                >
                    <p>
                        Please provide your personal information to proceed.
                    </p>
                </Modal>
            )}
        </div>
    );
};

export default RoomDetailModal;
import React from 'react';
import backgroundImage from '../../../assets/images/home/backgroundaboutus.jpg';

const RoomBookingModal = ({ room, isOpen, onClose }) => {
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
                                {room?.room_name}
                            </h4>
                            <hr className="w-full border-t border-neutral-300 my-3" />
                            <h5 className="text-xl font-semibold text-gray-900 mb-2">
                                {room?.building_name}
                            </h5>
                            <p className="text-gray-700 mt-2 text-base">
                                {room?.description || 'No description available.'}
                            </p>
                            <p className="text-base text-gray-900 mt-4">
                                Room Type: {room?.room_type_name}
                            </p>
                            <p className="text-base text-gray-900 mt-2">
                                Price: ₱ {room?.price_per_night}
                            </p>
                            <p className="text-base text-gray-900 mt-2">
                                Capacity: {room?.room_type_capacity}
                            </p>

                            <p className="text-lg font-medium text-gray-900 mt-3">Amenities</p>
                            <p className="text-base text-gray-900 mt-2">{room?.amenities}</p>
                        </div>

                        {/* Right */}
                        <div className="flex-shrink-0">
                            <img
                                src={room?.image || backgroundImage}
                                alt={room?.room_name}
                                className="w-96 h-fit object-cover rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Footer buttons */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={onClose}
                            className="text-white bg-neutral-600 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-700 transition-all duration-300 ease-in-out"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => onBookNow?.(room)}
                            className="text-white px-8 rounded-lg bg-blue-600 no-underline py-3 text-sm hover:bg-blue-700 font-bold"
                        >
                            Confirm & Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomBookingModal;

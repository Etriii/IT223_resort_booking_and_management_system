import React, { useState } from 'react';

const GuestProfileModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        sur_name: '',
        suffix: '',
        region: '',
        province: '',
        city: '',
        phone_number: '',
        status: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            alert("User ID not found. Please log in again.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api.php?controller=GuestDetails&action=updateGuestDetails&user_id=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, user_id: userId }),
            });

            const result = await response.json();
            if (response.ok && result.status === 1) {
                alert(result.message || 'Guest details updated successfully');
                onSave(formData);
                onClose();
            } else {
                alert(result.error || 'Failed to update guest details');
            }
        } catch (error) {
            console.error('Error updating guest details:', error);
            alert('An error occurred while updating guest details');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-w-2xl h-[85vh] w-full bg-white rounded-lg shadow-lg px-10 pb-8 pt-7 overflow-y-auto"  style={{ scrollbarWidth: 'none' }}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Guest Profile Information</h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900 font-bold">
                        X
                    </button>
                </div>
                <div className="space-y-4">
                <hr className="w-full border-t border-black my-2" />
                    {Object.entries(formData).map(([key, value]) =>
                        key !== 'status' ? (
                            <div key={key} className="flex flex-col">
                                <label className="text-sm font-medium text-black capitalize">
                                    {key.split('_').join(' ')}
                                </label>
                                <input
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        ) : null
                    )}
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={onClose}
                            className="mr-2 text-gray-600 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestProfileModal;

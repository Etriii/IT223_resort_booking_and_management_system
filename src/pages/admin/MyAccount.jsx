import React, { useState, useEffect } from 'react';
import UpdateMyAccountModal from './modals/UpdateMyAccountModal'; // Adjust path as needed

const MyAccount = () => {
    useEffect(() => {
        document.title = "My Account | Ocean View";
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        username: "Ocean View",
        email: "oceanview.superadmin@gmail.com",
        password: "",
        email_verified_at: "2025-01-01 12:00 PM",
        status: "Active"
    });

    const handleSave = (updatedData) => {
        console.log("Updated Data:", updatedData);
        setUserData({ ...userData, ...updatedData });
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center space-x-6 mb-10">
                <img
                    src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{userData.username}</h3>
                    <p className="text-sm text-gray-500">User ID: 1</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-8">
                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">Email</p>
                    <p>{userData.email}</p>
                </div>

                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">Email Verified At</p>
                    <p>{userData.email_verified_at}</p>
                </div>

                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">Account Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
                        {userData.status}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">Password</p>
                    <p className="italic text-gray-500">••••••••••••</p>
                </div>
            </div>

            {/* Action Button */}
            <div className="text-right">
                <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    Edit Profile
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <UpdateMyAccountModal
                    user={userData}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
        
    );
};

export default MyAccount;

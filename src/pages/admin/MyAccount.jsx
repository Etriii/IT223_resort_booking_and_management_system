// import { useEffect } from 'react';
// const MyAccount = () => {
//     useEffect(() => {
//         document.title = "My Account | Ocean View";
//     }, []);
//     return (
//         <div>MyAccount</div>
//     )
// }

// export default MyAccount

import React from "react";

const MyAccount = () => {
    document.title = "My Account | Ocean View";
    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-md border border-gray-200">

            {/* Profile Info */}
            <div className="flex items-center space-x-6 mb-10">
                <img
                    src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Ocean View</h3>
                    <p className="text-sm text-gray-500">User ID: 1</p>
                </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-8">
                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">Email</p>
                    <p>oceanview.superadmin@gmail.com</p>
                </div>

                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">Email Verified At</p>
                    {/* <p>Dec 24, 2024 - 3:45 PM</p> */}
                </div>

                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">Account Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
                        Active
                    </span>
                </div>

                <div>
                    <p className="text-sm text-green-600 font-medium mb-1">Password</p>
                    <p className="italic text-gray-500">••••••••••••</p>
                </div>
            </div>

            {/* Action Button */}
            <div className="text-right">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default MyAccount;



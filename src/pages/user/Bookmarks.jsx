import React from "react";

import InputField from '../../components/ui/form/InputField';

const bookmarkedResorts = [
    {
        id: 1,
        name: "Ocean Breeze Resort",
        location: "El Nido, Palawan",
        image:
            "https://media-cdn.tripadvisor.com/media/photo-s/28/fd/37/ed/pearl-farm-beach-resort.jpg",
    },
    {
        id: 2,
        name: "Sunset Cove",
        location: "Siargao Island",
        image:
            "https://www.viceroybali.com/wp-content/uploads/2024/03/What-Is-the-Difference-Between-a-Resort-and-a-Hotel-2.png",
    },
    {
        id: 3,
        name: "Coral Sands Resort",
        location: "Boracay, Aklan",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
];

const Bookmarks = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-10">
            <div className={`flex justify-between items-center pb-5`}>
                <h1 className="text-3xl font-bold text-gray-800 ">
                    🌴 Your Bookmarked Resorts
                </h1>
                <div>
                    <InputField className="w-56" placeholder="Resort Name" />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bookmarkedResorts.map((resort) => (
                    <div
                        key={resort.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
                    >
                        <img
                            src={resort.image}
                            alt={resort.name}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {resort.name}
                            </h2>
                            <p className="text-gray-500">{resort.location}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`text-center p-5`}> <span className={`p-2 cursor-pointer hover:text-blue-600 transition-all delay-100`}>See More...</span></div>
        </div>
    );
};

export default Bookmarks;

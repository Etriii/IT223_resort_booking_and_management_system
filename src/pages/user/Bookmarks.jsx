import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import InputField from '../../components/ui/form/InputField';

import { useFetchUserBookmarks } from "../../hooks";

const Bookmarks = () => {

    const navigate = useNavigate();

    const { bookmarkedResorts, setBookmarkedResorts, loading, error, setError, fetchBookmarkedResorts } = useFetchUserBookmarks();

    // FILTERS

    const [filters, setFilters] = useState({ resort_name: '' });

    const filteredBookmarkedResorts = bookmarkedResorts?.filter(bookmarkedResort => {
        const resortNameMatch = !filters.resort_name || bookmarkedResort.name?.toLowerCase().includes(filters.resort_name.toLowerCase());
        return resortNameMatch;
    }) || [];

    const handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFilters(prev => ({ ...prev, [name]: value }));
    }

    const navigate_to = (resort_id) => {
        navigate(`/oceanview/resortdetails/${resort_id}`);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-10">
            {/* {bookmarkedResorts && JSON.stringify(bookmarkedResorts)} */}
            <div className={`flex justify-between items-center pb-5`}>
                <h1 className="text-3xl font-bold text-gray-800 ">
                    🌴 Your Bookmarked Resorts
                </h1>
                <div>
                    <InputField name='resort_name' className="w-56" placeholder="Resort Name" onChange={handleOnChangeInput} />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBookmarkedResorts.length > 0 ? (
                    filteredBookmarkedResorts.map((filteredBookmarkedResrort, index) => (//filteredBookmarkedResorts
                        <div
                            key={filteredBookmarkedResrort.bookmarked_id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl hover:cursor-pointer"
                            onClick={() => { navigate_to(filteredBookmarkedResrort.resort_id) }}
                        >
                            <img
                                src={filteredBookmarkedResrort.main_image ?? 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'}
                                alt={filteredBookmarkedResrort.name}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {filteredBookmarkedResrort.name}
                                </h2>
                                <p className="text-gray-500">{filteredBookmarkedResrort.location}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bookmarkedResorts found.</p>
                )}

            </div>
            <div className={`text-center p-5`}> <span className={`p-2 cursor-pointer hover:text-blue-600 transition-all delay-100`}>See More...</span></div>
        </div>
    );
};

export default Bookmarks;

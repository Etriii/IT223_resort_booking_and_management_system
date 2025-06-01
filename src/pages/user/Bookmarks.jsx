import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/ui/form/InputField";
import { useFetchUserBookmarks } from "../../hooks";
import { getResortById } from "../../utils/cloudinaryapi";

const CLOUD_NAME = "dpa4l9gxw";

const Bookmarks = () => {

    document.title = 'My Bookmarks | Ocean View';

    const navigate = useNavigate();
    const { bookmarkedResorts, loading, error } = useFetchUserBookmarks();

    const [filters, setFilters] = useState({ resort_name: "" });
    const [resortImages, setResortImages] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 10;

    const handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const filteredBookmarkedResorts =
        bookmarkedResorts?.filter((resort) =>
            resort.name?.toLowerCase().includes(filters.resort_name.toLowerCase())
        ) || [];

    const totalPages = Math.ceil(filteredBookmarkedResorts.length / itemsPerPage);
    const paginatedResorts = filteredBookmarkedResorts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const navigateToResort = (resort_id) => {
        navigate(`/oceanview/resortdetails/${resort_id}`);
    };

    useEffect(() => {
        const fetchImages = async () => {
            const imageMap = {};
            for (const resort of bookmarkedResorts || []) {
                if (!resortImages[resort.resort_id]) {
                    try {
                        const res = await getResortById(resort.resort_id);
                        if (res?.success && res.resort?.main_image) {
                            const publicId = res.resort.main_image;
                            const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
                            imageMap[resort.resort_id] = url;
                        }
                    } catch (err) {
                        console.error(`Failed to fetch image for resort ${resort.resort_id}:`, err);
                    }
                }
            }
            if (Object.keys(imageMap).length > 0) {
                setResortImages((prev) => ({ ...prev, ...imageMap }));
            }
        };

        if (bookmarkedResorts?.length > 0) {
            fetchImages();
        }
    }, [bookmarkedResorts, resortImages]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters.resort_name]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-center py-8 text-lg">Loading bookmarked resorts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-center py-8 text-red-600 text-lg">
                    Error loading resorts: {error}
                </p>
            </div>
        );
    }

    if (!bookmarkedResorts || bookmarkedResorts.length === 0) {
        return (
            <div className="min-h-screen bg-white py-10">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-extrabold text-black tracking-wide mb-4">
                            🌴 Your Bookmarked Resorts
                        </h2>
                        <p className="text-gray-600 text-lg">
                            No bookmarked resorts found.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-7xl mx-auto px-8">
                <div className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-2xl font-extrabold text-black tracking-wide">
                        🌴 Your Bookmarked Resorts
                    </h2>
                    <InputField
                        name="resort_name"
                        className="w-full sm:w-80"
                        placeholder="Search Resort Name"
                        onChange={handleOnChangeInput}
                        value={filters.resort_name}
                    />
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {paginatedResorts.length > 0 ? (
                        paginatedResorts.map((resort) => (
                            <div
                                key={resort.bookmarked_id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer overflow-hidden"
                                onClick={() => navigateToResort(resort.resort_id)}
                            >
                                <img
                                    src={
                                        resortImages[resort.resort_id] ||
                                        "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                    }
                                    alt={resort.name || "Resort image"}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-base font-bold text-gray-900 truncate mb-1">
                                        {resort.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {resort.location}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-600 text-lg">
                                No resorts match your search criteria.
                            </p>
                        </div>
                    )}
                </div>

                {filteredBookmarkedResorts.length > 10 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-6 py-2 rounded-lg border transition-colors ${
                                currentPage === 1
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                            }`}
                        >
                            Previous
                        </button>

                        <span className="text-sm font-medium text-gray-700 px-4">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-6 py-2 rounded-lg border transition-colors ${
                                currentPage === totalPages
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
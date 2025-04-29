import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import backgroundImage from "../../assets/images/home/backgroundaboutus.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ControlledCarousel from "../../components/ui/carousel/resortdetailscarousel.jsx";
import RoomControlledCarousel from "../../components/ui/carousel/resortroomcarousel.jsx";
import UserFooter from "../../components/ui/layout/footers/UserFooter.jsx";

const ResortDetails = ({ initialBookmarkStatus }) => {
  const { id } = useParams();
  const [resort, setResort] = useState(null);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkStatus === 1);
  const [bookmarks, setBookmarks] = useState([]);
  const [reviews, setReviews] = useState([]); // Placeholder for reviews state
  const [reviewsAverage, setReviewsAverage] = useState(0); // Placeholder for average reviews
  const [reviewsCount, setReviewsCount] = useState(0); // Placeholder for reviews count
  const [expandedReviews, setExpandedReviews] = useState([]);
  const [newReview, setNewReview] = useState(""); // New review text
  const [formRating, setFormRating] = useState(0); // Rating for new review
  const [guestReview, setGuestReview] = useState(null); // Guest's own review

  useEffect(() => {
    document.title = "Resort Details | Ocean View";
    fetchResortDetails();
    fetchReviews(); // Fetch reviews as well
  }, [id]);

  const fetchResortDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api.php?controller=Resorts&action=getResorts&id=${id}`
      );
      const data = await response.json();
      console.log("Resort API response:", data);

      if (Array.isArray(data)) {
        const resortFound = data.find((res) => res.id === parseInt(id));
        setResort(resortFound);
      } else if (data?.name && data?.location) {
        setResort(data);
      } else if (data?.data?.name && data?.data?.location) {
        setResort(data.data);
      } else {
        setError("Failed to load resort details: Invalid data format.");
      }
    } catch (err) {
      setError("Failed to load resort details.");
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    // Fetch reviews from API or mock data
    const fetchedReviews = []; // Replace with actual API fetch call
    const average = 4.5; // Placeholder rating
    setReviews(fetchedReviews);
    setReviewsAverage(average);
    setReviewsCount(fetchedReviews.length);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      setBookmarks((prevBookmarks) => [...prevBookmarks, id]);
    } else {
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
      );
    }
  };

  const toggleReviewExpansion = (reviewID) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewID)
        ? prev.filter((id) => id !== reviewID)
        : [...prev, reviewID]
    );
  };

  const handleAddReview = () => {
    // Add review logic here
    console.log("Adding new review:", newReview, formRating);
  };

  const handleUpdateReview = () => {
    // Update review logic here
    console.log("Updating review:", newReview, formRating);
  };

  const handleDeleteReview = () => {
    // Delete review logic here
    console.log("Deleting review");
  };

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  if (!resort) {
    return (
      <div className="text-center mt-20 text-gray-700">
        Loading resort details...
      </div>
    );
  }

  return (
    <div>
      <div id="body" className="px-40">
        <div
          className="bg-cover bg-no-repeat bg-center h-[45vh] relative rounded-xl"
          style={{
            backgroundImage: `url(${resort.main_image || backgroundImage})`,
          }}
        >
          <div className="absolute inset-y-20 inset-x-64 flex items-center justify-center text-center bg-black/70 rounded-xl">
            <div className="resort p-3">
              <h1 className="text-white text-4xl font-bold border-b-2 border-white pb-2">
                {resort.name || "Resort Name Not Available"}
              </h1>
              <h3 className="text-white text-2xl">
                {resort.location || "Location Not Available"}
              </h3>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="col-span-12 md:col-span-10 md:mx-auto">
            <div className="flex items-center gap-2 text-sm uppercase">
              <NavLink
                to="/oceanview/"
                className="text-black hover:text-blue-600 no-underline"
              >
                Home
              </NavLink>
              <span>/</span>
              <NavLink
                to="/oceanview/resortslist"
                className="text-black hover:text-blue-600 no-underline"
              >
                Resorts
              </NavLink>
              <span>/</span>
              <span className="text-gray-500">{resort.name}</span>
            </div>
            <hr className="my-4" />
          </div>
        </div>

        <div className="container mx-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="beachname text-2xl font-bold">{resort.name}</h1>
                <button
                  className="focus:outline-none"
                  onClick={handleBookmarkToggle}
                  style={{
                    marginRight: "-24%",
                    marginBottom: "-2%",
                  }}
                >
                  {isBookmarked ? (
                    <FaHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            {/* Left */}
            <div className="w-2/3 pr-8    ">
              <ControlledCarousel id={id} />
              <div className="grid grid-cols-2 gap-6 mt-1">
                <img
                  src={`/images/resort_images/${
                    resort.image2 || "default.jpg"
                  }`}
                  alt="Room Image 2"
                  className="h-[16rem] w-50"
                  style={{ backgroundColor: "gray", borderRadius: "8px" }}
                />
                <img
                  src={`/images/resort_images/${
                    resort.image3 || "default.jpg"
                  }`}
                  alt="Room Image 3"
                  className="h-auto w-50"
                  style={{ backgroundColor: "gray", borderRadius: "8px" }}
                />
              </div>

              <div className="mt-8 text-sm" style={{ letterSpacing: "1px" }}>
                <p>{resort.resort_description}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-1">Amenities</h3>
                <div className="container">
                  {resort.amenities && (
                    <ul className="list-styled grid grid-cols-1 sm:grid-cols-2">
                      {resort.amenities.split(",").map((amenity, index) => {
                        const amenityData = amenity.split("/");
                        const amenityName = amenityData[0];
                        const amenityList = amenityData[1]?.split(",") || [];

                        return (
                          <div key={index} className="mt-3">
                            <strong className="block">{amenityName}</strong>
                            {amenityList.map((item, i) => (
                              <li key={i} className="mt-1">
                                {item}
                              </li>
                            ))}
                          </div>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="w-2/6 pl-4">
              <h1 className="beachname text-xl font-bold">Location</h1>
              <div>
                {/* icon diri */}
                <p className="beachlocation">{resort.location}</p>
              </div>
              <div className="w-full">
                <iframe
                  src={resort.location_coordinates}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="mb-4 rounded-lg"
                ></iframe>
              </div>

              <h3 className="text-xl font-bold mt-8">Rooms</h3>
              <RoomControlledCarousel id={id} />
              <div
                className="mt-6 pl-1 text-sm"
                style={{ letterSpacing: "1px" }}
              >
                <p className="text-black py-2 mb-8">
                  {resort.room_description}
                </p>
              </div>

              <NavLink
                to="/oceanview/resortslist"
                className="text-black border-2 border-black hover:text-white hover:bg-blue-500 hover:border-none no-underline font-bold p-4 flex justify-center rounded-full"
              >
                View All Rooms
              </NavLink>
            </div>
          </div>

          <div className="resortevents pt-9 mb-6">
            <hr className="w-full border-t border-black my-2" />
            <h1 className="text-black text-2xl font-bold pb-4">Events</h1>

            <div className="grid grid-cols-1 md:grid-cols-10 gap-12">
              {/* Left  */}
              <div className="md:col-span-7 w-full">
                <h6 className="text-black text-xl font-bold pb-2 ">
                  Event Title
                </h6>
                <p className="text-black text-[14px] pb-3">Event Description</p>
                <img
                  src={`/images/resort_images/${
                    resort.image2 || "default.jpg"
                  }`}
                  alt="Event Image"
                  className="h-[20rem] w-full object-cover rounded-lg"
                  style={{ backgroundColor: "gray" }}
                />
              </div>

              {/* Right */}
              <div className="md:col-span-3 w-full">
                <img
                  src={`/images/resort_images/${
                    resort.image2 || "default.jpg"
                  }`}
                  alt="Event Image"
                  className="h-[24rem] w-full object-cover rounded-lg"
                  style={{ backgroundColor: "gray" }}
                />
              </div>
            </div>
          </div>








          <div className="mt-32 mb-40">
            <NavLink
              to="/oceanview/resortslist"
              className="text-white bg-blue-500 hover:bg-blue-700  no-underline font-bold p-5 flex justify-center rounded-full mx-40"
            >
              Book Now
            </NavLink>
          </div>










          <hr className="w-full border-t border-black my-2" />
          <h3 className="text-2xl font-bold pb-4">Reviews</h3>
          <div>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <p>{review.text}</p>
                  <button onClick={() => toggleReviewExpansion(review.id)}>
                    {expandedReviews.includes(review.id)
                      ? "Collapse"
                      : "Expand"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default ResortDetails;

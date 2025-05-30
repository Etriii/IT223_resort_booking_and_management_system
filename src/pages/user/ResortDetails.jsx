import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import backgroundImage from "../../assets/images/home/backgroundaboutus.jpg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ControlledCarousel from "../../components/ui/carousel/resortdetailscarousel.jsx";
import RoomControlledCarousel from "../../components/ui/carousel/resortroomcarousel.jsx";
import UserFooter from "../../components/ui/layout/footers/UserFooter.jsx";
import useFetchImages from "../../hooks/cloudinary/useFetchImagesById.jsx";

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
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mainimage] = useFetchImages(id, "main_image");
  const [image2] = useFetchImages(id, "image2");
  const [image3] = useFetchImages(id, "image3");

  useEffect(() => {
    document.title = "Resort Details | Ocean View";
    fetchResortDetails();
    fetchReviews(); // Fetch reviews as well
  }, [id]);

  const fetchResortDetails = async () => {
    try {
      console.log("Fetching resort details for id:", id);
      const response = await fetch(`http://localhost:8000/api.php?controller=Resorts&action=getDetailsByResortId&id=${id}`);
      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        setResort(data.resort);
      } else {
        console.error('Resort not found:', data.message);
        setError("Failed to load resort details: Resort not found.");
      }
    } catch (error) {
      console.error('Failed to fetch resort details:', error);
      setError("Failed to load resort details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    // Fetch reviews from API or mock data
    const fetchedReviews = []; // Replace with actual API fetch call
    const average = 4.5;
    setReviews(fetchedReviews);
    setReviewsAverage(average);
    setReviewsCount(fetchedReviews.length);
  };

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await fetch(`http://localhost:8000/api.php?controller=Bookmarks&action=getBookmarksByUserId&user_id=${userId}`);
        const data = await response.json();

        console.log("Bookmark fetch response:", data);

        if (!Array.isArray(data)) {
          console.error("Expected an array but got:", data);
          return;
        }

        if (resort && resort.id) {
          const bookmarked = data.some(bookmark => bookmark.resort_id === resort.id);
          setIsBookmarked(bookmarked);
        }
      } catch (error) {
        console.error('Failed to check bookmark status', error);
      }
    };

    checkBookmark();
  }, [resort]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api.php?controller=Events&action=getEventByResortId&resort_id=${resort.id}`);
        const data = await response.json();
        setEvent(data);
        console.log('events', data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      }
    };

    if (resort?.id) {
      fetchEvent();
    }
  }, [resort?.id]);

  const handleBookmarkToggle = async () => {
    const user_id = localStorage.getItem('user_id');
    const resort_id = resort.id;

    const url = isBookmarked
      ? 'http://localhost:8000/api.php?controller=Bookmarks&action=removeBookmark'
      : 'http://localhost:8000/api.php?controller=Bookmarks&action=addBookmark';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, resort_id }),
      });

      const data = await response.json();
      console.log('Bookmark toggle response:', data);

      if (data.success) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (error) {
      console.error('Bookmark toggle failed:', error);
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

  const formatDateLong = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  if (loading) return <p>Loading...</p>;

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
            backgroundImage: `url(${mainimage})`,
          }}
        >
          <div className="absolute inset-y-20 inset-x-96 flex items-center justify-center text-center bg-black/60 rounded-xl">
            <div className="resort p-3">
              <h1 className="text-white text-2xl font-bold border-b-2 border-white pb-2">
                {resort.name || "Resort Name Not Available"}
              </h1>
              <h3 className="text-white text-base">
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
              <span className="text-gray-500 ">{resort.name}</span>
            </div>
            <hr className="my-4" />
          </div>
        </div>

        <div className="container mx-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="beachname text-xl font-bold">{resort.name}</h1>
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
            <div className="w-2/3 pr-8">
              <ControlledCarousel id={id} />
              {/* images */}
              <div className="grid grid-cols-2 gap-6 mt-1">
                <div className="grid col-1">
                  <img
                    src={image2}
                    alt="Room Image 2"
                    className="h-[16rem] w-100 object-cover"
                    style={{ backgroundColor: "gray", borderRadius: "8px" }}
                  />
                </div>
                <div className="grid col-1">
                  <img
                    src={image3}
                    alt="Room Image 2"
                    className="h-[16rem] w-100 object-cover"
                    style={{ backgroundColor: "gray", borderRadius: "8px" }}
                  />
                </div>
              </div>

              <div className="mt-8 text-md tracking-wider">
                <p>{resort.resort_description}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-5">Amenities</h3>
                <div className="container">
                  {resort.amenities && resort.amenities.trim() !== '' ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-700 text-sm">
                      {resort.amenities
                        .split(',')
                        .map((amenity, index) => (
                          <li key={index} className="capitalize">{amenity.trim()}</li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No amenities available for this resort.</p>
                  )}
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="w-2/6 pl-4">
              <h1 className="beachname text-xl font-bold tracking-wider font-cantarell">Location</h1>
              <div>
                {/* icon diri */}
                <p className="beachlocation pb-2 text-sm">{resort.location}</p>
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

              <h3 className="text-xl tracking-wider font-bold mt-8 font-cantarell">Rooms</h3>
              <RoomControlledCarousel id={id} />
              <div className="mt-6 pl-1 text-md tracking-wider">
                <p className="text-black py-2 mb-8">
                  {resort.room_description}
                </p>
              </div>

              <NavLink
                to={`/oceanview/resortbuildings/${resort.id}`}
                className="text-black border-2 border-black hover:text-white hover:bg-blue-500 hover:border-none no-underline font-bold p-3 flex justify-center rounded-full"
              >
                View All Rooms
              </NavLink>
            </div>
          </div>

          <div className="resortevents pt-9 mb-6">
            <hr className="w-full border-t border-black my-2" />
            <h1 className="text-black text-xl font-bold pb-4">Events</h1>

            {event?.id ? (
              <div className="grid grid-cols-1 md:grid-cols-10 gap-12">
                {/* Left */}
                <div className="md:col-span-7 w-full">
                  <h6 className="text-black text-[1.18rem] font-bold pb-2">
                    {event?.name || "No Event Name"}
                  </h6>
                  <p className="text-black text-base pb-3">
                    {event?.description || "No Description"}
                  </p>
                </div>

                {/* Right */}
                <div className="md:col-span-3 w-full">
                  <p className="text-green-800 text-base">Starting at: <strong>{formatDateLong(event.start_date)}</strong></p>
                  <p className="text-red-800 text-base">Ends at: <strong>{formatDateLong(event.end_date)}</strong></p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No events</p>
            )}
          </div>

          <div className="mt-32 mb-40">
            <NavLink
              to={`/oceanview/resortbuildings/${resort.id}`}
              className="text-white bg-blue-500 hover:bg-blue-700 no-underline font-bold p-4 flex justify-center rounded-full mx-40"
            >
              Book Now
            </NavLink>
          </div>

          <hr className="w-full border-t border-black my-2" />
          <h3 className="text-xl font-bold pb-4">Reviews</h3>
          <div className="text-sm text-gray-500">
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
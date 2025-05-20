import UserLayout from "../../layouts/UserLayout";
import backgroundImage from "../../assets/images/home/backgroundaboutus.jpg";
import ambot from "../../assets/images/home/ambot.jpg";
import gal1 from "../../assets/images/home/gal1.jpg";
import fridayImage from "../../assets/images/home/friday.jpeg";
import fridayssImage from "../../assets/images/home/fridayss.jpeg";
import UserFooter from "../../components/ui/layout/footers/UserFooter.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GuestProfileModal from '../../components/ui/modals/guest_info.jsx';

const HomePage = () => {
  const [setGuestDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Home | Ocean View";
    if (localStorage.getItem("user_id")) {
      console.log("Yes po");
    } else {
      console.log("awww");
    }
    const userId = localStorage.getItem('user_id');
    if (userId) {
      console.log("Yes po");
      fetchGuestDetails(Number(userId));
    } else {
      console.log("awww");
    }
  }, []);

  const fetchGuestDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api.php?controller=GuestDetails&action=getGuestDetails&user_id=${userId}`);
      const data = await response.json();

      console.log('Fetched data:', data);

      const user = data.find(guest => guest.user_id === userId);

      if (user) {
        console.log('User status:', user.status);

        if (user.status === 0) {
          setIsModalOpen(true);
        } else {
          setIsModalOpen(false);
        }
      } else {
        console.log('No guest found with this user_id');
      }

      setGuestDetails(data);
    } catch (error) {
      console.error('Error fetching guest details:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div id="body" className="h-[93vh] mb-10">
        <section className="relative h-full">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center brightness-[70%] -z-10"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />

          <div className="relative flex items-center justify-center h-full text-center text-white">
            <div className="max-w-[65rem]">
              <h1
                className="font-allerta text-[10vh] tracking-wider"              
              >
                Ocean View
              </h1>
              <p
                className="font-allerta pt-5 text-xl tracking-wide text-shadow"
              >
                Join us for an unparalleled beach day, luxuriating in the
                premium services that complement the natural beauty surrounding
                you. Book your daybed or table now to ensure your spot in this
                tropical oasis.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* top done */}

      <div className="sm:mx-8 md:mx-8 lg:mx-15 xl:mx-20">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-5 bg-white px-6 py-10 items-stretch">
          {/* Left */}
          <div className="md:col-span-2 lg:col-span-2 h-full">
            <img
              src={ambot}
              alt="Beach Club"
              className="rounded-2xl w-full object-cover"
            />
          </div>

          {/* Right */}
          <div className="md:col-span-3 lg:col-span-3 text-left max-w-5xl self-start mx-auto">
            <h2 className="font-caladea tracking-wider text-3xl sm:text2xl md:text-4xl lg:text-5xl font-semibold text-[#7b3f3f] leading-snug">
              Seamlessly blending luxury with nature.
            </h2>
            <p className="tracking-wider md:text-sm lg:text-xl text-gray-700 mt-4 text-base leading-relaxed">
              A place to connect while the sun sails from east to west. Walls
              are not compulsory, organic shapes & composition at every sight.
              Natural material and earthy tones are dominant. Opening onto
              gorgeous iconic landscapes and majestic coastlines, welcoming you
              to a rendition of “Little Bali”.
            </p>
            <button className="mt-6 px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
              About Us
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-5">
        <div className="grid sm:mx-8 md:mx-8 lg:mx-15 xl:mx-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0 mt-10">
            <h3 className="font-caladea tracking-wider text-3xl sm:text2xl md:text-4xl lg:text-5xl font-semibold text-[#812C2C] mb-3">
              Experience a warm welcome at Ocean View
            </h3>
            <h5 className="font-cantarell tracking-wider md:text-xl lg:text-xl text-gray-700 mt-4 text-base leading-relaxed">
              Choose & secure your perfect spot or enjoy panoramic ocean views
              or relish a captivating sunset. Dive into an ambiance where every
              detail uplifts your spirit.
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Hof Gorei Beach",
                image: gal1,
                desc: "Hof Gorei Beach Resort is a charming beachfront resort in Samal Island, offering a serene escape with its natural beauty.",
              },
              {
                title: "Friday Beach Resort",
                image: fridayImage,
                desc: "Fridays Boracay Beach Resort is a tropical paradise located on the white sandy shores of Boracay.",
              },
              {
                title: "Punta Verde Resort",
                image: fridayssImage,
                desc: "Punta Verde Resort is a beachfront resort with white sandy beaches, clear waters, and cozy amenities.",
              },
            ].map((resort, idx) => (
              <div className="card h-full" key={idx}>
                <img
                  src={resort.image}
                  className="card-img-top rounded-[1rem] h-[20rem]"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="font-caladea tracking-widest text-[#812C2C] text-[25px] mt-4">
                    {resort.title}
                  </h5>
                  <p className="tracking-widest font-cantarell text-[1.3rem] mt-2">
                    {resort.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-center mb-5 mt-32">
            <span className="me-5 p-3 border border-black rounded-[50px] text-[1.5rem]">
              <Link
                to="/oceanview/resortslist"
                className="no-underline tracking-wide"
              >
                View All Resorts
              </Link>
            </span>
          </div>
        </div>
      </div>

      <UserFooter />
      {isModalOpen && (
        <GuestProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={(formData) => console.log('Save guest details', formData)}
        />
      )}
    </>
  );


}

export default HomePage;

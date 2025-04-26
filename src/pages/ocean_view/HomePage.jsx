import UserLayout from '../../layouts/UserLayout';
import backgroundImage from '../../assets/images/home/backgroundaboutus.jpg';
import ambot from '../../assets/images/home/ambot.jpg';
import gal1 from '../../assets/images/home/gal1.jpg';
import fridayImage from '../../assets/images/home/friday.jpeg';
import fridayssImage from '../../assets/images/home/fridayss.jpeg';
import UserFooter from '../../components/ui/layout/footers/UserFooter.jsx';
import { Link } from 'react-router-dom';
const HomePage = () => {

  return (

    <div>
      <div id='body' className='px-40'>
        <section style={{ height: "350px", position: 'relative', borderRadius: '1rem' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(70%)',
              borderRadius: '1rem',
              zIndex: -1,
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Allerta Stencil', sans-serif",
              fontSize: '50px',
              textShadow: '12px 12px 80px #000000',
              paddingTop: '5.5rem',
            }}>
              Ocean View
            </h1>
            <p style={{
              fontFamily: "'Allerta Stencil', sans-serif",
              fontSize: '18px',
              textShadow: '12px 12px 80px #000000',
              paddingTop: '1.25rem',
              width: '65rem',
              margin: '0 auto',
            }}>
              Join us for an unparalleled beach day, luxuriating in the premium services that complement the natural beauty surrounding you. Book your daybed or table now to ensure your spot in this tropical oasis.
            </p>
          </div>
        </section>





        <div className="flex mt-24 max-w-full">
  <div className="w-1/3">
    <img
      src={ambot}
      alt="..."
      className="w-full h-full object-cover rounded-[1rem]"
    />
  </div>
  <div className="w-2/3 p-4 flex flex-col justify-center">
    <div className="card-body">
      <h4 className="font-caladea tracking-widest text-[#812C2C] text-[35px]">
        Seamlessly blending luxury with nature.
      </h4>
      <p className="tracking-widest font-cantarell text-[15px]">
        A place to connect while the sun sails from east to west. Walls are not compulsory, organic shapes & composition at every sight. Natural material and earthy tones are dominant. Opening onto gorgeous iconic landscapes and majestic coastlines, welcoming you to a rendition of “Little Bali”.
      </p>
      <span className="border border-black rounded-[20px] px-4 py-2 inline-block mt-[2.5rem]">
        <a href="/about-us" className="no-underline text-[20px]">
          About Us
        </a>
      </span>
    </div>
  </div>
</div>






        <div className="w-[70rem] mb-0 mt-24">
          <h3 className="font-caladea tracking-widest text-[#812C2C] text-[35px] w-full">
            Experience a warm welcome at Ocean View.
          </h3>
          <h5 className=" tracking-widest font-cantarell  text-[15px]">
            Choose & secure your perfect spot or enjoy panoramic ocean views or relish a captivating sunset. Dive into an ambiance where every detail uplifts your spirit.
          </h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Hof Gorei Beach",
              image: gal1,
              desc:
                "Hof Gorei Beach Resort is a charming beachfront resort in Samal Island, offering a serene escape with its natural beauty.",
            },
            {
              title: "Friday Beach Resort",
              image: fridayImage,
              desc:
                "Fridays Boracay Beach Resort is a tropical paradise located on the white sandy shores of Boracay.",
            },
            {
              title: "Punta Verde Resort",
              image: fridayssImage,
              desc:
                "Punta Verde Resort is a beachfront resort with white sandy beaches, clear waters, and cozy amenities.",
            },
          ].map((resort, idx) => (
            <div className="card h-full" key={idx}>
              <img src={resort.image} className="card-img-top rounded-[0rem] h-[20rem]" alt="..." />
              <div className="card-body">
                <h5 className="font-caladea tracking-widest text-[#812C2C] text-[25px] mt-4">
                  {resort.title}
                </h5>
                <p className="tracking-widest font-cantarell text-[1.3rem] mt-2">{resort.desc}</p>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-12 mx-5">
          <div className="text-center mb-5 mt-32">
            <span className="me-5 p-3 border border-black rounded-[50px] text-[2rem]">

              <Link to="/oceanview/resortslist" className="no-underline tracking-wide">
                View All Resorts
              </Link>

            </span>
          </div>
        </div>
      </div>
      <UserFooter />
    </div>




  );


}



export default HomePage;
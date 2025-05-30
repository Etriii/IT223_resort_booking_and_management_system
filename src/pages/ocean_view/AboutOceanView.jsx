import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';
import '../../styles/typewriter-animation.css';

const AboutOceanView = () => {
    useEffect(() => {
        document.title = "About | Ocean View";
    }, []);

    const default_image = 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <div>
            {/* Hero Section */}
            <section
                className="text-white flex justify-center items-center bg-center bg-cover"
                style={{ backgroundImage: `url(${default_image})`, height: '93vh' }}
            >
                <div className="text-center drop-shadow-[0_0_3px_black] px-4">
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-wide">About Us</h1>
                    <p className="typewriter text-lg md:text-2xl mt-4 max-w-4xl mx-auto">
                        Welcome to Ocean View, your haven of tranquility and luxury. Discover the perfect escape nestled in nature's beauty.
                    </p>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto space-y-24">
                    {/* Section 1 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <img src="https://i.pinimg.com/736x/7d/94/b0/7d94b091903a6e497affcf452e384bf7.jpg" alt="Enjoy the Moment" className="rounded-lg w-full md:w-1/3 h-[250px] object-cover shadow-md" />
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-serif text-[#812C2C] mb-3 tracking-widest uppercase">Enjoy the Moment</h2>
                            <p className="text-gray-700 tracking-wide leading-relaxed">
                                Embrace the comfort of home blended with the peace of a perfect getaway. Every moment at Ocean View lets you slow down, breathe, and connect with nature's elegance.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                        <img src="https://i.pinimg.com/736x/e4/24/10/e424107bec570f1c5089a265f669057f.jpg" alt="Sea View" className="rounded-lg w-full md:w-1/3 h-[250px] object-cover shadow-md" />
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-serif text-[#812C2C] mb-3 tracking-widest uppercase">Experience the Sea View</h2>
                            <p className="text-gray-700 tracking-wide leading-relaxed">
                                Wake up to breathtaking seaside vistas and let the gentle sound of waves enhance your stay at Ocean View. Bask in the serene ambiance as the ocean breeze rejuvenates your spirit.
                            </p>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <img src="https://i.pinimg.com/736x/fb/ae/f4/fbaef492e8a33fbf1ad757893017dc6b.jpg" alt="Cuisine" className="rounded-lg w-full md:w-1/3 h-[250px] object-cover shadow-md" />
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-serif text-[#812C2C] mb-3 tracking-widest uppercase">The Right Flavor for Every Palate</h2>
                            <p className="text-gray-700 tracking-wide leading-relaxed">
                                Indulge in our exquisite cuisine, crafted with fresh local ingredients. From delightful appetizers to decadent desserts, every dish is a celebration of taste and creativity.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                        <img src="https://i.pinimg.com/736x/51/09/ea/5109eac645461697c8f18aa390460a00.jpg" alt="Pets" className="rounded-lg w-full md:w-1/3 h-[250px] object-cover shadow-md" />
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-serif text-[#812C2C] mb-3 tracking-widest uppercase">Pets Are Allowed!</h2>
                            <p className="text-gray-700 tracking-wide leading-relaxed">
                                Bring your furry friends along to enjoy the adventure with you. From cozy pet-friendly stays to wide outdoor areas, your pets will love it here too. Make memories with the whole family.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 bg-gray-100 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-center font-serif text-[#812C2C] text-3xl mb-10 tracking-widest uppercase">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {["https://i.pinimg.com/736x/47/e3/8b/47e38b76435cae132d0c84ccb83d1cd1.jpg",
                          "https://i.pinimg.com/736x/44/65/32/44653259f3fded55ab08d93feefe6978.jpg",
                          "https://i.pinimg.com/736x/7a/ca/f9/7acaf9c735e6d05c0cef3ddd81b027b1.jpg",
                          "https://i.pinimg.com/736x/da/e1/4d/dae14db2be0400f2a8ed418061a3fc45.jpg",
                          "https://i.pinimg.com/736x/b0/1c/79/b01c79764c2db0683bb12da77ab898d3.jpg",
                          "https://i.pinimg.com/736x/e4/8b/af/e48baf7282b7495d8b2a5476df50cf18.jpg",
                          "https://i.pinimg.com/736x/dc/4f/35/dc4f350c640eb5287b6b4eef7588db95.jpg",
                          "https://i.pinimg.com/736x/b8/e4/15/b8e4154998384f8863c731ee2d20abe1.jpg",
                          "https://i.pinimg.com/736x/49/81/69/498169c6f2f294a921c4fe4476ca041c.jpg"].map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Gallery ${i + 1}`}
                                className="rounded-lg w-full h-[300px] object-cover shadow-md transition-transform duration-300 hover:scale-105"
                            />
                        ))}
                    </div>
                    <div
                        className="mt-8 text-center text-lg text-[#812C2C] font-medium hover:underline cursor-pointer"
                        onClick={() => alert('Explore more photos soon!')}
                    >
                        See more..
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutOceanView;

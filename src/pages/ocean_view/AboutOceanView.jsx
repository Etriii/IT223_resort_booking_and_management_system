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
                style={{
                    backgroundImage: `url(${default_image})`,
                    height: '93vh',
                }}
            >
                <div className="text-center drop-shadow-[0_0_1px_black]">
                    <h1 className="text-4xl font-bold">About Us</h1>
                    <p className="typewriter text-xl px-3 mt-4 lg:px-72 text-wrap md:px-32">
                        Welcome to Ocean View, your haven of tranquility and luxury. Discover the perfect escape nestled in nature's beauty.
                    </p>
                    {/* <p className="text-2xl mt-4  px-3 lg:px-60 md:px-32">Welcome to Ocean View, your haven of tranquility and luxury. Discover the perfect escape nestled in nature's beauty.</p> */}
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-14 px-40">
                <div className="container mx-auto space-y-10">
                    <div className="flex flex-col md:flex-row gap-6">
                        <img src={default_image} alt="Enjoy the Moment" className="rounded w-full md:w-1/4 object-cover h-full" />
                        <div>
                            <h2 className="text-2xl p-2 font-serif text-[#812C2C] tracking-widest">Enjoy the Moment</h2>
                            <p className="p-2 tracking-wider font-sans">
                                It wraps you in a world of simple comforts that make you feel at home and relaxed. Each moment brings out the natural beauty of your getaway,
                                helping you enjoy every part of it. With every detail carefully chosen, you can fully relax and enjoy a peaceful,
                                refreshing break. Embrace the joy of living in the moment, surrounded by tranquility and charm.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse gap-6">
                        <img src={default_image} alt="Sea View" className="rounded w-full md:w-1/3 object-cover h-full" />
                        <div>
                            <h2 className="text-2xl font-serif text-[#812C2C] tracking-widest">Experience the Appeal of Sea View</h2>
                            <p className="tracking-wider font-sans">
                                Wake up to breathtaking seaside vistas and let the gentle sound of waves enhance
                                your stay at Ocean View. Bask in the serene ambiance as the ocean breeze rejuvenates your spirit. Every sunrise and sunset becomes a picturesque memory you'll cherish forever.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <img src={default_image} alt="Cuisine" className="rounded w-full md:w-1/3 object-cover h-full" />
                        <div>
                            <h2 className="text-2xl p-2 font-serif text-[#812C2C] tracking-widest">The Right Flavor for Every Palate</h2>
                            <p className="p-2 tracking-wider font-sans">
                                Indulge in our exquisite cuisine, crafted with fresh local ingredients to create a memorable dining experience. From delightful appetizers to decadent desserts,
                                every dish is a celebration of taste and creativity. Savor the harmony of flavors in a setting designed to enhance your culinary journey.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse gap-6">
                        <img src={default_image} alt="Pets" className="rounded w-full md:w-1/3 object-cover h-full" />
                        <div>
                            <h2 className="text-2xl font-serif text-[#812C2C] tracking-widest">Pets Are Allowed</h2>
                            <p className="tracking-wider font-sans">
                                Bring your furry friends along to enjoy the adventure with you. We make sure everyone in the family feels at home. From cozy pet-friendly accommodations to spacious
                                outdoor areas, your pets will love it here too. Experience the perfect getaway where your whole family, including your pets, can create unforgettable memories.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-14 bg-gray-100 px-40">
                <div className="container mx-auto">
                    <h2 className="text-center mb-6 font-serif text-[#812C2C] text-2xl tracking-widest">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
                        {[
                            'gal1.jpg', 'gal2.jpg', 'gal3.jpg',
                            'gal4.jpg', 'gal5.jpg', 'gal6.jpeg',
                            'gal7.jpg', 'gal8.jpg', 'gal9.jpeg',
                        ].map((img, i) => (
                            <img
                                key={i}
                                src={default_image}
                                alt={`Gallery ${i + 1}`}
                                className="rounded w-full h-[300px] object-cover"
                            />
                        ))}
                    </div>
                </div>
                <div className={`p-4 text-center text-lg cursor-pointer`} onClick={() => { alert('Pag google cheee!') }}>See more..</div>
            </section>
        </div>
    );
}

export default AboutOceanView;
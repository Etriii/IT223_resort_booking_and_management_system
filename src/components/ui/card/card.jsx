import React from 'react';
import backgroundImage from "../../../assets/images/home/backgroundaboutus.jpg";
import ambot from "../../../assets/images/home/ambot.jpg";
import gal1 from "../../../assets/images/home/gal1.jpg";

function ResortCard() {
    const resorts = [
        {
            image: backgroundImage,
            title: "Friday’s Beach Resort",
            location: "Boracay Island, Philippines",
            description: "Fridays Beach in Boracay Island, Philippines is a resort with boundless opportunities for family adventures, productive meetings, and memorable special events.",
            buttonLink: "#",
        },
        {
            image: ambot,
            title: "Punta Verde Resort",
            location: "Palawan, Philippines",
            description: "Experience paradise like never before with crystal clear waters and white sand beaches.",
            buttonLink: "#",
        },
        {
            image: gal1,
            title: "Sea Eagles",
            location: "Palawan, Philippines",
            description: "Experience paradise like never before with crystal clear waters and white sand beaches.",
            buttonLink: "#",
        },
        {
            image: backgroundImage,
            title: "Friday’s Beach Resort",
            location: "Boracay Island, Philippines",
            description: "Fridays Beach in Boracay Island, Philippines is a resort with boundless opportunities for family adventures, productive meetings, and memorable special events.",
            buttonLink: "#",
        },
        {
            image: ambot,
            title: "Punta Verde Resort",
            location: "Palawan, Philippines",
            description: "Experience paradise like never before with crystal clear waters and white sand beaches.",
            buttonLink: "#",
        },
        {
            image: gal1,
            title: "Sea Eagles",
            location: "Palawan, Philippines",
            description: "Experience paradise like never before with crystal clear waters and white sand beaches.",
            buttonLink: "#",
        },
    ];

    return (
        <div>
            <h2 className="pt-10 text-center text-3xl font-semibold">
                All Resorts
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                {resorts.map((resort, index) => (
                    <div key={index} className="relative overflow-hidden rounded-xl flex justify-center items-center mb-10" style={{ width: '33rem', height: '26rem' }}>
                        <div className="relative w-full h-full">
                            <img
                                src={resort.image}
                                alt={resort.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-black bg-opacity-60 p-6 pl-8 pr-8">
                                <h1 className="text-white text-xl font-bold">{resort.title}</h1>
                                <h5 className="text-white text-sm">{resort.location}</h5>
                                <a
                                    href={resort.buttonLink}
                                    className="mt-3 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full text-sm"
                                >
                                    Visit now
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResortCard;

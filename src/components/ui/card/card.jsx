import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import backgroundImage from "C:/xampp/htdocs/(main) IT223_resort_booking_and_management_system/IT223_resort_booking_and_management_system/src/assets/images/home/backgroundaboutus.jpg";
import ambot from "C:/xampp/htdocs/(main) IT223_resort_booking_and_management_system/IT223_resort_booking_and_management_system/src/assets/images/home/ambot.jpg";
import gal1 from "C:/xampp/htdocs/(main) IT223_resort_booking_and_management_system/IT223_resort_booking_and_management_system/src/assets/images/home/gal1.jpg";

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
            <h2 className='py-10 text-center'>
                All Resorts
            </h2>
            <div className="mt-10 row row-cols-1 row-cols-md-3 row-cols-sm-2 g-5">
                {resorts.map((resort, index) => (
                    <div className="col" key={index}>
                        <Card
                            style={{
                                width: '33rem',
                                height: '28rem',
                                position: 'relative',
                                marginBottom: '2.5rem',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Card.Img
                                variant="top"
                                src={resort.image}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />

                            <Card.Body
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    padding: '20px',
                                    textAlign: 'start',
                                    paddingBottom: '22px'
                                }}
                            >
                                <Card.Title><h1 style={{ fontSize: '20px' }}>{resort.title}</h1></Card.Title>
                                <Card.Text><h5 style={{ fontSize: '12px' }}>{resort.location}</h5></Card.Text>
                                <Button
                                    variant="primary"
                                    href={resort.buttonLink}
                                    style={{
                                        fontSize: '14px',
                                        borderRadius: '20px',
                                        padding: '8px',
                                        fontWeight: 'bold',
                                        width: '100%',
                                    }}
                                >
                                    Visit now
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResortCard;

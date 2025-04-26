import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap'; 
import backgroundImage from "C:/xampp/htdocs/(main) IT223_resort_booking_and_management_system/IT223_resort_booking_and_management_system/src/assets/images/home/backgroundaboutus.jpg";
import ambot from "C:/xampp/htdocs/(main) IT223_resort_booking_and_management_system/IT223_resort_booking_and_management_system/src/assets/images/home/ambot.jpg"
import gal1 from "C:/xampp/htdocs/(main) IT223_resort_booking_and_management_system/IT223_resort_booking_and_management_system/src/assets/images/home/gal1.jpg";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % resorts.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

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


  ];

  return (
    <Container fluid className="px-12 pb-16">
      <Carousel activeIndex={index} onSelect={handleSelect} slide interval={5000}>
        {resorts.map((resort, i) => (
          <Carousel.Item key={i}>
            <Row className="d-flex align-items-center">
              {/*left image*/}
              <Col md={7} className="p-0">
                <div style={{ position: 'relative', height: '350px', overflow: 'hidden', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                  <img
                    src={resort.image}
                    alt={resort.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/*text sa left image* */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    color: 'white',
                    textShadow: '2px 2px 8px rgba(0,0,0,1)',
                     backgroundColor: 'rgba(0, 0, 0, 0.422)',
                     padding: '10px'
                  }}>
                    <h2 className="fw-bold" style={{ textShadow: '12px 12px 100px #000000'}}>{resort.title}</h2>
                    <h5 style={{ textShadow: '12px 12px 100px #000000',}}>{resort.location}</h5>
                    <hr style={{ width: '50%', borderTop: '2px solid white' }} />
                  </div>
                </div>
              </Col>

              {/*right side*/}
              <Col md={5} className="bg-cyan-800 d-flex flex-column justify-content-start align-items-start p-5 text-white" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '350px' }}>
                <h2 className="fw-bold">{resort.title}</h2>
                <hr style={{ width: '100%', borderTop: '1px solid white' }} />
                <p style={{ fontSize: '14px'}}>{resort.description}</p>
                <Button variant="primary" href={resort.buttonLink} className="mt-3 fw-bold px-5 py-3" style={{fontSize: '16px'}}>
                  Visit now
                </Button>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default ControlledCarousel;

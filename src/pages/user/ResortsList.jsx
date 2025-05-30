import React, { useEffect } from 'react';
import UserFooter from '../../components/ui/layout/footers/UserFooter.jsx';
import ControlledCarousel from '../../components/ui/carousel/resortcarousel.jsx';
import ResortCard from '../../components/ui/card/card.jsx';
const ResortsList = () => {
  useEffect(() => {
    document.title = "Resort List | Ocean View";
  }, []);
  return (
    <div>
      <div id="body" className="px-40">
        <section style={{ position: 'relative', borderRadius: '1rem' }}>
          <div style={{ position: 'relative', zIndex: 1, color: 'darkCyan', textAlign: 'center' }}>
            <h1
              style={{
                fontFamily: "'Allerta Stencil', sans-serif",
                fontSize: '25px',
                fontWeight: 'bold',
                paddingTop: '2rem',
              }}
            >
              Reserve your favorite spot on the beach
            </h1> 
          </div>

          <div className=" flex items-center px-44 pb-6">
            <input
              type="text"
              placeholder="Search Resorts"
              aria-label="Search"
              aria-describedby="search-button"
              className="flex-1"
              style={{
                height: '40px',
                border: '2px solid #7c7c7c',
                borderRadius: '30px',
                paddingLeft: '40px',
                fontSize: '16px',
                paddingBottom: '3px'
              }}
            />
          </div>

          <h5
            style={{
              fontFamily: "'Allerta Stencil', sans-serif",
              fontSize: '15px',
              fontWeight: 'bold',
              paddingTop: '0rem',
              textAlign: 'center',
            }}
          >
            DISCOVER
          </h5>

          <h5
            style={{
              fontFamily: "'Allerta Stencil', sans-serif",
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'darkCyan',
            }}
          >
            NEW RESORTS
          </h5>
        </section>

        <div className="mt-2">
          <ControlledCarousel />
        </div>

        <div className="">
          <ResortCard />
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default ResortsList;

import React, { useState, useEffect } from 'react';
import FlightSearchForm from '@client/components/smart/FlightSearchForm/FlightSearchForm';

const StickyNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {isScrolled && (
        <div
          className="asd"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: 'white',
          }}
        >
          <FlightSearchForm isStickyNav={true} />
        </div>
      )}
    </>
  );
};

export default StickyNavBar;

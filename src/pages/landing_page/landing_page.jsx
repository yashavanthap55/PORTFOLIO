import React, { useEffect, useRef } from 'react';
import video from './../../assets/landing_page.video/landing_page.mp4';

const Glitch = () => {
  const landingRef = useRef(null);
  const landing_page2Ref = useRef(null);

  useEffect(() => {
 
    const timer1 = setTimeout(() => {
      if (landingRef.current) {
        landingRef.current.style.top = '-100vh'; 
      }
    }, 3000);
    const timer2 = setTimeout(() => {
      if (landing_page2Ref.current) {
        landing_page2Ref.current.style.top = '-100vh';
      }
    }, 3010); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <div
        ref={landingRef}
        style={{
          fontFamily: 'Ga Maamli',
          position: 'fixed',
          zIndex: '999999',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000',
          top: '0',
          display: 'flex',
          justifyContent: 'center',
          transition: 'all 0.5s ease-in-out',
          alignItems: 'center',
        }}
      >
        <video
          style={{
            width: '80%',
            height: 'auto',
            zIndex: '9999',
          }}
          src={video}
          autoPlay
          loop
          muted
        />
      </div>
      <div
        ref={landing_page2Ref}
        style={{
          height: '100vh',
          width: '100vw',
          zIndex: '99',
          position: 'absolute',
          background: '#DE1D8D',
          top: '0',
          transition: 'top 1s ease-in-out',
        }}
      >
      </div>
    </>
  );
};

export default Glitch;

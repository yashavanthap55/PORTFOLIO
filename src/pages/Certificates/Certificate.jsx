import React, { useEffect, useRef, useState } from 'react';
import certificate from '../../assets/certificates.js';
import './Certificate.css';
import backgroundDark from './../../../public/background_dark.jpg';
import backgroundLight from './../../../public/background.jpg';

const Certificate = ({ isDarkMode, setcertview }) => {
  const [rotationX, setRotationX] = useState(0);
  const [pause, setPause] = useState(false);
  const bannerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = bannerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const rotation = (offsetX / rect.width) * 360; 
    setRotationX(rotation);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = bannerRef.current.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const rotation = (offsetX / rect.width) * 360;
    setRotationX(rotation);
  };

  const handleMouseEnter = () => {
    setPause(true); 
  };

  const handleMouseLeave = () => {
    setPause(false); 
  };

  const handleTouchStart = () => {
    setPause(true);
  };

  const handleTouchEnd = () => {
    setPause(false);
  };
   
  useEffect(() => {
    const currentRef = bannerRef.current;
    currentRef.addEventListener('mousemove', handleMouseMove);
    currentRef.addEventListener('mouseenter', handleMouseEnter);
    currentRef.addEventListener('mouseleave', handleMouseLeave);

    currentRef.addEventListener('touchmove', handleTouchMove,{ passive: true });
    currentRef.addEventListener('touchstart', handleTouchStart,{ passive: true });
    currentRef.addEventListener('touchend', handleTouchEnd,{ passive: true });

    return () => {
      currentRef.removeEventListener('mousemove', handleMouseMove);
      currentRef.removeEventListener('mouseenter', handleMouseEnter);
      currentRef.removeEventListener('mouseleave', handleMouseLeave);

      currentRef.removeEventListener('touchmove', handleTouchMove);
      currentRef.removeEventListener('touchstart', handleTouchStart);
      currentRef.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div id="certificate" style={{ backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="banner" ref={bannerRef}>
        <div className={`slider ${pause ? 'paused' : ''}`} style={{ '--quantity': 7, transform: pause ? `perspective(1000px) rotateY(${rotationX}deg)` : '' }}>
          {certificate.map((cert, index) => (
            <div className="item" style={{ '--position': index + 1 }} key={index}>
              <img src={cert} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificate;

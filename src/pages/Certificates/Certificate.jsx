import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import certificate from '../../assets/certificates.js';
import './Certificate.css';
import backgroundDark from './../../../public/background_dark.jpg';
import backgroundLight from './../../../public/background.jpg';
import leftArrow from './../../../public/icons/left-arrow.png';
import rightArrow from './../../../public/icons/right-arrow.png';

const Certificate = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotationX, setRotationX] = useState(0); // We will keep increasing this value
  const bannerRef = useRef(null);
  const sliderRef = useRef(null);

  const totalCertificates = certificate.length;
  const rotationPerSlide = 360 / totalCertificates;

  const goToSlide = (index) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const newIndex = (index + totalCertificates) % totalCertificates;
    const newRotation = rotationX + (index - currentIndex) * rotationPerSlide;

    gsap.to(sliderRef.current, {
      rotationY: newRotation,
      duration: 0.01,
      onUpdate: () => {
        const currentRotation = gsap.getProperty(sliderRef.current, 'rotationY');
        setRotationX(currentRotation);
      },
      onComplete: () => {
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
      },
    });
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      id="certificate"
      style={{
        backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="banner" ref={bannerRef}>
        <div
          className="slider"
          ref={sliderRef}
          style={{
            '--quantity': totalCertificates,
            transform: `perspective(1000px) rotateY(${rotationX}deg)`,
          }}
        >
         {certificate.map((cert, index) => (
  <div className="item" style={{ '--position': index + 1 }} key={index}>
    <a href={cert.link} target="_blank" rel="noopener noreferrer">
      <img src={cert.src} alt={`Certificate ${index + 1}`} />
    </a>
  </div>
))}
        </div>
        <div className="large-controls">
          <img
            src={leftArrow}
            className="large-nav-icon"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
            onClick={() => goToSlide(currentIndex - 1)}
            alt="Previous certificate"
            aria-label="Previous certificate"
          />
          <img
            src={rightArrow}
            className="large-nav-icon"
            style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
            onClick={() => goToSlide(currentIndex + 1)}
            alt="Next certificate"
            aria-label="Next certificate"
          />
        </div>
      </div>
    </div>
  );
};

export default Certificate;

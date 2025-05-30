import React, { useEffect, useRef, useState } from 'react';
import './text.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Text({ isDarkMode }) {
  const textRef = useRef(null);
  const blendRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const elements = ['.first', '.second', '.third'];
    const initialColor = isDarkMode ? '#cccccc' : '#1b1b1b';
    const scrollColor = isDarkMode ? '#1b1b1b' : '#ccc';

    elements.forEach(selector => {
      gsap.set(selector, { color: initialColor });
      gsap.to(selector, {
        scrollTrigger: {
          trigger: selector,
          start: "50% 0%",
          end: "bottom -20%",
          scrub: 5,
          onEnter: () => {
            gsap.to(selector, { color: scrollColor });
          },
          onLeave: () => {
            gsap.to(selector, { color: initialColor });
          },
          onEnterBack: () => {
            gsap.to(selector, { color: scrollColor });
          },
          onLeaveBack: () => {
            gsap.to(selector, { color: initialColor });
          },
        },
      });
    });
  }, [isDarkMode]);

  useEffect(() => {
    const checkScreenSize = () => {
      setMobile(window.innerWidth <= 790); // 790px or less is considered mobile
    };

    const handleMouseMove = (e) => {
      const rect = textRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setOffsetX(offsetX);
      setOffsetY(offsetY);

      gsap.to(blendRef.current, {
        left: `${offsetX}px`,
        top: `${offsetY}px`,
        duration: 0.7,
        ease: 'back.out(1)',
      });
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const rect = textRef.current.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left;
      const offsetY = touch.clientY - rect.top;
      setOffsetX(offsetX);
      setOffsetY(offsetY);

      gsap.to(blendRef.current, {
        left: `${offsetX}px`,
        top: `${offsetY}px`,
        duration: 0.7,
        ease: 'back.out(1)',
      });
    };

    window.addEventListener('resize', checkScreenSize);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    checkScreenSize(); // Initial check

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div style={{ position: 'relative', zIndex: '8' }}>
      <div className='text' data-scroll data-scroll-speed='-0.5' style={{ backgroundColor: isDarkMode ? '#fff' : '#1e1e1e' }}>
        <div className="container">
          <h1 className='first'>
            &lt;&gt; I love coding.
          </h1>
          <h1 className='second'>
            I use my passion and skills to build interactive Webpages and gain experiences.
          </h1>
          <h1 className='third'>
            I am very excited to learn new things. &lt;/&gt;
          </h1>
        </div>
        <div
          className="blend"
          ref={blendRef}
          style={{
            scale: isHovered ? '6' : '1',
            transition: 'scale 0.2s ease'
          }}
        ></div>
      </div>
      <div className="text2" data-scroll data-scroll-speed={mobile ? '' : '-0.5'} ref={textRef}>
        <div className="container">
          <h1 className='first' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ opacity: '0' }}>
            &lt;&gt; I love coding.
          </h1>
          <h1 className='second' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ opacity: '0' }}>
            I use my passion and skills to build interactive Webpages and gain experiences.
          </h1>
          <h1 className='third' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ opacity: '0' }}>
            I am very excited to learn new things. &lt;/&gt;
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Text;

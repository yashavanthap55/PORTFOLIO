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

    useEffect(() => {
      const elements = ['.first', '.second', '.third'];
      const initialColor = isDarkMode ? '#cccccc' : '#1b1b1b';
      const scrollColor = isDarkMode ? '#000' : '#fff';

      elements.forEach(selector => {
        gsap.set(selector, { color: initialColor });

        gsap.to(selector, {
          scrollTrigger: {
            trigger: selector,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
          color: scrollColor,
          duration: 1,
        });
      });
    }, [isDarkMode]);

    useEffect(() => {
      const handleMouseMove = (e) => {
        const rect = textRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        setOffsetX(offsetX);
        setOffsetY(offsetY);
      };


      document.addEventListener('mousemove', handleMouseMove);

    }, []);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
      <div style={{position:'relative'}}>
      <div className='text'  style={{ backgroundColor: isDarkMode ? '#fff' : '#000' }}>
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
            top: `${offsetY}px`,
            left: `${offsetX}px`,
            scale:isHovered?'6':'1',
            transition:'scale 0.2s ease'
          }}
        ></div>
        </div>
        <div className="text2" ref={textRef}>
          <div className="container" >
          <h1 className='first' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{opacity:'0' }}>
            &lt;&gt; I love coding.
          </h1>
          <h1 className='second' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{opacity:'0'}}>
            I use my passion and skills to build interactive Webpages and gain experiences.
          </h1>
          <h1 className='third' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{opacity:'0'}}>
            I am very excited to learn new things. &lt;/&gt;
          </h1>
        </div>
        </div>
    </div>
    );
  }

  export default Text;

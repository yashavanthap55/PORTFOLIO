import React, { useRef, useEffect, useState } from 'react';
import './marque.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import itachi from './../../../public/itachi.png';
import sharingan from './../../../public/sharingan.png'

gsap.registerPlugin(ScrollTrigger);

const Marque = ({ isDarkMode }) => {
  const svgRef = useRef(null);
  const marqueRef = useRef(null);
  const initialPath = 'M 10 100 Q 250 100 1290 100';

  useEffect(() => {

    gsap.to(marqueRef.current, {
      scale: 1,
      duration:10,
      ease: "power1.out",
      scrollTrigger: {
        trigger: marqueRef.current,
        start: '40% 85%',
        end: '30% 55%',
        scrub:true,
      },
    });
    gsap.to('.bigtext h1,.bigtext-stroke h1', {
    scrollTrigger: {
      trigger: '.marque',
      scroller:'body',
      start: '-70% 0%',
      end: '-60% -50%',
      // markers:true,
      // pin:true,
      scrub:3,
    },
    transform:'translateX(-250%)',
    ease: "power5.out",
  });
  gsap.to('#sharingan',{
    scrollTrigger: {
      trigger: '.marque',
      scroller:'body',
      start: '-70% 0%',
      end: '-60% -100%',
      // pin:true,
      scrub:5,
    },
   rotate:'720deg',
    ease: "power5.out",
  })
    const handleMouseMove = (e) => {
      const rect = svgRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const updatedPath = `M 10 100 Q ${offsetX} ${offsetY} 1290 100`;
      gsap.to(svgRef.current.querySelector('path'), {
        attr: { d: updatedPath },
        duration:0.3,
        ease: 'elastic.out(1,0.2)',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(svgRef.current.querySelector('path'), {
        attr: { d: initialPath },
        ease: 'elastic.out(1,0.2)',
      });
    };

    const svgElement = svgRef.current;
    svgElement.addEventListener('mousemove', handleMouseMove);
    svgElement.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      svgElement.removeEventListener('mousemove', handleMouseMove);
      svgElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initialPath]);

  return (
    <div
      className="marque"
      ref={marqueRef}
      style={{ backgroundColor: isDarkMode ? '#000' : '#f7f7ff' }}
    >
      <div className="design"></div>
      <div className="design2"></div>
      <div className="img">
         <img id='sharingan'src={sharingan} alt="" />
        <img id='itachi' style={{ filter: isDarkMode?'invert(100%) brightness(120%)':''}}  src={itachi} alt="Itachi" />
      </div>
      <div className="bigtext">
        <h1 style={{color:isDarkMode?'#fff':'#000'}}>Fantasy</h1>
      </div>
      <div className="bigtext-stroke" style={{position:'absolute',zIndex:9}}>
        <h1 style={{WebkitTextStrokeWidth:'1px',color:'transparent',WebkitTextStrokeColor:isDarkMode?'#000':'#fff'}}>Fantasy</h1>
      </div>
      <div className="overlay" ref={svgRef}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d={initialPath} stroke={isDarkMode?'#fff':'#000'} fill="transparent" />
        </svg>
      </div>
    </div>
  );
};

export default Marque;

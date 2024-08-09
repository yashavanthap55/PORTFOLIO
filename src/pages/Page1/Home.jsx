import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import Text from './../page2/text.jsx';
import { Link } from 'react-router-dom';
import sharingan from '../../assets/sharingan.js';


function Home({ isDarkMode, cursorOpacity }) {
  const [rotate, setRotate] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [change, setChange] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [click, setClick] = useState(false);
  const homeRef = useRef(null);

  const scroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleClick = () => {
    setIsSpinning(!isSpinning);
    setChange(prevChange => (prevChange === 4 ? 0 : prevChange + 1));
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const clicked = () => {
    setClick(true);
  };

  const notclicked = () => {
    setClick(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = homeRef.current.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      let offsetY = e.clientY - rect.top;

      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      offsetY = Math.max(0, Math.min(offsetY, rect.height));

      setMouseX(offsetX);
      setMouseY(offsetY);

      const X = e.clientX - window.innerWidth / 2;
      const Y = e.clientY - window.innerHeight / 2;
      const angle = Math.atan2(Y, X) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    homeRef.current.addEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="Home" ref={homeRef} style={{ backgroundColor: isDarkMode ? '#000' : '#f7f7ff' }}>
        <div
          className="cursor"
          onClick={handleClick}
          style={{
            top: `${mouseY}px`,
            left: `${mouseX}px`,
            opacity: click ? '0' : cursorOpacity,
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.3)',
            color: isDarkMode ? '#F7F7FF' : '#000',
          }}
        >
          <p>Click</p>
        </div>
        <div className="eyes">
          <div className="center">
            <div className="left-eye" style={{ background: isDarkMode ? '#1B1B1B' : 'hsl(0, 0%, 90%)', boxShadow: isDarkMode ? 'inset 0 0 70px 2px rgb(74 68 68)' : '' }}>
              <div className="line" style={{ transform: `rotate(${rotate}deg)` }}>
                <div className="img-container">
                  <img
                    className={isRotating ? 'rotate' : ''}
                    src={sharingan[change]}
                    style={{
                      filter: change === 3 ? 'drop-shadow(0 0 20px #F7F7FF) drop-shadow(0 0 50px #F7F7FF)' : change === 1 ? 'drop-shadow(0 0 10px purple ) drop-shadow(0 0 15px purple)' : '',
                      scale: change === 1 ? '3.4' : '',
                      animation: 'spinscale 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="right-eye" style={{ background: isDarkMode ? '#1B1B1B' : 'hsl(0, 0%, 90%)', boxShadow: isDarkMode ? 'inset 0 0 70px 2px #1B1B1B' : '' }}>
              <div className="line" style={{ transform: `rotate(${rotate}deg)` }}>
                <div className="img-container">
                  <img
                    className={isRotating ? 'rotate' : ''}
                    src={sharingan[change]}
                    style={{
                      filter: change === 3 ? 'drop-shadow(0 0 20px #F7F7FF) drop-shadow(0 0 50px #F7F7FF)' : change === 1 ? 'drop-shadow(0 0 10px purple ) drop-shadow(0 0 15px purple)' : '',
                      scale: change === 1 ? '3.4' : '',
                      animation: 'spinscale 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="name" style={{ color: isDarkMode ? '#F7F7FF' : '#000', backgroundColor: isDarkMode ? '#000' : '#F7F7FF' }}>
          <div className="about">
            <h1>Yashav<span>a</span>ntha P</h1>
            <h2>frontend developer.</h2>
          </div>
          <div className="about abs">
          <h1 style={{ WebkitTextStrokeColor: isDarkMode ? "#F7F7FF" : "#000" }}>Yashav<span>a</span>ntha P</h1>
          <h2 style={{ WebkitTextStrokeColor: isDarkMode ? "#F7F7FF" : "#000" }}>frontend developer.</h2>
        </div>
          <div className="link" onMouseMove={clicked} onMouseLeave={notclicked}>
            <Link to='/about'>
              <h4>Read more about me  →</h4>
            </Link>
          </div>
        </div>
        <div className="about-btn"  style={{color:isDarkMode?'#fff':'000'}}    onClick={scroll} onMouseMove={clicked} onMouseLeave={notclicked}>↓</div>
      </div>
      <Text isDarkMode={isDarkMode}/>

    </>
  );
}

export default Home;

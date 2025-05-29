import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import moon from '../../assets/icons/moon.png';
import sun from '../../assets/icons/sun.png';
import './Navbar.css';
import icons from '../../assets/icons.js';

function Navbar({ isDarkMode, toggleTheme, setCursorOpacity }) {
  const [isRotating, setIsRotating] = useState(false);
  const [change, setChange] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 790);

  const handleThemeToggle = () => {
    setIsRotating(true);
    toggleTheme();
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const menuchange = () => {
    setChange(!change);
  };

  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 790);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className='navbar' 
      onMouseEnter={() => setCursorOpacity(0)} 
      onMouseLeave={() => setCursorOpacity(1)} 
      style={{ color: isDarkMode ? '#fff' : '#000' }}
    >
      <div className="left-text">
        <Link to='/PORTFOLIO/'>
          <h1 className={location.pathname === '/PORTFOLIO/' ? 'showe' : 'hovere'}>
           Y
          </h1>
        </Link>
      </div>
      <div className={`right-text ${change && isMobile ? 'change-style' : ''}`} style={{backgroundColor:isMobile&&isDarkMode?'#000':!isDarkMode&&isMobile?'#fff':''}}>
      <Link to="/PORTFOLIO">
          <h3 className={location.pathname === '/PORTFOLIO' ? 'show' : 'hover'} style={{ marginRight: '6vw', overflow: 'hidden' ,display:isMobile?'block':'none' }} onClick={menuchange}>Home</h3>
        </Link>
        <Link to="/certificate">
          <h3 className={location.pathname === '/certificate' ? 'show' : 'hover'} onClick={menuchange}>Certificates</h3>
        </Link>
        <Link to="/about">
          <h3 className={location.pathname === '/about' ? 'show' : 'hover'} onClick={menuchange}>About</h3>
        </Link>
        <Link to="/projects">
          <h3 className={location.pathname === '/project' ? 'show' : 'hover'} style={{ marginRight: '6vw', overflow: 'hidden' }} onClick={menuchange}>Project</h3>
        </Link>

        <div className="mode" onClick={handleThemeToggle}>
          <img src={isDarkMode ? sun : moon} alt="Mode Icon" className={isRotating ? 'rotat' : ''} />
        </div>
      </div>
      <div className="three-dot" onClick={menuchange}>
        <img src={isDarkMode ? change ? icons[13] : icons[11] : change ? icons[12] : icons[10]} alt="" />
      </div>
    </div>
  );
}

export default Navbar;

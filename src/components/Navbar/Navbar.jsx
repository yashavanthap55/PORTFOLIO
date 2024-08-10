import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import moon from '../../assets/icons/moon.png';
import sun from '../../assets/icons/sun.png';
import './Navbar.css';

function Navbar({ isDarkMode, toggleTheme, setCursorOpacity }) {
  const [isRotating, setIsRotating] = useState(false);

  const handleThemeToggle = () => {
    setIsRotating(true);
    toggleTheme();
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const location = useLocation();

  return (
    <div 
      className='navbar' 
      onMouseEnter={() => setCursorOpacity(0)} 
      onMouseLeave={() => setCursorOpacity(1)} 
      style={{ color: isDarkMode ? '#fff' : '#000' }}
    >
      <div className="left-text">
        <Link to='/PORTFOLIO'>
          <h1 className={location.pathname === '/PORTFOLIO' ? 'showe' : 'hovere'}>y.</h1>
        </Link>
      </div>
      <div className='right-text'>
        <Link to="/certificate">
          <h3 className={location.pathname === '/certificate' ? 'show' : 'hover'}>Certificates</h3>
        </Link>
        <Link to="/about">
          <h3 className={location.pathname === '/about' ? 'show' : 'hover'}>About</h3>
        </Link>
        <Link to="/project">
          <h3 className={location.pathname === '/project' ? 'show' : 'hover'} style={{ marginRight: '6vw', overflow: 'hidden' }}>Project</h3>
        </Link>
        <div className="mode" onClick={handleThemeToggle}>
          <img src={isDarkMode ? sun : moon} alt="Mode Icon" className={isRotating ? 'rotat' : ''} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

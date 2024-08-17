import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Page1/Home';
import Footer from './pages/Footer/footer.jsx'
import Certificate from './pages/Certificates/Certificate.jsx';
import Project from './pages/Projects/Project.jsx';
import About from './pages/About/About.jsx';
import LandingPage from './pages/landing_page/landing_page.jsx';
import NotFound from './components/Notfound/notfound.jsx';
import LocomotiveScroll from 'locomotive-scroll';

function App() {
  const [cursorOpacity, setCursorOpacity] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [certificateInView, setcertificateInView] = useState(false);


  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('.screen'),
      multiplier:0.001 ,
      smooth: true,
      lerp: 0.1, 
    });

    return () => {
      if (locoScroll) locoScroll.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const setcertview = (e) => {
    setcertificateInView(e);
  };

  return (
    <Router>
      <div className="screen" style={{backgroundColor:isDarkMode?'#fff':'#000',msOverflowX:'hidden'}}>
        <LandingPage />
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setCursorOpacity={setCursorOpacity} />
        <Routes>
          <Route path="/PORTFOLIO/" element={<Home isDarkMode={isDarkMode} cursorOpacity={cursorOpacity} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
          <Route path="/certificate" element={<Certificate isDarkMode={isDarkMode} setcertview={setcertview} />} />
          <Route path="/project" element={<Project isDarkMode={isDarkMode} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;

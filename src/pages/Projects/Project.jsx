import React, { useState, useEffect, useRef } from 'react';
import project from './../../assets/project.js';
import './Project.css';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';


const Project = ({ isDarkMode }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [mouseenter, setMouseenter] = useState(false);
  const [mouseleave, setMouseleave] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const curseRef=useRef(null);
  const projectRef = useRef(null);

  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = projectRef.current.getBoundingClientRect();
      const offsetX = e.clientX - 180;
      const offsetY = e.clientY - rect.top - 150;
      setOffsetX(offsetX);
      setOffsetY(offsetY);
      gsap.to(curseRef.current,{
        top: `${offsetY}px`,
        left: `${offsetX}px`,
        duration:'1',
        ease:'back.out(1)'
      });
    };

    projectRef.current.addEventListener('mousemove', handleMouseMove);

  }, []);
  const mousemove = (e) => {
    const projectNumber = e.target.getAttribute('data-no');
    setHoveredProject(projectNumber);
    setMouseenter(true);
    setMouseleave(false);
  };

  const mousenotmove = () => {
    setMouseleave(true);
    setMouseenter(false);
    setHoveredProject(null);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: isDarkMode ? '#1e1e1e' : '#f7f7ff',
          color: isDarkMode ? '#fff' : '#000',
          borderTopColor: isDarkMode ? '#1b1b1b' : '#cccccc',
        }}
        ref={projectRef}
        className='Project'
      >
    
          <div
            className="outerdiv"
            ref={curseRef}
            style={{
              backgroundImage: `url(${project[hoveredProject]})`,
              backgroundSize: 'cover',
              transform:mouseenter?'scale(1)':'scale(0)',
            }}
          >
            <div style={{position:'absolute',height:'60px',color:'#fff',width:'60px',backgroundColor:'rgb(222, 29, 141)',borderRadius:'50%',left:'50%',top:'50%',transform:'translate(-50%,-50%)',textAlign:'center',padding:'15px 0'}}>View</div>
          </div>

        <h1>Projects</h1>
        <h4 style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}>Here are some projects I worked upon</h4>
        <div className="proj-list" >
          <div className="proj" style={{ borderBottomColor: isDarkMode ? '#fff' : '#9CA3AF',scale:hoveredProject=='0'?'1.1':'1'}} data-no='1'  >
            <h2>RV Hospital Appointment</h2>
            <h3>React+express+Mysql</h3>
          </div>
          <div className="proj" style={{ borderBottomColor: isDarkMode ? '#fff' : '#9CA3AF',scale:hoveredProject=='1'?'1.1':'1'}} data-no='2'  >
            <h2>Brain Tumor detection</h2>
            <h3>Machine Learning</h3>
          </div>
          <div className="proj" style={{ borderBottomColor: isDarkMode ? '#fff' : '#9CA3AF',scale:hoveredProject=='2'?'1.1':'1'}} data-no='3'  >
            <h2>Snake Game</h2>
            <h3>Flask Backend</h3>
          </div>
          <div className="proj" style={{ borderBottomColor: isDarkMode ? '#fff' : '#9CA3AF',scale:hoveredProject=='3'?'1.1':'1' }} data-no='4' >
            <h2>Acoustic Levitation</h2>
            <h3>Arduino</h3>
          </div>
          <div className="proj" style={{ borderBottomColor: isDarkMode ? '#fff' : '#9CA3AF',scale:hoveredProject=='4'?'1.1':'1' }} data-no='5' >
            <h2>Identify Emotion through audio</h2>
            <h3>Machine Learning</h3>
          </div>
        </div>
      </div>

      <div
        style={{
          color: isDarkMode ? '#fff' : '#000',
          borderTopColor: isDarkMode ? '#1b1b1b' : '#cccccc',
        }}
        ref={projectRef}
        className='Project-absolute'
      >
        <h1 style={{ fontWeight: '900', fontSize: '3vw', letterSpacing: '-2px' ,opacity:'0'}}>Projects</h1>
        <h4 style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280',opacity:'0' }}>Here are some projects I did in college</h4>
        <div className="proj-list">
        <Link to="/projects/hospital-appointment">
          <div className="proj" data-no='0' onMouseMove={mousemove} onMouseLeave={mousenotmove}>
            <h2></h2>
            <h3></h3>
          </div>
        </Link>
         <Link to="/projects/brain-tumor-detection">
          <div className="proj" data-no='1' onMouseMove={mousemove} onMouseLeave={mousenotmove}>
            <h2></h2>
            <h3></h3>
          </div>
        </Link>
        <Link to="/projects/snake-game">
          <div className="proj" data-no='2' onMouseMove={mousemove} onMouseLeave={mousenotmove}>
            <h2></h2>
            <h3></h3>
          </div>
        </Link>
        <Link to="/projects/acoustic-levitation">
          <div className="proj" data-no='3' onMouseMove={mousemove} onMouseLeave={mousenotmove}>
            <h2></h2>
            <h3></h3>
          </div>
        </Link>
        <Link to="/projects/emotion-through-audio">
          <div className="proj" data-no='4' onMouseMove={mousemove} onMouseLeave={mousenotmove}>
            <h2></h2>
            <h3></h3>
          </div>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Project;

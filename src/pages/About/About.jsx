import React, {useEffect, useState } from 'react';
import './About.css';
import my_photo from './../../../public/my_img.jpg';

function About({ isDarkMode }) {  
 const [img,setImg]=useState(false);
 const imgClick=()=>{
  setImg(prev=>!prev);
 };
 useEffect(()=>{
  if(img){
    document.documentElement.style.setProperty('--img--','0');
  }
  else{
   document.documentElement.style.setProperty('--img--','1')
  }
 },[img]);
  return (
    <div className='About' style={{ backgroundColor: isDarkMode ? '#1e1e1e' : '#f7f7ff',color: isDarkMode ? '#fff' : '#000'}}>
      <div className="aabout">
        <div className="myname">
          <div className="lefttext">
            <h1>Yashavantha P</h1>
            <h4>
              Student at <a href="https://rvu.edu.in/" id='clg'>RV UNIVERSITY</a>
            </h4>
            <h4>𖡡 Bengaluru</h4>
          </div>
          <div 
    className="righttext" 
    onClick={imgClick} 
    id={img ? "imghoveredp" : ""}
    style={{ 
        backgroundColor: isDarkMode ? '#1b1b1b' : '#cccccc',
        backgroundImage: isDarkMode ? 'linear-gradient(to right, #000, #000)' : 'linear-gradient(to right, #fff, #fff)' 
    }}
>            <img src={my_photo} id={img?"imghoveredc":""} alt="Yashavantha P" />
          </div>
        </div>
        <div className="para">
          <p>
            I am currently a 3rd year Btech pursuing student at RV UNIVERSITY <br />I use <a href="https://gsap.com/" id='clg'>GSAP</a>
              ,<a href="https://scroll.locomotive.ca/docs/#/" id='clg'>Locomotive.js</a>,<a href="https://swiperjs.com/" id='clg'>Swiper.js</a>,<a href="https://threejs.org/" id='clg'>Three.js</a> etc. libraries to make my website interactive.
          </p>
        </div>
        <div className="skills">
          <h3>Timeline</h3>
          <br />
          <div className="year" id="year-2024">
            <h4>2025</h4>
            <ul>
              <li>Made a simple<a href="https://nodejs.org/en" id='clg'>Hospital mangement</a> fullstack project</li>
              <li>Completed Data Analysis & Algorithms<a href="https://nodejs.org/en" id='clg'></a></li>
              <li>OOP's in<a href="https://nodejs.org/en" id='clg'>JAVA</a></li>
              <li>Operating Systems<a href="https://nodejs.org/en" id='clg'></a></li>
              <li>started using linux terminal<a href="https://nodejs.org/en" id='clg'></a></li>    
            </ul>
          </div>
          <br />
          <div className="year" id="year-2024">
            <h4>2024</h4>
            <ul>
              <li>Started using Vite+React framework and<a href="https://nodejs.org/en" id='clg'>Node.js</a></li>
              <li>Made a project with<a href="https://flask.palletsprojects.com/en/3.0.x/" id='clg'>Flask</a> (backend)</li>
              <li>Completed DSA</li>
              <li>Worked with<a href="https://www.mysql.com/" id='clg'>MySQL</a> and<a href="https://www.mongodb.com/" id='clg'>MongoDB</a> databases</li>
              <li><a href="https://git-scm.com/book/en/v2/Git-on-the-Server-GitWeb" id='clg'>Git/GitHub</a></li>
              <li>Acoustic Levitation Project</li>
            </ul>
          </div>
          <br />
          <div className="year" id="year-2023">
            <h4>2023</h4>
            <ul>
              <li>Started with<a href="https://www.cprogramming.com/" id='clg'>C  </a> programming</li>
              <li><a href="https://www.python.org/" id='clg'>Python</a></li>
              <li>Basic Web development (HTML, CSS, JS)</li>
              <li>Made first portfolio as project for course</li>
            </ul>
          </div>
          <h3>Hobbies</h3>
          <ul>
            <li>Playing Guitar </li>
            <li>Doing Sketch ART </li>
            <li>Listening to music</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
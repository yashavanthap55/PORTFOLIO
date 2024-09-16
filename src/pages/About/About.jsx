import React from 'react';
import './About.css';
import my_photo from './../../../public/my_img.jpg';

function About({ isDarkMode }) {  
  return (
    <div className='About' style={{ backgroundColor: isDarkMode ? '#000' : '#f7f7ff', color: isDarkMode ? '#fff' : '#000' }}>
      <div className="aabout">
        <div className="myname">
          <div className="lefttext">
            <h1>Yashavantha P</h1>
            <h4>
              Student at <a href="https://rvu.edu.in/" id='clg'>RV UNIVERSITY</a>
            </h4>
            <h4>𖡡 Bengaluru</h4>
          </div>
          <div className="righttext" style={{ backgroundColor: isDarkMode ? '#1b1b1b' : '#cccccc' }}>
            <img src={my_photo} alt="Yashavantha P" />
          </div>
        </div>
        <div className="para">
          <p>
            I am currently a 2nd year Btech pursuing student at RV UNIVERSITY <br />I use <a href="https://gsap.com/" id='clg'>GSAP</a>
              ,<a href="https://scroll.locomotive.ca/docs/#/" id='clg'>Locomotive.js</a>,<a href="https://swiperjs.com/" id='clg'>Swiper.js</a>,<a href="https://threejs.org/" id='clg'>Three.js</a> etc. libraries to make my website interactive.
          </p>
        </div>
        <div className="skills">
          <h3>Timeline</h3>
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
            <li>Guitar 🎸</li>
            <li>Sketch ART 🎨</li>
            <li>Spotify 🎧</li>
            <li>Video Editing 📽️</li>
          </ul>
          <h3>Uses</h3>
          <ul>
            <li>Laptop - <a href="https://www.hp.com/in-en/shop/victus-gaming-laptop-15-fa0165tx-6n027pa.html" id='clg'>HP victus 12th Gen Intel(R) Core(TM) i5-12450H   2.00 GHz</a> </li>
            <li>Code Editor - <a href="https://code.visualstudio.com/" id='clg'>Visual Studio code</a> </li>
            <li>Browser - <a href="https://brave.com/en-in/download/" id='clg'>Brave</a> </li>
  
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
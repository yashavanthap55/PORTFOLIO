import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import "./DynoProject.css";
import project from "./../../assets/project.js";
import { Link } from 'react-router-dom';

// Sample project data map
const projectData = {
  
  "hospital-appointment": {
    title: "Hospital Appointment System",
    img: `${project[0]}`, // Replace with real image URL
    description:
      "A full-stack hospital appointment booking system developed using React and Node.js. The system features secure user authentication and enables patients to seamlessly log in, view available doctors, and book appointments. Backend APIs efficiently interact with a MySQL database to handle real-time data retrieval and updates.",
    tools:
      "Backend : Express.js \n Database : mysql or mysqlite \n Frontend : React + Vite",
    live: "https://hospital-appointment-delta.vercel.app/",
    linkcode: "https://github.com/yashavanthap55/Hospital_appointment",
  },
  "snake-game": {
    title: "Snake Game",
    img: `${project[1]}`, // Replace with real image URL
    description:
      "A classic Snake game built using Python Flask and javascript, featuring user authentication, high score tracking. The application includes intuitive controls and a simple web interface for an engaging user experience.",
    tools: "Backend : Flask \n Database : mysqlite \n Frontend : HTML",
    live: "",
    linkcode: "https://github.com/YASHAVANTHAP/SNAKE-GAME",
  },
  "acoustic-levitation": {
    title: "Acoustic Levitation",
    img: `${project[2]}`,
    description:
      "A physics simulation project demonstrating acoustic levitation principles using ultrasonic waves.",
    tools: "Arduino UNO code",
    live: "",
    linkcode: "https://github.com/YASHAVANTHAP/Acoustic_levitation",
  },
  "emotion-through-audio": {
    title: "Emotion Through Audio",
    img: `${project[3]}`,
    description:
      "A machine learning project that detects emotions from audio signals using Convolutional Neural Networks (CNN).",
    tools: "Jupyter Notebook for Machine Learning \n CNN",
    live: "",
    linkcode: "https://github.com/YASHAVANTHAP/Emotion_through_audio",
  },
};

const DynoProject = ({ isDarkMode }) => {
  const { id } = useParams();
  const svgRef = useRef(null);
  const project = projectData[id];
  const initialPath = "M 10 100 Q 250 100 1290 100";

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = svgRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const updatedPath = `M 10 100 Q ${offsetX} ${offsetY} 1290 100`;
      gsap.to(svgRef.current.querySelector("path"), {
        attr: { d: updatedPath },
        duration: 0.3,
        ease: "elastic.out(1,0.2)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(svgRef.current.querySelector("path"), {
        attr: { d: initialPath },
        ease: "elastic.out(1,0.2)",
      });
    };

    const svgElement = svgRef.current;
    svgElement.addEventListener("mousemove", handleMouseMove);
    svgElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners
    return () => {
      svgElement.removeEventListener("mousemove", handleMouseMove);
      svgElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!project) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        Project not found
      </h2>
    );
  }
  return (
    <div
      className="outbox"
      style={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f7f7ff" }}
    >
      <div className="innerbox" style={{ color: isDarkMode ? "#fff" : "#000" }}>
        <Link to="/projects" className="backarrow">
          ←
        </Link>
        <h1>{project.title}</h1>
        <div className="imgdiv">
          <img src={project.img} alt="" />
        </div>
        <div className="li">
          <div className="lin">
            {project.live && (
              <div>
                <h2 style={{ color: isDarkMode ? "#fff" : "#000" }}>
                  Live Preview :{" "}
                  <a id='clg' target="_blank" href={project.live}>
                    Click
                  </a>
                </h2>
              </div>
            )}

         {project.linkcode && (
  <h2 style={{ color: isDarkMode ? "#fff" : "#000" }}>
    Link of Code:{" "}
    <a
    id='clg'
      target="_blank"
      href={project.linkcode}
    >
      Click
    </a>
  </h2>
)}

          </div>
          <div className="tools">
            <h2>Tools Used : </h2>
            <h3>
              {project.tools.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </h3>
          </div>
        </div>
        <div className="description">
          <h2>{project.description}</h2>
        </div>
      </div>
      <div className="overlay" ref={svgRef}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <path
            d={initialPath}
            stroke={isDarkMode ? "#fff" : "#000"}
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
};

export default DynoProject;

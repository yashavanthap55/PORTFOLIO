import React, { useRef, useEffect } from 'react';
import './marque.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sharingan from './../../../public/sharingan.png';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

gsap.registerPlugin(ScrollTrigger);

const Marque = ({ isDarkMode }) => {
  const svgRef = useRef(null);
  const marqueRef = useRef(null);
  const canvasRef = useRef(null);
  const initialPath = 'M 10 100 Q 250 100 1290 100';

  useEffect(() => {
    // GSAP Animations
    gsap.to(marqueRef.current, {
      scale: 1,
      duration: 10,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: marqueRef.current,
        start: '40% 85%',
        end: '30% 55%',
        scrub: true,
      },
    });

    gsap.to('.bigtext h1, .bigtext-stroke h1', {
      scrollTrigger: {
        trigger: '.marque',
        scroller: 'body',
        start: '-70% 0%',
        end: '-60% -50%',
        scrub: 3,
      },
      transform: 'translateX(-250%)',
      ease: 'power5.out',
    });

    gsap.to('#sharingan', {
      scrollTrigger: {
        trigger: '.marque',
        scroller: 'body',
        start: '-70% 0%',
        end: '-60% -100%',
        scrub: 5,
      },
      rotate: '720deg',
      ease: 'power5.out',
    });
    
    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, // Adjust FOV if necessary
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true, // Enable anti-aliasing for better visual quality
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

    // Set up lighting
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load GLTF Model
    const loader = new GLTFLoader();
    let model = null; // Declare a variable to store the model reference
    loader.load(
      '/model/itachi.glb',
      (gltf) => {
        model = gltf.scene; // Store the model reference
        scene.add(model);

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.scale.set(1.5, 1.5, 1.5); // Adjust scale

        // Throttle model rendering for better performance
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.metalness = 0.5;
            child.material.roughness = 0.5;
            child.material.envMapIntensity = 1.2;
          }
        });
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // OrbitControls Setup with Damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping
    controls.dampingFactor = 0.01; // Adjust damping factor (higher = slower damping)
    controls.screenSpacePanning = true;
    controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
    controls.enableZoom = false; // Disable zoom functionality

    // Update Camera Position
    const updateCameraPosition = () => {
      const isSmallScreen = window.innerWidth < 768;
      const zPosition = isSmallScreen ? 7 : 5.2;
      camera.position.set(0, 0, zPosition);
    };

    updateCameraPosition();
    window.addEventListener('resize', updateCameraPosition);

    // Continuous Y-Axis Rotation for the model
    const rotateModel = () => {
      if (model) {
        model.rotation.y += 0.001; // Rotate model along Y-axis infinitely
      }
    };

    // Start animation loop
    const animate = () => {
      controls.update(); // Update controls for damping
      rotateModel(); // Rotate the model if it's loaded
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCameraPosition);
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };

  }, []);
  useEffect(()=>{
    const handleMouseMove = (e) => {
      const rect = svgRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
  
      console.log("Mouse Position:", offsetX, offsetY); // Debugging line
  
      const updatedPath = `M 10 100 Q ${offsetX} ${offsetY} 1290 100`;
      gsap.to(svgRef.current.querySelector('path'), {
        attr: { d: updatedPath },
        duration: 0.3,
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
  
    // Cleanup event listeners
    return () => {
      svgElement.removeEventListener('mousemove', handleMouseMove);
      svgElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  },[]);

  return (
    <div
      className="marque"
      ref={marqueRef}
      style={{ backgroundColor: isDarkMode ? '#000' : '#f7f7ff' }}
    >
      <div className="design"></div>
      <div className="design2"></div>
      <div className="img">
        <img id="sharingan" src={sharingan} alt="Sharingan" />
      </div>
      <canvas style={{ position: 'absolute', zIndex: '11' }} ref={canvasRef}></canvas>
      <div className="bigtext">
        <h1 style={{ color: isDarkMode ? '#fff' : '#000' }}>Fantasy</h1>
      </div>
      <div
        className="bigtext-stroke"
        style={{ position: 'absolute' }}
      >
        <h1
          style={{
            WebkitTextStrokeWidth: '1px',
            cursor:'none',
            color: 'transparent',
            WebkitTextStrokeColor: isDarkMode ? '#000' : '#fff',
          }}
        >
          Fantasy
        </h1>
      </div>
      <div className="overlay" ref={svgRef}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <path
            d={initialPath}
            stroke={isDarkMode ? '#fff' : '#000'}
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
};

export default Marque;

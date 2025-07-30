import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '10rem',
        fontWeight: 'bold',
        color: '#ff4444',
        backgroundColor: '#000', 
        zIndex: 100000,
      }}
    >
      404
    </div>
  );
};

export default NotFound;

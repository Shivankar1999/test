"use client"

import React, { useState, useEffect } from 'react';

const ImageFollowCursor = () => {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if(typeof window !== undefined){
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setPosition({ x: centerX, y: centerY });
      setTargetPosition({ x: centerX, y: centerY });
    }
   
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      setTargetPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      setPosition(prevPosition => ({
        x: prevPosition.x + (targetPosition.x - prevPosition.x) * 0.1,
        y: prevPosition.y + (targetPosition.y - prevPosition.y) * 0.1
      }));
    };

    const animationFrame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, targetPosition]);

  const calculateRotation = () => {
    const dx = targetPosition.x - position.x;
    const dy = targetPosition.y - position.y;
    return Math.atan2(dy, dx) * (360 / Math.PI) + 25;
  };

  return (
    <div className="h-screen w-full flex justify-center items-center relative" style={{ backgroundImage: "url('./bg.jpg')", backgroundSize: "cover", opacity: "0.89" }}>
      <div
        className='flex justify-center items-center'
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          transform:` translate(-50%, -50%) rotate(${calculateRotation()}deg)`,
        }}
      >
        <img src="https://www.wizard.financial/static/media/wizaart-img.56787174.gif" alt="Follow Cursor Image" style={{ width: "100px", height: "100px" }} />
      </div>
    </div>
  );
};

export default ImageFollowCursor;
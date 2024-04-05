"use client"

import React, { useState, useEffect } from 'react';

const ImageFollowCursor = () => {
  const isBrowser = typeof window !== 'undefined';

  // Initialize position to the center if window is defined, otherwise to (0, 0)
  const [position, setPosition] = useState({
    x: isBrowser ? window.innerWidth / 2 : 0,
    y: isBrowser ? window.innerHeight / 2 : 0
  });

  // Initialize targetPosition to start from the center
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isBrowser) {
      setPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    }

    const handleClick = (event) => {
      setTargetPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [position,targetPosition,isBrowser]);

  useEffect(() => {
    const updatePosition = () => {
      setPosition(prevPosition => ({
        x: prevPosition.x + (targetPosition.x - prevPosition.x) * 0.1, // Increased to 10% for faster movement
        y: prevPosition.y + (targetPosition.y - prevPosition.y) * 0.1  // Increased to 10% for faster movement
      }));
    };
  
    const animationFrame = requestAnimationFrame(updatePosition);
  
    return () => cancelAnimationFrame(animationFrame);
  }, [targetPosition]);

  const calculateRotation = () => {
    const dx = targetPosition.x - position.x;
    const dy = targetPosition.y - position.y;
    return Math.atan2(dy, dx) * (180 / Math.PI) + 90; // Adding 90 to adjust the initial orientation
  };

  return (
    <div className="h-screen w-full flex justify-center items-center relative" style={{ backgroundImage: "url('./bg.jpg')", backgroundSize: "cover", opacity: "0.89" }}>
     <div
       className='flex justify-center items-center'
       style={{
         position: 'absolute',
         top: position.y,
         left: position.x,
         transition: "img .5s ease forward",
         transform: `translate(-50%, -50%) rotate(${calculateRotation()}deg)`,
       }}
     >
       <img src="https://www.wizard.financial/static/media/wizaart-img.56787174.gif" alt="Follow Cursor Image" style={{ width: "100px", height: "100px" }} />
     </div>
    </div>
  );
};

export default ImageFollowCursor;

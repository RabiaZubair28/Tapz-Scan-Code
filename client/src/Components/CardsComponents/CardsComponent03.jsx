import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CardsComponent.css';

const FloatingCard = ({ title, image }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Floating animation on the card (up and down)
    gsap.to(cardRef.current, {
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 4,
    });
  }, []);

  const handleMouseEnter = () => {
    // Show overlay on hover
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    // Hide overlay when not hovering
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <div className='parentCard'>
    <div
      className="card2"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt={title} className="card-image" />
      <div className="card-overlay" ref={overlayRef}>
        <h2>{title}</h2>
      </div>
    </div>
    <button className='shopbtn'>shop Now</button>
    </div>
  );
};

const CardsComponent03 = () => {
  return (
    <>
    <div className='parentDivCard'>
    <h1 className='head'>All Projects</h1>
    <div className='top-component'>
    
    <div className="card-container">
      <FloatingCard
        title="Card 1"
        image="https://via.placeholder.com/300"
      />
       <FloatingCard
        title="Card 1"
        image="https://via.placeholder.com/300"
      />
      

   </div>
    </div>
    <div className='component'>
    
    <div className="card-container">
      <FloatingCard
        title="Card 1"
        image="https://via.placeholder.com/300"
      />
       <FloatingCard
        title="Card 1"
        image="https://via.placeholder.com/300"
      />
      

   </div>
    </div>
    </div>
    </>
  );
};



export default CardsComponent03
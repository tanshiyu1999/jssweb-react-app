// Can use HTML ENTITY FOR PICS
import React, { useState } from 'react'


function EventCarousel() {
  const sliderStyles = {
    position: "relative",
    height: "100%",
  };
  
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };
  
  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };
  
  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "block",
  };
  
  const overlay = {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "black",
    opacity: "0.76",
    overflow: "hidden",
    color: "white",
    width: "100%",
    transition: ".5s ease",
  }

  const slides = [
    { url: "http://placekitten.com/700/500", title: "beach" },
    { url: "http://placekitten.com/500/300", title: "boat" },
    { url: "http://placekitten.com/200/300", title: "forest" },
    { url: "http://placekitten.com/400/500", title: "italy" },
  ]

  const [ isHover, setIsHover ] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };

 const handleMouseLeave = () => {
    setIsHover(false);
 };


  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div 
      style={sliderStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={slideStylesWidthBackground}>
      <div style={overlay}>
        <h3>JCF</h3>
        <p>JCF Description</p>
      </div>
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  )
}


export default EventCarousel;

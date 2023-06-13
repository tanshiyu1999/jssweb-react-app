// Can use HTML ENTITY FOR PICS
import React, { useState } from 'react'





function EventCarousel() {

  const slides = [
    { url: "http://placekitten.com/700/500", title: "beach" },
    { url: "http://placekitten.com/500/300", title: "boat" },
    { url: "http://placekitten.com/200/300", title: "forest" },
    { url: "http://placekitten.com/400/500", title: "italy" },
  ]

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
    <div style={sliderStyles}>
      <div style={slideStylesWidthBackground}>
      <div style={textContainer}>
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


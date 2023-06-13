import React, { useState, useEffect } from 'react'
import './EventCarousel.css'

const EventCarousel = () => {

  const [ counter, setCounter ] = useState(1);

  // useEffect(() => {

  //   const interval = setInterval(() => {      
  //     if (counter > 4) {
  //       setCounter(1);
  //     }
  //     document.getElementById('radio' + counter).checked = true;
  //     setCounter(counter + 1);
  //     if (counter > 4) {
  //       setCounter(1);
  //     }
  //   }, 7000)

  //   return () => clearInterval(interval)
  // })




  return (
    // image slider start
    <div className="slider">
      <div className="slides">
        {/* radio buttons start */}
        <input type="radio" name="radio-btn" id="radio1" onClick={() => setCounter(1)} />
        <input type="radio" name="radio-btn" id="radio2" onClick={() => setCounter(2)} />
        <input type="radio" name="radio-btn" id="radio3" onClick={() => setCounter(3)} />
        <input type="radio" name="radio-btn" id="radio4" onClick={() => setCounter(4)} />
        {/* radio buttons end */}
        {/* slide images start */}
        <div className="slide first">
          <img src="http://placekitten.com/200/300" alt="" />
          <div className="text-container">
            <h3 className="text-title">JCF</h3>
            <p className="text-description">Fun and exciting events happening every month including sharing sessions, workshops, Christmas Party, etc. Keep up to date with our social channels!</p>
          </div>
        </div>
        <div className="slide">
          <img src="http://placekitten.com/200/300" alt="" />
          <div className="text-container">
            <h3 className="text-title">JCF</h3>
            <p className="text-description">Fun and exciting events happening every month including sharing sessions, workshops, Christmas Party, etc. Keep up to date with our social channels!</p>
          </div>
        </div>
        <div className="slide">
          <img src="http://placekitten.com/200/300" alt="" />
          <div className="text-container">
            <h3 className="text-title">JCF</h3>
            <p className="text-description">Fun and exciting events happening every month including sharing sessions, workshops, Christmas Party, etc. Keep up to date with our social channels!</p>
          </div>
        </div>
        <div className="slide">
          <img src="http://placekitten.com/200/300" alt="" />
          <div className="text-container">
            <h3 className="text-title">JCF</h3>
            <p className="text-description">Fun and exciting events happening every month including sharing sessions, workshops, Christmas Party, etc. Keep up to date with our social channels!</p>
          </div>
        </div>
        {/* slide images end */}

        {/* automatic navigation start */}
        <div className="navigation-auto">
          <div className="auto-btn1"></div>
          <div className="auto-btn2"></div>
          <div className="auto-btn3"></div>
          <div className="auto-btn4"></div>
        </div>
        {/* automatic navigation end */}

        {/* manual navigation start */}
        <div className="navigation-manual">
          <label htmlFor="radio1" className="manual-btn"></label>
          <label htmlFor="radio2" className="manual-btn"></label>
          <label htmlFor="radio3" className="manual-btn"></label>
          <label htmlFor="radio4" className="manual-btn"></label>
        </div>
        {/* manual navigation end */}
      </div>
    </div>
    // image slider end
  )
}

export default EventCarousel
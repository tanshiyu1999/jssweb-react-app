import { React, useRef } from "react"
import './Sponsor.css'
import jssLogo from './assets/img/logo.png';


function Sponsor() {


  return (
    <div className="sponsor">
        <h1>JCF 2023 Sponsors</h1>
        <p>Japanese Cultural Festival 2023 is proudly sponsored by:</p>
        
        <h1>Platinum Sponsors:</h1>
        <div className="sponsor-container">
          <div className="sponsor-plat">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
          <div className="sponsor-plat">
            <img src="https://placekitten.com/123/414" alt="" />
          </div>
          <div className="sponsor-plat">
            <img src="https://placekitten.com/400/200" alt="" />
          </div>
        </div>

        <h2>Gold Sponsors:</h2>
        <div className="sponsor-container">
          <div className="sponsor-gold">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
          <div className="sponsor-gold">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
          <div className="sponsor-gold">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
          <div className="sponsor-gold">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
        </div>

        <h2>Silver Sponsors:</h2>
        <div className="sponsor-container">
          <div className="sponsor-silver">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
          <div className="sponsor-silver">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
          <div className="sponsor-silver">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
          <div className="sponsor-silver">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
          <div className="sponsor-silver">
            <img src="https://placekitten.com/300/500" alt="" />
          </div>
        </div>
    </div>
  )
}

export default Sponsor
import {React, useRef} from "react"
import './Landing.css'
import backgroundImg from './assets/img/background.jpg';
import jssLogoLarge from './assets/img/logolarge.png';
import {useNavigate} from "react-router-dom";
import SocialIcons from "../reusable/socialIcons/SocialIcons";
import Modal from "../reusable/modal/Modal";

function Landing() {

  const navigate = useNavigate();



  return (
    <div className="landing">
      <div className="landing-jss-info">
        <img src={jssLogoLarge}
          alt=""/>
        <br/>
        <span>NUS Japanese Studies Society</span>
        <br/>
        <SocialIcons />
        <Modal />
      </div>
      <div>
        <button type="button" className="join-us-btn" onClick={() => navigate("./signup")}>Join Us!</button>
      </div>
    </div>
  )
}

export default Landing

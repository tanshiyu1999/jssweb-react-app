import {React, useRef} from "react"
import './Landing.css'
import backgroundImg from './assets/img/background.jpg';
import jssLogoLarge from './assets/img/logolarge.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {useNavigate} from "react-router-dom";

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
        <div className="landing-icons-container">
          <div className="icon-container">
            <FacebookIcon className="social-icon" />
          </div>
          <div className="icon-container">
            <InstagramIcon className="social-icon" />
          </div>
          <div className="icon-container">
            <YouTubeIcon className="social-icon" />
          </div>

        </div>
      </div>
      <div>
        <button type="button" className="join-us-btn" onClick={() => navigate("./signup")}>Join Us!</button>
      </div>
    </div>
  )
}

export default Landing

import { React, useRef } from "react"
import './Landing.css'
import backgroundImg from './assets/img/background.jpg';
import jssLogoLarge from './assets/img/logolarge.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Landing() {


  return (
    <div className="landing">
        <img src={backgroundImg} className="landing-img" />
        <div className="landing-jss-info">
          <img src={jssLogoLarge} alt="" />
          <br/>
          <span>NUS Japanese Studies Society</span>
          <br/>
          <div className="landing-icons">
            <FacebookIcon />
            <InstagramIcon />
            <YouTubeIcon />
          </div>
        </div>
    </div>
  )
}

export default Landing
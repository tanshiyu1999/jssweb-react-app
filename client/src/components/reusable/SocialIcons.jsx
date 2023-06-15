import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './SocialIcons.css'

// The CSS is in landing.css
const SocialIcons = () => {
  return (
    <div className="landing-icons-container">
      <a href="https://www.facebook.com/nusjss" target="_blank">
        <div className="icon-container">
          <FacebookIcon className="social-icon" />
        </div>
      </a>
      <a href="https://www.instagram.com/nusjss/" target="_blank">
        <div className="icon-container">
          <InstagramIcon className="social-icon" />
        </div>
      </a>
      <a href="https://www.youtube.com/channel/UCv_80MfvRmCPEFvRUZ5Frng" target="_blank">
        <div className="icon-container">
          <YouTubeIcon className="social-icon" />
        </div>
      </a>
    </div>
  )
}

export default SocialIcons
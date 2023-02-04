import { React, useRef } from "react"
import './Navbar.css'
import Button from '@mui/material/Button';
import NavItem from './NavItem.jsx'
import jssLogo from './assets/img/logo.png';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const toggleBurger = () => {
    if (!document.querySelector(".nav-burger").classList.contains('active')) {
      document.querySelector(".nav-burger").classList.add('active');
      document.querySelector(".nav-menu").classList.add('active');
    } else {
      document.querySelector(".nav-burger").classList.remove('active');
      document.querySelector(".nav-menu").classList.remove('active');
    }
  } 

  return (
    <nav className="nav-main">
      <div className="nav-spacer-side"></div>
      <img src={jssLogo} alt="JSS Logo" className="nav-org-logo"></img>
      <div className="nav-spacer-center"></div>
      <ul className="nav-menu">
        <li className="nav-item">About</li>
        <li className="nav-item">Sub-Club</li>
        <li className="nav-item">Events</li>
        <li className="nav-item">Sponsors</li>
        <li className="nav-item">Contact</li>
      </ul>

      <div className="nav-spacer-side"></div>

      <div className="nav-burger" onClick={toggleBurger}>
        <span className="nav-burger-bar"></span>
        <span className="nav-burger-bar"></span>
        <span className="nav-burger-bar"></span>
      </div>
    </nav>

  )
}

export default Navbar
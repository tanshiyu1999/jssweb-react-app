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
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink" id="mainNav">
        <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="img/logo.png" /></a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fa fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav text-uppercase ml-auto">
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#aboutCarousel">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#sub">Sub-Clubs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#events">Events</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#sponsors">Sponsors</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

  )
}

export default Navbar
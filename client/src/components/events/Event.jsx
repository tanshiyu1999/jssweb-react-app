import { React, useRef } from "react"
import './Event.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventCard from "./EventCard.jsx"
import backgroundImg from './assets/img/background.jpg';


function Event() {

  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <div>
      <EventCard number={number}/>
    </div>
    
  );


  return (
    <div className="event">
      <div className="event-carousell">
        EVENT CAROUSELL
      </div>
      <div className="event-main">
        <nav className="event-nav">
          <div className="event-nav-item">All</div>
          <div className="event-nav-item">Flagship</div>
          <div className="event-nav-item">Monthly</div>
          <div className="event-nav-item">University Visit</div>
          <div className="event-nav-item">Book Club</div>
          <div className="event-nav-item">BnS</div>
          <div className="event-nav-item">Sub-Club</div>
        </nav>
        <div className="event-content">
          <div className="event-content-card-container">
            {listItems}
          </div>
          <div className="event-content-writeup-container">
            <img src={backgroundImg} alt="" className="event-content-writeup-img" />
            <div className="event-content-writeup"><span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore dolores deserunt aperiam tenetur soluta facilis, totam, nesciunt dolorem magnam voluptate minima? Ratione, excepturi? Repellendus quos fugiat, reprehenderit accusantium ad eligendi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, molestiae? Quam expedita tenetur tempora culpa inventore blanditiis, maiores perferendis incidunt optio? Cumque ipsam deleniti praesentium autem molestias. Amet, consequatur facere!</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event
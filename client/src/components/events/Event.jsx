import { React, useRef, createContext, useState } from "react"
import './Event.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventCard from "./EventCard.jsx"
import backgroundImg from './assets/img/background.jpg';
import { eventTypeParser } from "./script/parser";
import EventInfo from "./EventInfo";
import $ from 'jquery';
import EventCarousel from "./EventCarousel";



export const InfoContext = createContext();

function Event(props) {

  const loaderData = props.data

  const [currentInfo, setCurrentInfo] = useState(loaderData[0]);

  const updateInfo = (str, id, e) => {
    console.log(e.target)
    $(".active-card").removeClass("active-card")
    $(e.target).addClass("active-card")    
    for (let i = 0; i < loaderData.length; i++) {
      if (loaderData[i].event_img == str) {
        setCurrentInfo(loaderData[i]);
        break;
      }
    }
  }



  const changeCurrentType = (e) => {
    // Some of my most Jank Code
    $(".active-tab").removeClass("active-tab")
    $(e.target).addClass("active-tab")
    setCurrentType(e.target.getAttribute('name'));
  }
  
  const [currentType, setCurrentType] = useState("all");
  const eventTypes = ["All", "Flagship", "Monthly", "University Visit", "Book Club", "BnS", "Subclub"];
  

  const typesCard = eventTypes.map((type) => {
    return (
      <div className={`event-nav-item ${ (type == "All") ? 'active-tab' : ''}`} name={eventTypeParser(type)} key={eventTypeParser(type)} onClick={changeCurrentType}>{type}</div>
    );
  })




  const eventsCards = loaderData.map((event) => {
    if (currentType == "all" || currentType == event.event_type) {
      return (
        <EventCard 
          key={event.event_img} 
          image={event.event_img}
          title={event.event_title}
          type={event.event_type}
          eventStart={event.event_start_date}
          eventEnd={event.event_end_date}
          updateInfo={updateInfo}
          id={event.event_id}
          active={event == loaderData[0] ? "active-card" : ''}
        />
        )
    }
  });

  return (
    <div className="event">
      <h1>EVENTS</h1>
      <p>Join our exciting programmes!</p>
  
      <div className="event-carousell-container">
        <EventCarousel />
      </div>
      <div className="event-main">
        <nav className="event-nav">
          {typesCard}
        </nav>
        <div className="event-content">
          <div className="event-content-card-container">
            {eventsCards}
          </div>
          <InfoContext.Provider value={currentInfo} >
            <EventInfo />
          </InfoContext.Provider>
        </div>  
      </div>
    </div>
  )
}

export default Event
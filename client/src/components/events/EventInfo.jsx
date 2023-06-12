import { React, useRef, useContext } from "react"
import './Event.css'
import { InfoContext } from "./Event";

function EventInfo() {
    
  const currentInfo = useContext(InfoContext);

  const {imageUrl, event_description, event_link } = currentInfo;
  // console.log(currentInfo)
  
  const handleClick = () => {
    const isHttpLink = event_link.match(/^https:/i);
    window.open(
      `${isHttpLink ? event_link : `https://${event_link}`}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  return (
    <div className="event-content-writeup-container">
      { currentInfo && 
        <img src={imageUrl} alt="" className="event-content-writeup-img" /> 
      }
      { currentInfo && 
        <div className="event-content-writeup">
          <span>
              {event_description}
          </span>
        </div> 
      }

      {
        event_link && 
        <div className="event-content-link">
          <button className="event-content-link-button" onClick={handleClick}>Learn more!</button>
        </div>
      }
    </div>
  )
}

export default EventInfo
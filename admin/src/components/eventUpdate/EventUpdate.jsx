import { React, useRef, createContext, useState } from "react"
import './Event.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventCard from "./EventCard.jsx"
import backgroundImg from './assets/img/background.jpg';
import EventUpdateForm from "./AddEvent";
import { useLoaderData, Outlet, Link } from "react-router-dom";
import EventInfo from "./EventInfo";
import { Button } from "@mui/material";

let currentInfo = null;
export const InfoContext = createContext();

function EventUpdate() {

  const loaderData = useLoaderData();

  const [currentInfo, setCurrentInfo] = useState(loaderData[0]);
  // console.log(new Date(loaderData[0].event_start_date).getTime()); <-- use this data to the sorting algo


  const updateInfo = (str) => {
    for (let i = 0; i < loaderData.length; i++) {
      if (loaderData[i].event_img == str) {
        setCurrentInfo(loaderData[i]);
        break;
      }
    }
  }

  const eventsCards = loaderData.map((event) => {
    return (
      <EventCard 
        key={event.event_img} 
        image={event.event_img}
        title={event.event_title}
        type={event.event_type}
        eventStart={event.event_start_date}
        eventEnd={event.event_end_date}
        updateInfo={updateInfo}
      />
      )
  });



  
  return (
    <div className="event">  
      <Button component={Link} to="./addevent" variant="contained">Add Event</Button>

      {/* <div className="event-carousell">
        EVENT CAROUSELL
      </div> */}
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
            {eventsCards}
          </div>
          <InfoContext.Provider value={currentInfo} >
            <EventInfo />
          </InfoContext.Provider>
        </div>  
      </div>

      <Outlet />
    </div>
  )
}

export default EventUpdate


/* -------------------- Loader Start -------------------- */
export async function loaderInput() {
  try {
    let output = null;
    const res = await fetch("http://localhost:3000/eventUpdate")
      .then(res => res.json())
      .then(data => {
        output = data
      })
    return output;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
/* -------------------- Loader End -------------------- */


/* -------------------- Action Start -------------------- */
export async function action({request}) {
  try {
    const data = await request.formData();
    let intent = data.get('intent');
    if (intent === 'delete') {
      let imgName = data.get('imgName');
      const res = await fetch(
        "http://localhost:3000/eventUpdate", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              url: imgName,
            })
        }
      );
    }
  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Action End -------------------- */
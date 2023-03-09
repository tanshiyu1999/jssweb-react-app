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
import { eventTypeParser } from "./script/parser";

let currentInfo = null;
export const InfoContext = createContext();
export const FilteredEventContext = createContext();

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


  const changeCurrentType = (e) => {
    setCurrentType(e.target.getAttribute('name'));
  }
  
  const [currentType, setCurrentType] = useState("all");


  const eventTypes = ["All", "Flagship", "Monthly", "University Visit", "Book Club", "BnS", "Subclub"];
  const typesCard = eventTypes.map((type) => {
    return (
      <div className="event-nav-item" name={eventTypeParser(type)} key={eventTypeParser(type)} onClick={changeCurrentType}>{type}</div>
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
        />
        )
    }

  });

  



  return (
    <div className="event">  
      <Button component={Link} to="./addevent" variant="contained">Add Event</Button>

      {/* <div className="event-carousell">
        EVENT CAROUSELL
      </div> */}
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




{/* <MenuItem value='flagship'>Flagship</MenuItem>
    <MenuItem value='monthly'>Monthly</MenuItem>
    <MenuItem value='university-visit'>University Visit</MenuItem>
    <MenuItem value='book-club'>Book Club</MenuItem>
    <MenuItem value='bns'>BnS</MenuItem>
    <MenuItem value='subclub'>Subclubs</MenuItem> 
*/}
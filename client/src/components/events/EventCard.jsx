import { React, useRef } from "react"
import './Event.css'
import { dateDataToDate } from "./script/parser"

function EventCard(props) {


  const {
    title, type, eventStart, eventEnd, image, id, active
  } = props;


  return (
    <div className={`event-card ${id} ${active}`} onClick={(e) => props.updateActiveCard(image, id, e)}>
      <div className="event-title .unselectable">
        <span>{props.title}</span>
      </div>
      <div className="event-date">
        <span>{dateDataToDate(props.eventStart)}</span>
        { eventEnd != eventStart ? <span> - {dateDataToDate(eventEnd)}</span> : <></> }
      </div>
    </div>
  )
}

export default EventCard
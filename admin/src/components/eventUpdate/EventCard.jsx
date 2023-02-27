import { React, useRef } from "react"
import './Event.css'

function EventCard(props) {


  return (
    <div className="event-card">
        EVENT CARD {props.number}
    </div>
  )
}

export default EventCard
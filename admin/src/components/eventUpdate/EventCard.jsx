import { React, useRef, useContext } from "react"
import './Event.css'
import { Form, Link } from "react-router-dom"
import { Button } from "@mui/material"

function EventCard(props) {
  return (
    <div className="event-card" onClick={() => props.updateInfo(props.image)}>
      <Form>
        <p value="wewe" name= "weae">{props.title}</p>
        <p>{props.eventStart}</p>
        <p>{props.type}</p>
        <Button component={Link} to={`./${props.image}/edit`} variant="contained">Edit</Button>
        <Button type="submit" name="intent" value='delete' variant="contained" color="error">Action Delete</Button>
      </Form>
    </div>
  )
}

export default EventCard



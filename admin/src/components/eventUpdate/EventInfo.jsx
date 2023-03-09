import { React, useRef, useContext } from "react"
import './Event.css'
import { InfoContext } from "./EventUpdate";

function EventInfo() {
    
    const currentInfo = useContext(InfoContext);

    return (
        <div className="event-content">
            <div className="event-content-writeup-container">
                { currentInfo && 
                    <img src={currentInfo.imageUrl} alt="" className="event-content-writeup-img" /> 
                }
                { currentInfo && 
                    <div className="event-content-writeup">
                        <span>
                            {currentInfo.event_description}
                        </span>
                    </div> 
                }
                
            </div>
        </div>

    )
}

export default EventInfo
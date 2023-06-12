import {React, useRef} from "react"
import './SubClub.css'
import SubClubCard from "./SubClubCard";

function SubClub(props) {

  const subclubData = props.data;
  
  const subclubCards = subclubData.map((data) => {
    return (
      <SubClubCard 
        key={data.subclub_id}
        name={data.subclub_name}
        description={data.subclub_desc}
        image={data.imageUrl}
        url={data.subclub_url}
      />
    )
  
  });


  return (
    <div className="subclub">
      <h1>SUB-CLUBS</h1>
      <div className="subclub-text">
        <span>Japan perfectly balances the ultramodern with respected tradition. Explore its rich culture by joining our sub-clubs.</span>
        <br/>
        <span>To find out more, click on the logos below!</span>
      </div>
      <div className="subclub-container">
        {subclubCards}
      </div>
    </div>
  )
}

export default SubClub

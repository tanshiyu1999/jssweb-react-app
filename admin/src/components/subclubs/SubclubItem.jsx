import React from "react"

function SubclubItem(props) {


  
  return (
    <div className="subclub-item">
      <img src={props.url} alt="" className="item-image" />
      <h3>{props.name}</h3>
      <p>{props.desc}</p>

      
      <button onClick={props.handleDelete} name={props.imgName} >Delete</button>
    </div>
  )
}

export default SubclubItem
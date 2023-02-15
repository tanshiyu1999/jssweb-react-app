import React from "react"
import { Form, Link } from "react-router-dom"

// makes the image url a global variable

function SubclubItem(props) {
  return (
    <div className="subclub-item" >
      <Form method="post" action="./">
        <img src={props.url} alt="" className="item-image" />
        <h3>{props.name}</h3>
        <p>{props.desc}</p>
        <input type="text" name="imgName" value={props.imgName} className="to-hide" readOnly ></input>
        <Link to={`./${props.imgName}/edit`}>Edit</Link>
        <button type="submit" name="intent" value='delete'>Action Delete</button>
      </Form>
    </div>
  )
}

export default SubclubItem



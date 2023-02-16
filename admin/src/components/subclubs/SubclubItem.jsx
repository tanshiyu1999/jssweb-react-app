import React from "react"
import { Form, Link } from "react-router-dom"
import { Button } from "@mui/material"

// makes the image url a global variable

function SubclubItem(props) {
  return (
    <div className="subclub-item" >
      <Form method="post" action="./">
        <img src={props.url} alt="" className="item-image" />
        <h3>{props.name}</h3>
        <p>{props.desc}</p>
        <input type="text" name="imgName" value={props.imgName} className="to-hide" readOnly ></input>
        <Button component={Link} to={`./${props.imgName}/edit`} variant="contained">Edit</Button>
        <Button type="submit" name="intent" value='delete' variant="contained" color="error">Action Delete</Button>
      </Form>
    </div>
  )
}

export default SubclubItem



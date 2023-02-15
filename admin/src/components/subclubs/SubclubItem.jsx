import React from "react"
import { Form } from "react-router-dom"

// makes the image url a global variable
let url = null;

function SubclubItem(props) {
  url = props.imgName;
  return (
    <div className="subclub-item" >
      <p>is it here</p>
      <Form method="post" action="./">
        <img name="hello" src={props.url} alt="" className="item-image" />
        <h3>{props.name}</h3>
        <p>{props.desc}</p>
        <button type="submit">Action Delete</button>
      </Form>
    </div>
  )
}

export default SubclubItem

export async function action() {
  try {
    const res = await fetch(
      "http://localhost:3000/subclubs", {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            url: url,
          })
      }
    );
  } catch (err) {
    console.error(err.message)
  }
  return null;
}


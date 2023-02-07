import React from "react"

function SubclubItem(props) {

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/subclubs", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              url: props.imgName,
            })
        }
      );
            
    } catch (err) {
      console.err(err.message)
      
    }

    
  }

  
  return (
    <div className="subclub-item">
      <img src={props.url} alt="" className="item-image" />
      <h1>{props.name}</h1>
      <p>{props.desc}</p>
      
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default SubclubItem
import React from "react"
import { Form } from "react-router-dom"

// makes the image url a global variable

function SubclubItem(props) {
  return (
    <div className="subclub-item" >
      <Form method="post" action="./">
        <img src={props.url} alt="" className="item-image" />
        <h3>{props.name}</h3>
        <p>{props.desc}</p>
        <input type="text" name="imgName" value={props.imgName} className="to-hide" readOnly ></input>
        <button type="submit" name="intent" value='delete'>Action Delete</button>
      </Form>
    </div>
  )
}

export default SubclubItem

// export async function action({request}) {
//   try {
//     let data = await request.formData();
//     let intent = data.get('intent');
//     let imgName = data.get('imgName')
//     console.log(imgName)
//     if (intent === 'delete') {
//       const res = await fetch(
//         "http://localhost:3000/subclubs", {
//             method: "DELETE",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//               url: imgName,
//             })
//         }
//       );
//     }
//   } catch (err) {
//     console.error(err.message)
//   }
//   return null;
// }


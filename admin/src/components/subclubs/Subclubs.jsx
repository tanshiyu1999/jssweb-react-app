import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Subclubs.css'
import SubclubItem from "./SubclubItem"
import { useLoaderData } from "react-router-dom"
import { 
  Form, 
  Outlet, 
  Link 
} from "react-router-dom"


let uploadFile = null;

function Subclubs() {

  const loaderData = useLoaderData();

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    name: "NAME FIELD",
    url: "URL FIELD",
    desc: "DESC FIELD"
  });

  const { name, url, desc } = textData;

  const [subclubsData, setSubclubsData] = useState([]); 

  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file)
    uploadFile = file;
  }

  
  const listItems = loaderData.map((data) => {
    return <SubclubItem className="subclub-item"
                        key={data.subclub_id} 
                        name={data.subclub_name} 
                        desc={data.subclub_desc} 
                        url={data.imageUrl} 
                        cluburl={data.subclub_url} 
                        imgName={data.subclub_img} />
  });

  

  return (
    <div className="subclub-route-container">
      <Form method="post" style={{width:650}} className="form-submit-input">
        <input type="text" placeholder='name' name="name" value={name} onChange={e => onChange(e)} ></input>
        <input type="text" placeholder='url' name="url" value={url} onChange={e => onChange(e)} ></input>
        <textarea type="text" placeholder='description' name="desc" value={desc} onChange={e => onChange(e)} ></textarea>
        <input onChange={fileSelected} type="file" name="image" accept="image/*" required></input>
        <button type="submit" name="intent" value='add'>Submit</button>
      </Form>

      <Outlet> 
        
      </Outlet>

      <div className="subclub-container">
        {listItems}
      </div>
    </div>
  );
}



export default Subclubs


/* -------------------- Action Start -------------------- */
export async function action({request}) {
  try {
    const data = await request.formData();
    let intent = data.get('intent');
    if (intent === 'add') {
      data.append("image", uploadFile);
        await axios.post("http://localhost:3000/subclubs", 
          data, 
          { headers: {'Content-Type': 'multipart/form-data'}}
        )
    } else if (intent === 'delete') {
      let imgName = data.get('imgName')
      const res = await fetch(
        "http://localhost:3000/subclubs", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              url: imgName,
            })
        }
      );
    }
  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Action End -------------------- */

/* -------------------- Loader Start -------------------- */
export async function loaderInput() {
  try {
    let output = null;
    const res = await fetch("http://localhost:3000/subclubs")
      .then(res => res.json())
      .then(data => {
        output = data
      })
    return output;
  } catch (err) {
    console.error(err.message);
  }
}
/* -------------------- Loader End -------------------- */


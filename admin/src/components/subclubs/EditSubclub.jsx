import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Subclubs.css'
import SubclubItem from "./SubclubItem"
import { useLoaderData, redirect } from "react-router-dom"
import { 
  Form, 
} from "react-router-dom"



let uploadFile = null;
function EditSubclub() {

  const loaderData = useLoaderData();

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    name: loaderData.subclub_name,
    url: loaderData.subclub_url,
    desc: loaderData.subclub_desc,
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
  return (
    <div className="subclub-edittor">
        <Form method="post" style={{width:650}} className="form-submit-input">
            <img src={loaderData.imageUrl} alt="" className="item-image" />
            <input onChange={fileSelected} type="file" name="image" accept="image/*"></input>
            <input type="text" placeholder='name' name="name" value={name} onChange={e => onChange(e)} ></input>
            <input type="text" placeholder='url' name="url" value={url} onChange={e => onChange(e)} ></input>
            <textarea type="text" placeholder='description' name="desc" value={desc} onChange={e => onChange(e)} ></textarea>
            <input type="text" name="aws" value={loaderData.subclub_img} className="to-hide" readOnly />
            <button name="intent" value="cancel">Cancel</button>
            <button name="intent" value="update">Update</button>
        </Form>
    </div>
  );
}

export default EditSubclub

/* -------------------- Action Start -------------------- */
export async function action({request}) {
    try {
      const data = await request.formData();
      let intent = data.get('intent');
      if (intent === 'update') {
        if (uploadFile) {data.append("image", uploadFile)}
        await axios.patch("http://localhost:3000/subclubs/", 
            data, 
            { headers: {'Content-Type': 'multipart/form-data'}}
        )
        
        return redirect("/subclubs")

      } else if (intent === 'cancel') {
        return redirect("/subclubs")
      }
    } catch (err) {
      console.error(err.message);
    }
    return null;
  }
  /* -------------------- Action End -------------------- */

  /* -------------------- Loader Start -------------------- */
export async function loader({params}) {
  try {
    let output = null;
    const res = await fetch("http://localhost:3000/subclubs")
      .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          if (item.subclub_img == params.subclubId) {
              output = item;
          }
        })
      })
    return output;
  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Loader End -------------------- */
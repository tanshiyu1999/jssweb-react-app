import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Subclubs.css'
import SubclubItem from "./SubclubItem"
import { useLoaderData } from "react-router-dom"
import { Form } from "react-router-dom"



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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     formData.append("name", name);
  //     formData.append("url", url);
  //     formData.append("desc", desc);

  //     // console.log(formData)

  //     await axios.post("http://localhost:3000/subclubs", formData, { headers: {'Content-Type': 'multipart/form-data'}});

  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file)
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
        <input onChange={fileSelected} type="file" name="image" accept="image/*"></input>
        <button type="submit">Submit</button>
      </Form>

      <div className="subclub-container">
        {listItems}
      </div>

    </div>
  );
}



export default Subclubs

export async function action({request}) {
  try {
    const data = await request.formData();
    console.log(data)

    // const formData = new FormData();
    // formData.append("image", file);
    // formData.append("name", name);
    // formData.append("url", url);
    // formData.append("desc", desc);

    // console.log(formData)
    // await axios.post("http://localhost:3000/subclubs", formData, { headers: {'Content-Type': 'multipart/form-data'}});
  } catch (err) {
    console.error(err.message);
  }
}


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


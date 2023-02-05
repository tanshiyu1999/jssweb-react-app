import React, {useState, useEffect} from 'react';
import axios from 'axios'

const fileSelected = () => {
  return null;
}

const handleSubmit = (e) => {
  e.preventDefault();
}



function Subclubs() {

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    name: "NAME FIELD",
    url: "URL FIELD",
    desc: "DESC FIELD"
  });

  const { name, url, desc } = textData;

  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", name);
      formData.append("url", url);
      formData.append("desc", desc);

      // console.log(formData)

      await axios.post("http://localhost:3000/subclubs", formData, { headers: {'Content-Type': 'multipart/form-data'}});
      
      // const response = await fetch("http://localhost:3000/subclubs", {
      //     method: "POST",
      //     headers: {"Content-Type": "multipart/form-data"},
      //     body: JSON.stringify(formData)
      // });

      // just upload image to cloud, cloud returns me the bloody url
      // i use the bloody url and push it into my database. 

      
    } catch (err) {
      console.log("Here at Subclubs")
      console.error(err.message);
    }
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{width:650}} className="flex flex-col space-y-5 px-5 py-14">
        <input type="text" placeholder='name' name="name" value={name} onChange={e => onChange(e)} ></input>
        <input type="text" placeholder='url' name="url" value={url} onChange={e => onChange(e)} ></input>
        <input type="text" placeholder='description' name="desc" value={desc} onChange={e => onChange(e)} ></input>
        <input onChange={fileSelected} type="file" name="image" accept="image/*"></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}



export default Subclubs


// subclub_id SERIAL PRIMARY KEY,
// subclub_name VARCHAR(255) NOT NULL,
// subclub_url VARCHAR(255),
// subclub_desc TEXT,
// subclub_img 

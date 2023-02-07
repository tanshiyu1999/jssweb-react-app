import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Subclubs.css'
import SubclubItem from "./SubclubItem"

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

  const [subclubsData, setSubclubsData] = useState([]); 




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

      await axios.get("http://localhost:3000/subclubs")
                 .then(res => {
                  setSubclubsData(res.data);
                 })
                 .catch(err => {
                  console.log(err.message)
                 })

    } catch (err) {
      console.error(err.message);
    }
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file)
  }



  useEffect( () => {
    const fetchData = () => {
      axios.get("http://localhost:3000/subclubs")
                  .then(res => {
                    // console.log("-------start--------")
                    // console.log(res.data);
                    // console.log(subclubsData)
                    // console.log("--------end--------")
                    setSubclubsData([...res.data]);
                    // console.log(subclubsData);
                  })
                  .catch(err => {
                    console.log(err.message)
                  })
    }
    fetchData();

  }, [subclubsData].length);
  
  const listItems = subclubsData.map((data) => {
    return <SubclubItem key={data.subclub_id} 
                        name={data.subclub_name} 
                        desc={data.subclub_desc} 
                        url={data.imageUrl} 
                        cluburl={data.subclub_url} 
                        imgName={data.subclub_img}  />
  });

  return (
    <div>
      <form onSubmit={handleSubmit} style={{width:650}} className="flex flex-col space-y-5 px-5 py-14">
        <input type="text" placeholder='name' name="name" value={name} onChange={e => onChange(e)} ></input>
        <input type="text" placeholder='url' name="url" value={url} onChange={e => onChange(e)} ></input>
        <input type="text" placeholder='description' name="desc" value={desc} onChange={e => onChange(e)} ></input>
        <input onChange={fileSelected} type="file" name="image" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>

      {listItems}



    </div>
  );
}



export default Subclubs


// subclub_id SERIAL PRIMARY KEY,
// subclub_name VARCHAR(255) NOT NULL,
// subclub_url VARCHAR(255),
// subclub_desc TEXT,
// subclub_img 

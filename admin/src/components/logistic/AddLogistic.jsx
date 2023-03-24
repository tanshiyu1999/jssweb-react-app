import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Logistic.css'
import { 
  Form, 
  Outlet, 
  Link 
} from "react-router-dom"
import { TextField, Input, Button } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { redirect } from "react-router-dom"
import { Box }  from '@mui/material';
import { bgcolor } from '@mui/system';

let uploadFile = null;

function AddLogistic() {

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    name: "Lostic Name",
    location: "Logistic Location",
    desc: "the description",
    quantity: "214124",
  });

  const { name, location, desc, quantity } = textData;


  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file)
    uploadFile = file;
  }

  return (
    <Box sx={{bgcolor: "pink"}}>
      <Form method="post" style={{width:650}} className="form-submit-input">
        <TextField type="text" name="name" value={name} onChange={e => onChange(e)} label="Name" variant="outlined" />
     
        <TextField type="text" name="location" value={location} onChange={e => onChange(e)} label='Location' variant="outlined" />
        
        
        <TextField type="number" name="quantity" value={quantity} onChange={e => onChange(e)} label='Quantity' variant="outlined" />

        <TextField type="text" name="desc" value={desc} onChange={e => onChange(e)} label='Description' variant="outlined" multiline rows={4} />

        <Button variant="contained" component="label">
            Upload Img
            <span hidden>
                <input onChange={fileSelected} type="file" name="image" accept="image/*" />
            </span>
        </Button>

        <Button type="submit" component={Link} to="/logistic" variant="outlined">Cancel</Button>
        <Button type="submit" name="intent" value='add'color="success" variant="contained">Submit</Button>

      </Form>
    </Box>
    );
}

export default AddLogistic

/* -------------------- Action Start -------------------- */
export async function action({request}) {
  try {
    const data = await request.formData();
    let intent = data.get('intent');
    if (intent === 'add') {
      data.append("image", uploadFile);
      await axios.post("http://localhost:3000/logistic", 
        data, 
        { headers: {'Content-Type': 'multipart/form-data'}}
      )
      return redirect("/logistic");
    } 
  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Action End -------------------- */
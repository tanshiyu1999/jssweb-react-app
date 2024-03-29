import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Event.css'
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

let uploadFile = null;

function AddEvent() {

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    title: "The Title",
    url: "The URL",
    desc: "The Description"
  });

  const { title, url, desc } = textData;


  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file)
    uploadFile = file;
  }


  const [eventType, setEventType] = useState('flagship');

  const handleEventType = (event) => {
    setEventType(event.target.value);
  };  

  return (
      <div className="subclub-route-container">
        <Form method="post" style={{width:650}} className="form-submit-input">
          <TextField type="text" name="title" value={title} onChange={e => onChange(e)} label="Event Title" variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="event-type-select-label">Event Type</InputLabel>
            <Select labelId="event-type-select-label" id="event-type-select" name="eventType" value={eventType} label="Event Type" 
              onChange={handleEventType} required
            >
              <MenuItem value='flagship'>Flagship</MenuItem>
              <MenuItem value='monthly'>Monthly</MenuItem>
              <MenuItem value='university-visit'>University Visit</MenuItem>
              <MenuItem value='book-club'>Book Club</MenuItem>
              <MenuItem value='bns'>BnS</MenuItem>
              <MenuItem value='subclub'>Subclubs</MenuItem>
            </Select>
          </FormControl>
          <TextField type="text" name="url" value={url} onChange={e => onChange(e)} label='Event URL' variant="outlined" />
          <TextField type="text" name="desc" value={desc} onChange={e => onChange(e)} label='Description' variant="outlined" 
            multiline rows={4} 
          />

          <input type="date" name="startDate" required /> 
          <input type="date" name="endDate" required /> 

          <input hidden label='Subclub Image' onChange={fileSelected} type="file" name="image" accept="image/*" required/>
          <Button type="submit" component={Link} to="/eventUpdate" variant="outlined">Cancel</Button>
          <Button type="submit" name="intent" value='add'color="success" variant="contained">Submit</Button>
 
        </Form>
      </div>
  );
}

export default AddEvent

/* -------------------- Action Start -------------------- */
export async function action({request}) {
  try {
    const data = await request.formData();
    let intent = data.get('intent');
    if (intent === 'add') {
      data.append("image", uploadFile);
      await axios.post("http://localhost:3000/eventUpdate", 
        data, 
        { headers: {'Content-Type': 'multipart/form-data'}}
      )
      console.log("to direct")
      return redirect("/eventUpdate");
    } 
  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Action End -------------------- */
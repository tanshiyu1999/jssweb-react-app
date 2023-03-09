import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Event.css'
import { useLoaderData, redirect } from "react-router-dom"
import { 
  Form, 
} from "react-router-dom"
import { TextField, Input, Button } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { dateDataToDate } from './script/parser';


let uploadFile = null;
function EditEvent() {

  const loaderData = useLoaderData();

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    title: loaderData.event_title,    
    url: loaderData.event_link,
    desc: loaderData.event_description,
    eventType: loaderData.event_type,
    startDate: dateDataToDate(loaderData.event_start_date),
    endDate: dateDataToDate(loaderData.event_end_date)
  });

  const { title, url, desc, eventType, startDate, endDate } = textData;


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
    <div className="event-edittor">
        <Form method="post" style={{width:650}} className="form-submit-input">
          <img src={loaderData.imageUrl} alt="" className="item-image" />
          <input onChange={fileSelected} type="file" name="image" accept="image/*"></input>
          <TextField type="text" name="title" value={title} onChange={e => onChange(e)} label="Event Title" variant="outlined" />
          <FormControl fullWidth>
            <InputLabel id="event-type-select-label">Event Type</InputLabel>
            <Select labelId="event-type-select-label" id="event-type-select" name="eventType" value={eventType} label="Event Type" onChange={onChange} required>
              <MenuItem value='flagship'>Flagship</MenuItem>
              <MenuItem value='monthly'>Monthly</MenuItem>
              <MenuItem value='university-visit'>University Visit</MenuItem>
              <MenuItem value='book-club'>Book Club</MenuItem>
              <MenuItem value='bns'>BnS</MenuItem>
              <MenuItem value='subclub'>Subclubs</MenuItem>
            </Select>
          </FormControl>
          <TextField type="text" name="url" value={url} onChange={e => onChange(e)} label='Event URL' variant="outlined" />
          <TextField type="text" name="desc" value={desc} onChange={e => onChange(e)} label='Description' variant="outlined" multiline rows={4} />

          <input type="date" name="startDate" value={startDate} onChange={e => onChange(e)} required />
          <input type="date" name="endDate" value={endDate} onChange={e => onChange(e)} required />
          <input type="text" name="aws"  className="to-hide" value={loaderData.event_img} readOnly />
          <Button type="submit" name="intent" value="cancel" variant="outlined" >Cancel</Button>
          <Button type="submit" name="intent" value="update" variant="contained" >Update</Button>
        </Form>
    </div>
  );
}

export default EditEvent

/* -------------------- Action Start -------------------- */
export async function action({request}) {
    try {
      const data = await request.formData();
      let intent = data.get('intent');
      if (intent === 'update') {
        if (uploadFile) {data.append("image", uploadFile)}
        await axios.patch("http://localhost:3000/eventUpdate/", 
            data, 
            { headers: {'Content-Type': 'multipart/form-data'}}
        )
        return redirect("/eventUpdate")
      } else if (intent === 'cancel') {
        return redirect("/eventUpdate")
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
    const res = await fetch("http://localhost:3000/eventUpdate")
      .then(res => res.json())
      .then(data => {
        data.forEach(item => {
          if (item.event_img == params.eventId) {
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



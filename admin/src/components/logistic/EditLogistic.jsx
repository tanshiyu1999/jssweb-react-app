import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Logistic.css'
import { 
  Form, 
  Outlet, 
  Link 
} from "react-router-dom"
import { TextField, Input, Button } from '@mui/material';

import { redirect, useLocation, useNavigate } from "react-router-dom"
import { Box }  from '@mui/material';
import { bgcolor } from '@mui/system';

let uploadFile = null;

function EditLogistic() {
  const { state } = useLocation();
  const logisticData = state;
  console.log(logisticData)
  const navigate = useNavigate();
  if (!logisticData) {
    console.log("empty")
    navigate('/logistic')
    redirect('/logistic')
  }
  redirect('/logistic')
  



  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    name: logisticData.logistic_name,
    location: logisticData.logistic_location,
    desc: logisticData.logistic_description,
    quantity: logisticData.logistic_quantity,
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
            Change Img
            <span hidden>
                <input onChange={fileSelected} type="file" name="image" accept="image/*" />
            </span>
        </Button>

        <Button type="submit" component={Link} to="/logistic" variant="outlined">Cancel</Button>
        <Button type="submit" name="intent" value='update'color="success" variant="contained">Submit</Button>

      </Form>
    </Box>
    );
}

export default EditLogistic;

/* -------------------- Action Start -------------------- */
export async function action({request}) {
    try {
      const data = await request.formData();
      let intent = data.get('intent');
      if (intent === 'update') {
        if (uploadFile) {data.append("image", uploadFile)}
        await axios.patch("http://localhost:3000/logistic", 
            data, 
            { headers: {'Content-Type': 'multipart/form-data'}}
        )
        return redirect("/logistic")
      } else if (intent === 'cancel') {
        return redirect("/logistic")
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


  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Loader End -------------------- */

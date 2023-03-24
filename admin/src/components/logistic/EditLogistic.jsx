import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Logistic.css'
import { 
  Form, 
  Outlet, 
  Link 
} from "react-router-dom"
import { TextField, Input, Button } from '@mui/material';

import { redirect, useLocation, useNavigate, Navigate } from "react-router-dom"
import { Box }  from '@mui/material';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { maybe } from './script/maybe';



let uploadFile = null;

function EditLogistic() {
  const { state } = useLocation();
  const logisticData = state;
  // console.log(logisticData);


  if (!logisticData) {
    return <Navigate to="/logistic" replace />;
  }

  

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    name: maybe(logisticData.logistic_name),
    location: maybe(logisticData.logistic_location),
    desc: maybe(logisticData.logistic_description),
    quantity: maybe(logisticData.logistic_quantity),
    borrowedBy: maybe(logisticData.logistic_borrowed_by),
    status: maybe(logisticData.logistic_status),
  });

  const { name, location, desc, quantity, borrowedBy, status } = textData;

  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file)
    uploadFile = file;
  }

  const [borrowFrom, setBorrowFrom] = useState(maybe(logisticData.logistic_borrow_from));
  const handleBorrowForm = (newValue) => {
    setBorrowFrom(new Date().toISOString(newValue.$d).slice(0,10));
  };

  const [borrowTo, setBorrowTo] = useState(maybe(logisticData.logistic_borrow_to));
  const handleBorrowTo = (newValue) => {
    setBorrowTo(new Date().toISOString(newValue.$d).slice(0,10));
  };

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
        <FormControl fullWidth>
          <InputLabel id="status-type-select-label">Status</InputLabel>
          <Select labelId="status-type-select-label" id="status-type-select" name="status" value={status} label="Status Type" onChange={onChange} required>
            <MenuItem value='Available'>Available</MenuItem>
            <MenuItem value='Loaned Out'>Loaned Out</MenuItem>
          </Select>
        </FormControl>

        <TextField type="text" name="borrowedBy" value={borrowedBy} onChange={e => onChange(e)} label='Borrowed By' variant="outlined" />


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="Borrow From"
            inputFormat="DD/MM/YYYY"
            value={borrowFrom}
            onChange={handleBorrowForm}
            renderInput={(params) => <TextField {...params} error={false} />}
          />
          <MobileDatePicker
            label="Borrow To"
            inputFormat="DD/MM/YYYY"
            value={borrowTo}
            onChange={handleBorrowTo}
            renderInput={(params) => <TextField {...params} error={false} />}
          />
        </LocalizationProvider>

        <input type="text" name="borrowTo" value={borrowTo} className="to-hide" readOnly ></input>
        <input type="text" name="borrowFrom" value={borrowFrom} className="to-hide" readOnly ></input>
        <input type="text" name="logisticId" value={logisticData.logistic_id} className="to-hide" readOnly ></input>
        <input type="text" name="logisticImg" value={logisticData.logistic_img} className="to-hide" readOnly ></input>

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



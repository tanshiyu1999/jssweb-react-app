import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './Subclubs.css'
import SubclubItem from "./SubclubItem"
import { useLoaderData, useNavigate, redirect } from "react-router-dom"
import { 
  Form, 
  Outlet, 
  Link 
} from "react-router-dom"
import { TextField, Input, Button, Box } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



let uploadFile = null;

function Subclubs() {

  const loaderData = useLoaderData();

  
  const listItems = loaderData.map((data) => {
    return <SubclubItem className="subclub-item" key={data.subclub_id} name={data.subclub_name} desc={data.subclub_desc} url={data.imageUrl} cluburl={data.subclub_url} imgName={data.subclub_img} />
  });



  

  return (
    <Box>
      <Button sx={{m: 2}} component={Link} to="./addSubclub" variant="contained">Add Subclub</Button>

      <Outlet />

      <div className="subclub-container">
        {listItems}
      </div>
      <Outlet />
    </Box>
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
      return redirect("/subclubs");
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


import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { 
  Form, 
  Outlet, 
  Link 
} from "react-router-dom"
import { TextField, Input, Button } from '@mui/material';

import { redirect, useLocation, useNavigate, Navigate } from "react-router-dom"
import { Box, Stack }  from '@mui/material';

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

function EditReimbursement() {
  const { state } = useLocation();
  const reimbursementData = state;
  // console.log(reimbursementData);

  if (!reimbursementData) {
    return <Navigate to="/reimbursement" replace />;
  }


  const [textData, setTextData] = useState({
    receiptRef: maybe(reimbursementData.reimbursement_receipt_ref),
    item: maybe(reimbursementData.reimbursement_item),
    purpose: maybe(reimbursementData.reimbursement_purpose),
    cost: maybe(reimbursementData.reimbursement_cost),
    quantity: maybe(reimbursementData.reimbursement_quantity),
    remark: maybe(reimbursementData.reimbursement_remark),
    reimburseTo: maybe(reimbursementData.reimbursement_to)
  });

  const { receiptRef, item, purpose, cost, quantity, remark, reimburseTo } = textData;

  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }

  const [file, setFile] = useState();

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file);
    uploadFile = file;
  }

  return (
    <Box sx={{bgcolor: "pink"}}>
      <Form method="post" style={{width:650}} action='.'>
        <Stack
          sx={{
            display:'flex',
            flexDirection: 'column',
            width: "200px",        
          }}
        >
            <TextField type="text" name="receiptRef" value={receiptRef} onChange={e => onChange(e)} label="Receipt Reference" variant="outlined" />

            <TextField type="text" name="reimburseTo" value={reimburseTo} onChange={e => onChange(e)} label='Reimburse To' variant="outlined" />
        
            <TextField type="text" name="item" value={item} onChange={e => onChange(e)} label='Item' variant="outlined" />
            
            <TextField type="text" name="purpose" value={purpose} onChange={e => onChange(e)} label='Purpose' variant="outlined" />

            <TextField type="number" name="cost" value={cost} onChange={e => onChange(e)} label='Cost' variant="outlined" />

            <TextField type="number" name="quantity" value={quantity} onChange={e => onChange(e)} label='Quantity' variant="outlined" />

            <TextField type="text" name="remark" value={remark} onChange={e => onChange(e)} label='Remark' variant="outlined" multiline rows={4} />

            <TextField type={"file"} onChange={fileSelected} name="image" inputProps={{accept:"image/*"}} />

            <input type="text" name="reimbursementId" value={reimbursementData.reimbursement_id} className="to-hide" readOnly ></input>

            <input type="text" name="aws_ref" value={reimbursementData.reimbursement_aws_ref} className="to-hide" readOnly ></input>

            <Button type="submit" component={Link} to="/reimbursement" variant="outlined">Cancel</Button>
            
            <Button type="submit" name="intent" value='update'color="success" variant="contained">Submit</Button>
        </Stack>

      </Form>
    </Box>
    );
}

export default EditReimbursement;



/* -------------------- Action Start -------------------- */
export async function action({request}) {
  try {
    const data = await request.formData();
    let intent = data.get('intent');
    console.log(intent);
    if (intent === 'update') {
      if (uploadFile) {data.append("image", uploadFile)}
      await axios.patch("http://localhost:3000/reimbursement", 
          data, 
          { headers: {'Content-Type': 'multipart/form-data'}}
      )
      return redirect("/reimbursement")
    } 
  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Action End -------------------- */

/* -------------------- Loader Start -------------------- */
export async function loader() {
try {
  return "Edit Logistics Loaded";
} catch (err) {
  console.error(err.message);
  return null;
}
}
/* -------------------- Loader End -------------------- */


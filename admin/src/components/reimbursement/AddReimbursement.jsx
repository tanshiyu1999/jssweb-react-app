import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { 
  Form, 
  Outlet, 
  Link,
  useNavigate,
} from "react-router-dom"
import { TextField, Input, Button } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { redirect } from "react-router-dom"
import { Box, Stack }  from '@mui/material';
import { bgcolor } from '@mui/system';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

let uploadFile = null;

function AddReimbursement() {

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    receiptRef: "Receipt Reference",
    item: "The item",
    purpose: "Item purpose",
    cost: '5544',
    quantity: "214124",
    remark: 'this is a remark',
    reimburseTo: "shiyty"
  });

  const { receiptRef, item, purpose, cost, quantity, remark, reimburseTo } = textData;


  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file)
    uploadFile = file;
  }

  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false)
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (open == false) {
      navigate("/reimbursement");
    }
  }, [open]);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth={true}
    >
      <DialogContent>
        <DialogTitle display="flex" justifyContent="center">Add Reimbursement</DialogTitle>

        <Box>
          <Form method="post" style={{width:650}}>
            <Stack
              sx={{
                display:'flex',
                flexDirection: 'column',
                width: "200px",
                paddingTop: '20px'
              }}
            >
                <TextField type="text" name="receiptRef" value={receiptRef} onChange={e => onChange(e)} label="Receipt Reference" variant="outlined" />

                <TextField type="text" name="reimburseTo" value={reimburseTo} onChange={e => onChange(e)} label='Reimburse To' variant="outlined" />
            
                <TextField type="text" name="item" value={item} onChange={e => onChange(e)} label='Item' variant="outlined" />
                
                <TextField type="text" name="purpose" value={purpose} onChange={e => onChange(e)} label='Purpose' variant="outlined" />

                <TextField type="number" name="cost" value={cost} onChange={e => onChange(e)} label='Cost' variant="outlined" />

                <TextField type="number" name="quantity" value={quantity} onChange={e => onChange(e)} label='Quantity' variant="outlined" />

                <TextField type="text" name="remark" value={remark} onChange={e => onChange(e)} label='Remark' variant="outlined" multiline rows={4} />

                <TextField type={"file"} onChange={fileSelected} name="image" inputProps={{accept:"image/*"}} required />

                <Button type="submit" component={Link} to="/reimbursement" variant="outlined">Cancel</Button>
                
                <Button type="submit" name="intent" value='add'color="success" variant="contained">Submit</Button>
            </Stack>

          </Form>
        </Box>
      </DialogContent>
    </Dialog>
    );
}

export default AddReimbursement

/* -------------------- Action Start -------------------- */
export async function action({request}) {
  console.log("hello")
  try {
    const data = await request.formData();
    let intent = data.get('intent');
    if (intent === 'add') {
      data.append("image", uploadFile);
      await axios.post("http://localhost:3000/reimbursement", 
        data, 
        { headers: {'Content-Type': 'multipart/form-data'}}
      )
      return redirect("/reimbursement");
    } 
  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Action End -------------------- */
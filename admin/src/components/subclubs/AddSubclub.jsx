import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { 
  Form, 
  Link,
  useNavigate,
} from "react-router-dom"
import { 
  TextField, 
  Input, 
  Button, 
  Dialog, 
  DialogActions,
  DialogContent, 
  DialogContentText, 
  DialogTitle
} from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { redirect } from "react-router-dom"
import { Box, Stack }  from '@mui/material';
import { bgcolor } from '@mui/system';

let uploadFile = null;

function AddReimbursement() {


  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    name: "",
    url: "",
    desc: ""
  });

  const { name, url, desc } = textData;

  const [subclubsData, setSubclubsData] = useState([]); 

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
      navigate("/subclubs");
    }
  }, [open]);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth={true}
    >
      <DialogContent>
        <DialogTitle display="flex" justifyContent="center">Add Subclub</DialogTitle>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Form method="post" action="./">
            <Stack
                sx={{
                  display:'flex',
                  flexDirection: 'column',
                  width: "300px",

                }}
              >

              <TextField  type="text" name="name" value={name} onChange={e => onChange(e)} label="Subclub Name" variant="outlined" />
              <TextField type="text" name="url" value={url} onChange={e => onChange(e)} label='Subclub URL' variant="outlined" />
              <TextField type="text" name="desc" value={desc} onChange={e => onChange(e)} label='Description' variant="outlined" multiline rows={4} />

              {/* <Button variant="contained" component="label">
                Upload
              </Button> */}

              <input hidden label='Subclub Image' onChange={fileSelected} type="file" name="image" accept="image/*" required />
              <Button type="submit" component={Link} to="/subclubs" color="error" variant="outlined">Cancel</Button>

              <Button type="submit" name="intent" value='add' color="success" variant="contained">
                Submit
              </Button>
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
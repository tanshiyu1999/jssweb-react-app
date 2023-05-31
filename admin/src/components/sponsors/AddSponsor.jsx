import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { 
  Form, 
  Outlet, 
  Link,
  useNavigate,
  Navigate
} from "react-router-dom"
import { TextField, Input, Button } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { redirect } from "react-router-dom"
import { Box, Stack }  from '@mui/material';
import { bgcolor } from '@mui/system';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

let uploadLogo = null;

function AddSponsor() {

  

  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    sponsorName: "Sponsor's name",
    sponsorDesc: "Sponsor's description",
    sponsorLinkName1: 'First Link Name',
    sponsorUrl1: "First Link Url",
  });

  const { sponsorName, sponsorDesc, sponsorLinkName1, sponsorUrl1} = textData;


  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }

  const handleLogoSelected = event => {
    const file = event.target.files[0];
    setFile(file)
    uploadLogo = file;
  }


  const [tier, setTier] = useState('platinum');

  const handleTierChange = (event) => {
    setTier(event.target.value);
  };  



  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false)
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (open == false) {
      navigate("/sponsors");
    }
  }, [open]);


  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth={true}
    >
      <DialogContent>
        <DialogTitle display="flex" justifyContent="center">Add Sponsor</DialogTitle>

        <Box sx={{bgcolor: "pink"}} display="flex" justifyContent="center">
          <Form method="post">
            <Stack
              sx={{
                display:'flex',
                flexDirection: 'column',
                width: "200px",
                paddingTop: '20px'
              }}
            >
                <FormControl fullWidth>
                    <InputLabel id="Tier Type">Sponsor Tier</InputLabel>
                    <Select labelId="sponsor-tier-select-label" id="sponsor-tier-select" name="sponsorTier" value={tier} label="Sponsor Tier" 
                    onChange={handleTierChange} required
                    >
                    <MenuItem value='platinum'>Platinum</MenuItem>
                    <MenuItem value='gold'>Gold</MenuItem>
                    <MenuItem value='silver'>Silver</MenuItem>
                    </Select>
                </FormControl>

                <TextField type="text" name="sponsorName" value={sponsorName} onChange={e => onChange(e)} label='Sponsor Name' variant="outlined" />
            
                <TextField type="text" name="sponsorDesc" value={sponsorDesc} onChange={e => onChange(e)} label='Sponsor Description' variant="outlined" />
                
                <TextField type="text" name="sponsorLinkName1" value={sponsorLinkName1} onChange={e => onChange(e)} label='Sponsor Link' variant="outlined" />

                <TextField type="text" name="sponsorUrl1" value={sponsorUrl1} onChange={e => onChange(e)} label='Sponsor URL 1' variant="outlined" />

                <TextField type={"file"} onChange={handleLogoSelected} name="image" inputProps={{accept:"image/*"}} required />


                <Button type="submit" component={Link} to="/sponsors" variant="outlined">Cancel</Button>
                
                <Button type="submit" name="intent" value='add'color="success" variant="contained">Submit</Button>
            </Stack>

          </Form>
        </Box>
      </DialogContent>

    </Dialog>

    );
}

export default AddSponsor

/* -------------------- Action Start -------------------- */
export async function action({request}) {
  // console.log("hello")
  try {
    const data = await request.formData();
    let intent = data.get('intent');
    if (intent === 'add') {
      data.append("image", uploadLogo);
      await axios.post("http://localhost:3000/sponsors", 
        data, 
        { headers: {'Content-Type': 'multipart/form-data'}}
      )
      return redirect("/sponsors");
    } 
  } catch (err) {
    console.error(err.message);
  }
  return null;
}
/* -------------------- Action End -------------------- */
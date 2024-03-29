import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { 
  Form, 
  Link 
} from "react-router-dom"
import { TextField, Input, Button, Stack } from '@mui/material';

import { redirect, useLocation, useNavigate, Navigate } from "react-router-dom"
import { Box }  from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { maybe } from './script/maybe'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



let uploadLogo = null;

function EditSponsor() {
  const { state } = useLocation();
  const sponsorsData = state;
  // console.log(sponsorsData)

  if (!sponsorsData) {
    return <Navigate to="/sponsors" replace />;
  }


  const [file, setFile] = useState();

  const [textData, setTextData] = useState({
    sponsorName: maybe(sponsorsData.sponsor_name),
    sponsorDesc: maybe(sponsorsData.sponsor_description),
    sponsorLinkName1: maybe(sponsorsData.sponsor_link_text_1),
    sponsorUrl1: maybe(sponsorsData.sponsor_link_1),
  });

  const { sponsorName, sponsorDesc, sponsorLinkName1, sponsorUrl1 } = textData;

  const onChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value })
  }


  const [tier, setTier] = useState(sponsorsData.sponsor_tier);

  const handleTierChange = (event) => {
    setTier(event.target.value);
  };  

  const handleLogoSelected = event => {
    const file = event.target.files[0];
    setFile(file)
    uploadLogo = file;
  }

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

        <DialogTitle display="flex" justifyContent="center">Edit Sponsor</DialogTitle>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
            <Form method="patch">
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

                  <TextField type={"file"} onChange={handleLogoSelected} name="image" inputProps={{accept:"image/*"}} />

                  <input type="text" name="sponsorId" value={sponsorsData.sponsor_id} className="to-hide" readOnly ></input>

                  <input type="text" name="logoAwsRef" value={sponsorsData.sponsor_logo_aws_ref} className="to-hide" readOnly ></input>

                  <Button type="submit" component={Link} to="/sponsors" variant="outlined" color="error">Cancel</Button>
                  
                  <Button type="submit" name="intent" value='update' color="success" variant="contained">Submit</Button>
              </Stack>
            </Form>
        </Box>
      </DialogContent>

    </Dialog>
  );
}

export default EditSponsor;


/* -------------------- Action Start -------------------- */
export async function action({request}) {
    try {
      const data = await request.formData();
      let intent = data.get('intent');
      if (intent === 'update') {
        console.log("Editting Sponsor")
        if (uploadLogo) {data.append("image", uploadLogo)}
        await axios.patch("http://localhost:3000/sponsors", 
            data, 
            { headers: {'Content-Type': 'multipart/form-data'}}
        )
        return redirect("/sponsors")
      } else if (intent === 'cancel') {
        return redirect("/sponsors")
      }
    } catch (err) {
      console.error(err.message);
    }
    return null;
  }
/* -------------------- Action End -------------------- */
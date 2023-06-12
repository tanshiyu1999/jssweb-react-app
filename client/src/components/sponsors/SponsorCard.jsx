import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import makeStyles from "@emotion/styled"
import { Paper } from '@mui/material';
import { Link } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SponsorCard = (props) => {



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const {
    sponsor_name,
    sponsor_tier,
    sponsor_logo_aws_ref,
    sponsor_description,
    sponsor_link_text_1,
    sponsor_link_1,
    sponsor_link_text_2,
    sponsor_link_2,
    sponsor_link_text_3,
    sponsor_link_3,
    imageUrl
  } = props.data

  console.log(imageUrl)

  const tier = props.tier

  return (
    <>
      <div className={`centering-items sponsor-card ${tier}`} onClick={handleClickOpen}>
        <img src={imageUrl} alt={`${sponsor_name} Picture`} />
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth="md"
        sx={{ overflowY: 'hidden' }}
      >
        <DialogTitle>{sponsor_name}</DialogTitle>
        <DialogContent dividers sx={{ overflow: "hidden" }}>
          <DialogContentText 
            id="alert-dialog-slide-description"
          >
            {sponsor_description}
          </DialogContentText>
          <Button variant="outlined" href="#contained-buttons">
            Link
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}



export default SponsorCard
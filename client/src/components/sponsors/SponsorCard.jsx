import React, { useState } from 'react';
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
import Modal from '../reusable/modal/Modal';

const SponsorCard = (props) => {



  const [open, setOpen] = useState(false);

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


  const tier = props.tier

  return (
    <>
      <div className={`centering-items sponsor-card ${tier}`} onClick={handleClickOpen}>
        <img src={imageUrl} alt={`${sponsor_name} Picture`} />
      </div>

      <Modal 
        open={open}
        onClose={() => handleClose()}
        name={sponsor_name}
        description={sponsor_description}
        urlText1={sponsor_link_text_1}
        url1={sponsor_link_1}
        urlText2={sponsor_link_text_2}
        url2={sponsor_link_2}
        urlText3={sponsor_link_text_3}
        url3={sponsor_link_3}
      />
    </>
  )
}



export default SponsorCard
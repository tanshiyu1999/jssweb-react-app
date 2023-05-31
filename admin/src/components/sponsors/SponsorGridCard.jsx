import React, { useState, useEffect } from "react";
import { Button, Typography, Paper, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Form } from "react-router-dom";
import isImage from "./script/isImage";
import placeholder from "../../assets/placeholder.png";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SponsorGridCard({ data, theme }) {
  const [imageExist, setImageExist] = useState(false);

  useEffect(() => {
    // useEffect act before mounting
    isImage(data.imageUrl).then((value) => setImageExist(value));
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "500px",
        padding: "30px",
        minWidth: "300px",
        border: 1,
        m: 2,
      }}
    >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
      >
        <DialogTitle>{data.sponsor_name}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {data.sponsor_description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography color={theme.palette.primary.contrastText}>
              Close
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Typography>{data.sponsor_name}</Typography>
      <Typography>{data.logistic_quantity}</Typography>
      {imageExist ? (
        <Paper onClick={() => handleClickOpen()}>
          <img src={data.imageUrl} alt="" width="200px" />
        </Paper>
      ) : (
        <Paper>
          <img src={placeholder} alt="" width="200px" />
        </Paper>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          component={Link}
          to={`./${data.sponsor_id}/editSponsor`}
          state={data}
          variant="contained"
        >
          Edit
        </Button>
        <Form method="delete" action="./">
          <input
            type="text"
            name="awsName"
            value={data.sponsor_logo_aws_ref}
            className="to-hide"
            readOnly
          ></input>
          <input
            type="text"
            name="sponsorId"
            value={data.sponsor_id}
            className="to-hide"
            readOnly
          ></input>
          <Button
            type="submit"
            name="intent"
            value="delete"
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </Form>
      </Box>
    </Box>
  );
}

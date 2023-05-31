import React, { useState } from "react";
import TableView from "./TableView";
import AddLogistic from "./AddLogistic";
import { Box, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useLoaderData, Outlet, Link } from "react-router-dom";
import GridView from "./GridView";
import Switch from '@mui/material/Switch';




function Logistic() {
  const logisticData = useLoaderData();

  const [isGalleryView, setisGalleryView] = React.useState(false);

  const updateisGalleryView = (event) => {
    setisGalleryView(event.target.checked);
  };

  // console.log("updated")

  return (
    <Box padding={2} sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <Typography variant="h1" sx={{m:1}}>Logistic</Typography>      
      <Stack sx={{m:1}} display="flex" flexDirection="row" alignItems="center">
        <Typography>Table View</Typography>
        <Switch
          checked={isGalleryView}
          onChange={updateisGalleryView}
        />
        <Typography>Gallery View</Typography>
      </Stack>
      <Button sx={{m:1}} component={Link} to="./addlogistic" variant="contained">Add Logistics</Button>
      <Outlet />
      {
        isGalleryView 
          ? <GridView logisticData={logisticData} /> 
          : <TableView logisticData={logisticData} />
      }
      
      
    </Box>
  )
}

export default Logistic


/* -------------------- Loader Start -------------------- */
export async function loader() {
    try {
      let output = null;
      const res = await fetch("http://localhost:3000/logistic")
        .then(res => res.json())
        .then(data => {
          output = data
        })
      return output;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }
  /* -------------------- Loader End -------------------- */

  /* -------------------- Action Start -------------------- */
  // For this to work, have to import it back into App.jsx and import it into the router.
export async function action({request}) {
    try {
      const data = await request.formData();
      let intent = data.get('intent');

      // Delete is in TableView & GridView
      if (intent === 'delete') {
        let imgName = data.get('imgName');
        const res = await fetch(
          "http://localhost:3000/logistic", {
              method: "DELETE",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                url: data.get('awsName'),
                logisticId: data.get('logisticId')
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
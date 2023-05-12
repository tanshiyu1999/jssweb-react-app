import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useLoaderData, Outlet, Link } from "react-router-dom";
import SponsorGridView from "./SponsorGridView"
import isImage from "./script/isImage"

function Sponsors() {
  const sponsorsData = useLoaderData();

  return (
      <Box padding={2}>
        <Button component={Link} to="./addSponsor" variant="contained">Add Sponsor</Button>
        <Outlet />
        <SponsorGridView sponsorsData={sponsorsData} />
      </Box>
  )
}

export default Sponsors

// Loader here

/* -------------------- Loader Start -------------------- */
export async function loader() {
  try {
    let output = null;
    const res = await fetch("http://localhost:3000/sponsors")
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
export async function action({request}) {
  try {
    const data = await request.formData();
    let intent = data.get('intent');

    // Delete is in TableView & GridView
    if (intent === 'delete') {
      let awsName = data.get('awsName');
      const res = await fetch(
        "http://localhost:3000/sponsors", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              url: data.get('awsName'),
              sponsorId: data.get('sponsorId')
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
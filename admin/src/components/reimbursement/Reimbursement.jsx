import { useState } from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useLoaderData, Outlet, Link } from "react-router-dom";
import AddReimbursement from "./AddReimbursement";
import TableView from "./TableView";

function Reimbursement() {
  const reimbursementData = useLoaderData();
  // console.log(reimbursementData)
  return (
      <Box 
        padding={2} 
        display="flex" 
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1" sx={{ m: 1 }}>Reimbursement</Typography>
        <Button sx={{m: 2}} component={Link} to="./addReimbursement" variant="contained">Add Reimbursement</Button>
        <TableView reimbursementData={reimbursementData} />
        <Outlet />
      </Box>
  )
}

export default Reimbursement


/* -------------------- Loader Start -------------------- */
export async function loader() {
    try {
      let output = null;
      const res = await fetch("http://localhost:3000/reimbursement")
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

      if (intent === 'reimburse') {
        const res = await fetch(
          "http://localhost:3000/reimbursement/reimburse", {
              method: "PATCH",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                reimbursementId: data.get('reimbursement_id')
              })
          }
        );
      } else if (intent === 'delete') {
        let imgName = data.get('imgName');
        const res = await fetch(
          "http://localhost:3000/reimbursement", {
              method: "DELETE",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                url: data.get('awsName'),
                reimbursementId: data.get('reimbursementId')
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
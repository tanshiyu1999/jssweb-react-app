import { useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useLoaderData, Outlet, Link } from "react-router-dom";
import AddReimbursement from "./AddReimbursement";
import TableView from "./TableView";

function Reimbursement() {
  const reimbursementData = useLoaderData();
  console.log(reimbursementData)
  return (
      <Box padding={2}>
        <Button component={Link} to="./addReimbursement" variant="contained">Add Reimbursement</Button>
        <Outlet />
        <TableView reimbursementData={reimbursementData} />
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

//   /* -------------------- Action Start -------------------- */
// export async function action({request}) {
//     try {
//       const data = await request.formData();
//       let intent = data.get('intent');

//       // Delete is in TableView & GridView
//       if (intent === 'delete') {
//         let imgName = data.get('imgName');
//         const res = await fetch(
//           "http://localhost:3000/logistic", {
//               method: "DELETE",
//               headers: {"Content-Type": "application/json"},
//               body: JSON.stringify({
//                 url: data.get('awsName'),
//                 logisticId: data.get('logisticId')
//               })
//           }
//         );
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//     return null;
//   }
//   /* -------------------- Action End -------------------- */
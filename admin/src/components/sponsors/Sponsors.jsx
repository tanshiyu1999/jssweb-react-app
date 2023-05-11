import { useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useLoaderData, Outlet, Link } from "react-router-dom";
import SponsorGridView from "./SponsorGridView"

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
// For this to work, have to import it back into App.jsx and import it into the router.
// export async function action({request}) {
//   try {
//     const data = await request.formData();
//     let intent = data.get('intent');

//     // Delete is in TableView & GridView
//     if (intent === 'delete') {
//       let imgName = data.get('imgName');
//       const res = await fetch(
//         "http://localhost:3000/logistic", {
//             method: "DELETE",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//               url: data.get('awsName'),
//               logisticId: data.get('logisticId')
//             })
//         }
//       );
//     }
//   } catch (err) {
//     console.error(err.message);
//   }
//   return null;
// }
/* -------------------- Action End -------------------- */
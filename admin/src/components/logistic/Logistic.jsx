import { useState } from "react";
import TableView from "./TableView";
import AddLogistic from "./AddLogistic";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useLoaderData, Outlet, Link } from "react-router-dom";
import GridView from "./GridView";


function Logistic() {
  const logisticData = useLoaderData();
  return (
      <Box padding={2}>
          <Button component={Link} to="./addlogistic" variant="contained">Add Logistics</Button>
          <Outlet />
          <TableView logisticData={logisticData} />
          <GridView logisticData={logisticData} />

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
// export async function action({request}) {
//     try {
//       const data = await request.formData();
//       let intent = data.get('intent');
//       if (intent === 'delete') {
//         let imgName = data.get('imgName');
//         const res = await fetch(
//           "http://localhost:3000/logistic", {
//               method: "DELETE",
//               headers: {"Content-Type": "application/json"},
//               body: JSON.stringify({
//                 url: imgName,
//               })
//           }
//         );
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//     return null;
//   }
  /* -------------------- Action End -------------------- */
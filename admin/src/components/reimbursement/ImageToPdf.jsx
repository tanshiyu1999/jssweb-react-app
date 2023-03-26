import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useLoaderData, Outlet, Link } from "react-router-dom";
import { jsPDF } from "jspdf";

function ImageToPdf({reimbursementData}) {
  console.log(reimbursementData)

  const exportImage = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    reimbursementData.forEach( data => {
      doc.text(data.reimbursement_receipt_ref, 35, 25);
      doc.addImage(data.imageUrl, "JPEG", 15, 40, 180, 180);
    })
    doc.save("test.pdf")
  }

  

  return (
    <Button variant="outlined" onClick={exportImage} >
        Export Images
    </Button>
  )
}

export default ImageToPdf

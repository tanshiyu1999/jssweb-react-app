import * as React from 'react';
import { 
  DataGrid, 
  GridRowsProp, 
  GridColDef, 
  GridToolbarQuickFilter,
  GridToolbarExport,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { addIndex } from './script/addIndex';
import { Button } from '@mui/material';
import { Link, Form } from 'react-router-dom';
import { Box } from '@mui/system';
import ImageToPdf from './script/ImageToPdf';
import { jsPDF } from "jspdf";
import { addTotalCost } from './script/addTotalCost'



export default function TableView({reimbursementData}) {

  addIndex(reimbursementData);
  addTotalCost(reimbursementData);
  // console.log(reimbursementData)
  
  function TableToolBar() {
    return (
      <GridToolbarContainer>
        <ImageToPdf reimbursementData={reimbursementData} />
        <GridToolbarExport />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }
  
  const rows: GridRowsProp = reimbursementData
  
  // If reimbursed, it'll not show, if not reimbursed, it will show.
  // Must add reimbursed into database

  const columns: GridColDef[] = [
    { field: 'reimburse', headerName: 'Reimbursed', width: 150, renderCell: (params) => ( 
      <Form method="patch" action="./" >
        <input type="text" name="reimbursement_id" value={reimbursementData[params.id].reimbursement_id} className="to-hide" readOnly ></input>
        <Button type="submit" name="intent" value='reimburse' variant="contained">
          Reimbursed
        </Button>
      </Form>
    )},
    { field: 'update', headerName: 'Update', width: 150, renderCell: (params) => ( 
      <Button component={Link} to={`./${params.id}/editReimbursement`} state={reimbursementData[params.id]} variant="contained">
        Edit
      </Button>
    )},
    { field: 'delete', headerName: 'Delete', width: 150, renderCell: (params) => ( 
      <Form method="delete" action="./">
        <input type="text" name="awsName" value={reimbursementData[params.id].reimbursement_aws_ref} className="to-hide" readOnly ></input>
        <input type="text" name="reimbursementId" value={reimbursementData[params.id].reimbursement_id} className="to-hide" readOnly ></input>
        <Button type="submit" name="intent" value='delete' color="error" variant="contained">
          Delete
        </Button>
      </Form>
    )},
    { field: 'reimbursement_receipt_ref', headerName: 'Receipt Reference', width: 150 },
    { field: 'reimbursement_item', headerName: 'Item', width: 150 },
    { field: 'reimbursement_purpose', headerName: 'Purpose', width: 150 },
    { field: 'reimbursement_cost', headerName: 'Cost', width: 150},
    { field: 'reimbursement_quantity', headerName: 'Quantity', width: 150},
    { field: 'totalCost', headerName: 'Total Cost', width: 150},
    { field: 'reimbursement_remark', headerName: 'Remark', width: 150},
    { field: 'reimbursement_to', headerName: 'Reimburse To', width: 150},

  ];


  return (
    <>
      <DataGrid 
        autoHeight 
        rows={rows} 
        columns={columns} 
        slots={{ toolbar: TableToolBar }}
      />
    </>
  );
}
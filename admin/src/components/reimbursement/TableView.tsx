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
import ImageToPdf from './ImageToPdf';
import { jsPDF } from "jspdf";



export default function TableView({reimbursementData}) {

  addIndex(reimbursementData);
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
  
  const columns: GridColDef[] = [
    { field: 'reimbursement_receipt_ref', headerName: 'Receipt Reference', width: 150 },
    { field: 'reimbursement_item', headerName: 'Item', width: 150 },
    { field: 'reimbursement_purpose', headerName: 'Purpose', width: 150 },
    { field: 'reimbursement_cost', headerName: 'Cost', width: 150},
    { field: 'reimbursement_quantity', headerName: 'Quantity', width: 150},
    { field: 'logistic_status', headerName: 'Total Cost', width: 150},
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
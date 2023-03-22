import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { addIndex } from './script/addIndex';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


export default function TableView({logisticData}) {

  addIndex(logisticData);
  // console.log(logisticData)
  
  const rows: GridRowsProp = logisticData
  
  const columns: GridColDef[] = [
    { field: 'Update', headerName: 'Update', width: 150, renderCell: (params) => ( 
      <Button component={Link} to={`./${params.id}/editLogistic`} state={logisticData[params.id]} variant="contained">
        Edit
      </Button>
    )},
    { field: 'logistic_name', headerName: 'Item', width: 150 },
    { field: 'logistic_quantity', headerName: 'Quantity', width: 150 },
    { field: 'logistic_description', headerName: 'Description', width: 150 },
    { field: 'logistic_location', headerName: 'Location', width: 150},
    { field: 'logistic_status', headerName: 'Status', width: 150}
  ];
  return (
    <DataGrid autoHeight rows={rows} columns={columns} />
  );
}



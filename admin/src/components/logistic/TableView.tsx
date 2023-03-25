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


export default function TableView({logisticData}) {

  addIndex(logisticData);
  // console.log(logisticData)


  function TableToolBar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }
  
  const rows: GridRowsProp = logisticData
  
  const columns: GridColDef[] = [
    { field: 'Update', headerName: 'Update', width: 150, renderCell: (params) => ( 
      <Button component={Link} to={`./${params.id}/editLogistic`} state={logisticData[params.id]} variant="contained">
        Edit
      </Button>
    )},
    { field: 'Borrow', headerName: 'Borrow', width: 150, renderCell: (params) => ( 
      <Button component={Link} to={`./${params.id}/borrowLogistic`} state={logisticData[params.id]} variant="contained">
        Borrow
      </Button>
    )},
    { field: 'Delete', headerName: 'Delete', width: 150, renderCell: (params) => ( 
      <Form method="delete" action="./">
        <input type="text" name="awsName" value={logisticData[params.id].logistic_img} className="to-hide" readOnly ></input>
        <input type="text" name="logisticId" value={logisticData[params.id].logistic_id} className="to-hide" readOnly ></input>
        <Button type="submit" name="intent" value='delete' color="error" variant="contained">
          Delete
        </Button>
      </Form>
    )},
    { field: 'logistic_name', headerName: 'Item', width: 150 },
    { field: 'logistic_quantity', headerName: 'Quantity', width: 150 },
    { field: 'logistic_description', headerName: 'Description', width: 150 },
    { field: 'logistic_location', headerName: 'Location', width: 150, editable: true},
    { field: 'logistic_status', headerName: 'Status', width: 150}
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



import * as React from 'react';
import { addIndex } from './script/addIndex';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";

export default function GridView({logisticData}) {

  addIndex(logisticData);
  
  return (
    <Box>
        Gird View
    </Box>
  );
}



// CREATE TABLE logistic (
//   logistic_id SERIAL PRIMARY KEY,
//   logistic_name VARCHAR(100),
//   logistic_type VARCHAR(50),
//   logistic_description TEXT,
//   logistic_location TEXT,
//   logistic_quantity INT,
//   logistic_status TEXT,
//   logistic_borrowed_by VARCHAR(100),
//   logistic_borrow_from DATE,
//   logistic_borrow_to DATE,
//   logistic_img TEXT
// );
import * as React from 'react';
import { addIndex } from './script/addIndex';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import GridCard from './GridCard';
import placeholder from '../../assets/placeholder.png'
import { Form } from 'react-router-dom';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function GridView({logisticData}) {

  addIndex(logisticData);
  console.log(logisticData)

  return (
    <ImageList 
      cols={4}
      gap={10}
      sx={{
        bgcolor:"pink",
        width: "100%",
    }}>
      {logisticData.map((data) => (
        <ImageListItem key={data.logistic_id}>
          <img
            src={data.imageUrl ? data.imageUrl : placeholder}
            alt={`${data.logistic_name} image.`}
            loading="lazy"
          />
          <ImageListItemBar
            title={<Typography>Name: {data.logistic_name}</Typography>}
            subtitle={
              <>
                <Typography>Status: {data.logistic_status}</Typography>
                <Box display="flex" flexDirection="row">
                  <Button component={Link} to={`./${data.id}/editLogistic`} state={data} variant="contained">Edit</Button>
                  <Button component={Link} to={`./${data.id}/borrowLogistic`} state={data} variant="contained">Borrow</Button>
                  <Form method="delete" action="./">
                      <input type="text" name="awsName" value={data.logistic_img} className="to-hide" readOnly ></input>
                      <input type="text" name="logisticId" value={data.logistic_id} className="to-hide" readOnly ></input>
                      <Button type="submit" name="intent" value='delete' color="error" variant="contained">Delete</Button>  
                  </Form>
                </Box>
              </>
            }
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
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
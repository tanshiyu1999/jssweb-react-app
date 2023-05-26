import * as React from 'react';
import { addIndex } from './script/addIndex';
import { Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import { Form } from 'react-router-dom';

export default function GridCard({data, notFound}) {
    // console.log(data)

    
    return (

        <Box
            sx={{
                bgcolor:"pink",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width:"500px",
                padding: '30px',
                minWidth: '300px'

            }}
        >
            <Typography>{data.logistic_name}</Typography>
            <Typography>{data.logistic_quantity}</Typography>
            {data.imageUrl 
                ? <Paper><img src={data.imageUrl} alt="" width="200px" /></Paper>
                : <Paper><img src={notFound} alt="" width="200px" /></Paper>
            }
            <Typography>{data.logistic_description}</Typography>
            <Typography>{data.logistic_status}</Typography>
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                }}
            >
                <Button component={Link} to={`./${data.id}/editLogistic`} state={data} variant="contained">Edit</Button>
                <Button component={Link} to={`./${data.id}/borrowLogistic`} state={data} variant="contained">Borrow</Button>
                <Form method="delete" action="./">
                    <input type="text" name="awsName" value={data.logistic_img} className="to-hide" readOnly ></input>
                    <input type="text" name="logisticId" value={data.logistic_id} className="to-hide" readOnly ></input>
                    <Button type="submit" name="intent" value='delete' color="error" variant="contained">Delete</Button>  
                </Form>
                
            </Box>
        </Box>
    );
}

// Do CSS
// Make the table more functional (search bar etc)
// Do the sorter?
// Grid View make it like telegram 
// Image Upload allow you to crop
import { useState, useEffect } from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import { Form } from 'react-router-dom';
import isImage from './script/isImage'
import placeholder from '../../assets/placeholder.png'

export default function SponsorGridCard({data}) {

    const [imageExist, setImageExist] = useState(false);

    useEffect(() => {
        // useEffect act before mounting
        isImage(data.imageUrl).then(value => setImageExist(value));
    });

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
            <Typography>{data.sponsor_name}</Typography>
            <Typography>{data.logistic_quantity}</Typography>
            {imageExist
                ? <Paper><img src={data.imageUrl} alt="" width="200px" /></Paper>
                : <Paper><img src={placeholder} alt="" width="200px" /></Paper>
            }
            <Box 
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                }}
            >
                <Button component={Link} to={`./${data.sponsor_id}/editSponsor`} state={data} variant="contained">Edit</Button>
                <Form method="delete" action="./">
                    <input type="text" name="awsName" value={data.sponsor_logo_aws_ref} className="to-hide" readOnly ></input>
                    <input type="text" name="sponsorId" value={data.sponsor_id} className="to-hide" readOnly ></input>
                    <Button type="submit" name="intent" value='delete' color="error" variant="contained">Delete</Button>  
                </Form>
            </Box>
        </Box>
    );
}

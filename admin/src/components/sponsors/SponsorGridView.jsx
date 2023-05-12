import * as React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import SponsorGridCard from './SponsorGridCard';
import placeholder from '../../assets/placeholder.png'

export default function SponsorGridView({sponsorsData}) {

  // console.log(sponsorsData)

  let silverSponsors = [];
  let goldSponsors = [];
  let platinumSponsors = [];

  sponsorsData.forEach(sponsor => {
    switch (sponsor.sponsor_tier) {
      case 'platinum':
        platinumSponsors.push(sponsor);
        break;
      case 'gold':
        goldSponsors.push(sponsor);
        break;
      case 'silver':
        silverSponsors.push(sponsor);
        break;
      default:
        break;
    }
  })

  // console.log(platinumSponsors)

  const platinumCard = platinumSponsors.map((data) => {
    return <SponsorGridCard 
              data={data} 
              key={data.sponsor_id}
            />
  }); 

  const goldCard = goldSponsors.map((data) => {
    return <SponsorGridCard 
              data={data} 
              key={data.sponsor_id}
            />
  }); 

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'pink',
        width: '100%',
        flexWrap: 'wrap'
      
      }}
    >
      <Stack>
        <Typography>Platinum Sponsors</Typography>
        <Stack
          sx={{
              display: 'flex',
              flexDirection: 'row',
              bgcolor: 'grey',
              width: '100%',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
        >
          {platinumCard}
        </Stack>
      </Stack>

      <Stack>
        <Typography>Gold Sponsors</Typography>
        <Stack
          sx={{
              display: 'flex',
              flexDirection: 'row',
              bgcolor: 'red',
              width: '100%',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
        >
          {goldCard}
        </Stack>
      </Stack>
    </Box>
  );
}


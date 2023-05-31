import * as React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from "@mui/system";
import SponsorGridCard from './SponsorGridCard';
import placeholder from '../../assets/placeholder.png'
import { useTheme } from '@emotion/react';

export default function SponsorGridView({sponsorsData}) {

  // console.log(sponsorsData)

  const theme = useTheme();

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


  const platinumCard = platinumSponsors.map((data) => {
    return <SponsorGridCard 
              data={data} 
              key={data.sponsor_id}
              theme={theme}
            />
  }); 

  const goldCard = goldSponsors.map((data) => {
    return <SponsorGridCard 
              data={data} 
              key={data.sponsor_id}
              theme={theme}
            />
  }); 
  const silverCard = silverSponsors.map((data) => {
    return <SponsorGridCard 
              data={data} 
              key={data.sponsor_id}
              theme={theme}
            />
  }); 

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      { platinumCard[0] != null &&
        <Stack sx={{
          m: 3,
        }}>
          <Typography variant="h1" align="center">Platinum Sponsors</Typography>
          <Stack
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: "center",
              }}
          >
            {platinumCard}
          </Stack>
        </Stack>
      }


      { goldCard[0] != null &&
        <Stack sx={{
          m: 3,
        }}>
          <Typography variant="h1" align="center">Gold Sponsors</Typography>
          <Stack
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
          >
            {goldCard}
          </Stack>
        </Stack>
      }


      { silverCard[0] != null &&
        <Stack sx={{
          m: 3,
        }}>
          <Typography variant="h1" align="center">Silver Sponsors</Typography>
          <Stack
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
          >
            {silverCard}
          </Stack>
        </Stack>
      }

    </Box>
  );
}


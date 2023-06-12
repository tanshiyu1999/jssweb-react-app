import { React, useRef } from "react"
import './Sponsor.css'
import jssLogo from './assets/img/logo.png';
import SponsorCard from "./SponsorCard";


function Sponsor(props) {

  const sponsorsData = props.data


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
    return <SponsorCard 
              data={data} 
              key={data.sponsor_id}
              tier={"sponsor-plat"}
            />
  }); 

  const goldCard = goldSponsors.map((data) => {
    return <SponsorCard 
              data={data} 
              key={data.sponsor_id}
              tier={"sponsor-gold"}
            />
  }); 
  const silverCard = silverSponsors.map((data) => {
    return <SponsorCard 
              data={data} 
              key={data.sponsor_id}
              tier={"sponsor-silver"}
            />
  }); 

  return (
    <div className="sponsor">
        <h1>JCF 2023 Sponsors</h1>
        <p>Japanese Cultural Festival 2023 is proudly sponsored by:</p>
        
        { 
          platinumCard[0] != null &&
          <>
            <h1>Platinum Sponsors:</h1>
            <div className="sponsor-container">
              {platinumCard}
            </div>
          </>
        }

        {
          goldCard[0] != null &&
          <>
            <h2>Gold Sponsors:</h2>
            <div className="sponsor-container">
              {goldCard}
            </div>
          </>
        }

        {
          silverCard[0] != null &&
          <>
            <h2>Silver Sponsors:</h2>
            <div className="sponsor-container">
              {silverCard}
            </div>
          </>
        }
    </div>
  )
}

export default Sponsor
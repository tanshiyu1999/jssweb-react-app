import React from 'react'
import './Accordion.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = () => {

  const handleClick = (e) => {
    console.log(e.target)
  }

  return (
    <ul className="accordion">

      <li>
        <input type="checkbox" name="accordion" id="first" />
        <div className="accordion-label-container" onClick={(e) => handleClick(e)}>
          <label className="accordion-label" htmlFor="first">Product</label>
          <div><i class="accordion-arrow point-up"></i></div>
        </div>
        
        <div className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis a perspiciatis deserunt rerum assumenda ipsam exercitationem error omnis nostrum recusandae!</div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="second" />
        <label htmlFor="second">Product 2</label>
        <div className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis a perspiciatis deserunt rerum assumenda ipsam exercitationem error omnis nostrum recusandae!</div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="third" />
        <label htmlFor="third">Questions</label>
        <div className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis a perspiciatis deserunt rerum assumenda ipsam exercitationem error omnis nostrum recusandae!</div>
      </li>

    </ul>
  )
}

export default Accordion
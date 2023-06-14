import React from 'react'
import './Accordion.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Accordion = () => {
  return (
    <div className="accordion" id="question1">
      <div className="accordion-card" id="question1">
        <a className="accordion-link">
          How often do you go to beach?
          <div className="accordion-icon add-icon">Plus</div>
          <div className="accordion-icon remove-icon">Minus</div>
        </a>
        <div className="accordion-answer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, aliquid?</p>
        </div>
      </div>

      
      <div className="accordion-card" id="question2">
        <a className="accordion-link">
          How often do you go to shopping?
          <div className="accordion-icon add-icon">Plus</div>
          <div className="accordion-icon remove-icon">Minus</div>
        </a>
        <div className="accordion-answer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, aliquid?</p>
        </div>
      </div>

    </div>

  )
}

export default Accordion
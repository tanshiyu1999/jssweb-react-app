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
          <AddIcon className="accordion-icon add-icon" />
          <RemoveIcon className="accordion-icon remove-icon />" />
        </a>
        <div className="accordion-answer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, aliquid?</p>
        </div>
      </div>
      <div className="accordion-card" id="question2">
        <a className="accordion-link">
          How often do you go to shopping?
          <AddIcon className="accordion-icon add-icon" />
          <RemoveIcon className="accordion-icon accordion-remove-icon />" />
        </a>
        <div className="accordion-answer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, aliquid?</p>
        </div>
      </div>
      <div className="accordion-card" id="question3">
        <a className="accordion-link">
          How often do you go to catting?
          <AddIcon className="accordion-icon add-icon" />
          <RemoveIcon className="accordion-icon remove-icon />" />
        </a>
        <div className="accordion-answer">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, aliquid?</p>
        </div>
      </div>
    </div>

  )
}

export default Accordion
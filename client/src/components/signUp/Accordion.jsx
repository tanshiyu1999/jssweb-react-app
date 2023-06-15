import React from 'react'
import './Accordion.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Accordion = () => {

  const handleClick = (e) => {
    console.log(e.target)
  }

  return (
    <ul className="accordion">
      <li>
        <input type="checkbox" name="accordion" id="first" />
        <label className="accordion-label" htmlFor="first"><span>Product</span><i class="accordion-arrow point-up"></i></label>
        <div className="content"><hr className="accordion-separator" />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis a perspiciatis deserunt rerum assumenda ipsam exercitationem error omnis nostrum recusandae!</div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="second" />
        <label className="accordion-label" htmlFor="second"><span>Cat</span><i class="accordion-arrow point-up"></i></label>
        <div className="content"><hr className="accordion-separator" />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis a perspiciatis deserunt rerum assumenda ipsam exercitationem error omnis nostrum recusandae!</div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="third" />
        <label className="accordion-label" htmlFor="third"><span>Dog</span><i class="accordion-arrow point-up"></i></label>
        <div className="content"><hr className="accordion-separator" />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis a perspiciatis deserunt rerum assumenda ipsam exercitationem error omnis nostrum recusandae!</div>
      </li>

    </ul>
  )
}

export default Accordion
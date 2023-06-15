import React from 'react'
import './Accordion.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Accordion = () => {
  return (
    <ul className="accordion">
      <li>
        <input type="checkbox" name="accordion" id="first" />
        <label className="accordion-label" htmlFor="first"><span>1. I don’t have Paylah/Paynow. How else can I pay the $12 membership fee? </span><i class="accordion-arrow point-up"></i></label>
        <div className="content">
          <hr className="accordion-separator" />
          You can pay $12 in cash to the Secretary and you must give your name for record purposes.
          <br /><br />
          You can get someone else with Paylah/Paynow to pay the $12 for you, but in the reference number they must put “JSS Registration (your name)” 
          <br /><br />
          As a last resort, bank transfer to JSS bank account. Approach the Secretary for the bank account number.  
        </div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="second" />
        <label className="accordion-label" htmlFor="second"><span>2. Me and my friend want to sign-up. Can I pay for their fee together with mine in one combined payment?</span><i class="accordion-arrow point-up"></i></label>
        <div className="content">
          <hr className="accordion-separator" />
          No. Please make payment separately.  
        </div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="third" />
        <label className="accordion-label" htmlFor="third"><span>3. I have paid money during the JSS orientation camp/fees for JSS sub-club (e.g. Sado, JMC, odoro!!...) does that count as membership fee? </span><i class="accordion-arrow point-up"></i></label>
        <div className="content">
          <hr className="accordion-separator" />
          No. Please make payment of $12 as your JSS membership fee 
        </div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="forth" />
        <label className="accordion-label" htmlFor="forth"><span>4. What are the benefits of becoming a JSS member? </span><i class="accordion-arrow point-up"></i></label>
        <div className="content">
          <hr className="accordion-separator" />
          <ul>
            <li>
              Discounted tickets/priority tickets to Japanese-related events  
            </li>
            <li>
              Part-time/full-time job opportunities for Japanese-related jobs   
            </li>
            <li>
              Any other miscellaneous events related to Japanese traditional culture and/or pop culture  
            </li>
            <li>
              University visits with Japanese students who visit NUS  
            </li>
            <li>
              Brothers and Sisters (BnS) programme where NUS students engage in interactive cultural exchanges with Japanese students around sites in Singapore with allowance provided 
            </li>
          </ul>
        </div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="fifth" />
        <label className="accordion-label" htmlFor="fifth"><span>5. When will my membership request be approved? </span><i class="accordion-arrow point-up"></i></label>
        <div className="content">
          <hr className="accordion-separator" />
          Within 3 working days 
        </div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="sixth" />
        <label className="accordion-label" htmlFor="sixth"><span>6. What is BnS? </span><i class="accordion-arrow point-up"></i></label>
        <div className="content">
          <hr className="accordion-separator" />
          (Refer to the BnS poster). Only non-exchange students who are either UG or postgraduate (and alumni for selected exchanges) can participate. SCALE and non-exchange students CANNOT participate 
        </div>
      </li>

      <li>
        <input type="checkbox" name="accordion" id="seventh" />
        <label className="accordion-label" htmlFor="seventh"><span>7. How can I contact/ keep in touch with JSS?</span><i class="accordion-arrow point-up"></i></label>
        <div className="content">
          <hr className="accordion-separator" />
          Contact us via contact@jss.sg. If you have BnS-related queries, contact us at nusbns@jss.sg. Our IG page is @nusjss, where details of our events will be posted there!  
        </div>
      </li>
    </ul>
  )
}

export default Accordion
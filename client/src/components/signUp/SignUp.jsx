import { React, useRef } from "react"
import './SignUp.css'
import jssLogo from './assets/img/logo.png';
import Accordion from "./Accordion"


function SignUp() {

  return (
    <div className="signup-container">
        <div className="signup-top-banner">
          <img src="" alt="" />
          banner 1
        </div>

        <div className="welcome-message">
          <h2>Join NUS JSS today!</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quasi sint veritatis error atque nesciunt dolorum laboriosam odit aspernatur excepturi?</p>
        </div>

        <div className="signup-instruction-container">

          <div className="student-container">
            <h4>Non Exchange Students<sup>*</sup></h4>
            <p>Step 1: Visit Our NUSync Page Here:</p>
            <a className="no-decor" href="https://nus.campuslabs.com/engage/organization/jss" target="_blank">
              <button className="form-link">NUSync</button>
            </a>
            <p>Step 2: Press the Blue Join Button in the NUSync Page.</p>
            <p>Step 3: Fill in the form below & follow the instructions:</p>
            <a className="no-decor" href="https://nus.campuslabs.com/engage/submitter/form/start/361597" target="_blank">
              <button className="form-link">SignUp Form</button>
            </a>
            <sub>* Example: UG, Post-Graduation, SCALE...</sub>
          </div>

          <div className="student-container">
            <h4>Exchange Students</h4>
            <p>Step 1: Visit Our NUSync Page Here:</p>
            <a className="no-decor" href="https://nus.campuslabs.com/engage/organization/jss" target="_blank">
              <button className="form-link">NUSync</button>
            </a>
            <p>Step 2: Press the Blue Join Button in the NUSync Page.</p>
            <p>Step 3: Fill in the form below & follow the instructions:</p>
            <a className="no-decor" href="https://nus.campuslabs.com/engage/submitter/form/start/364544" target="_blank">
              <button className="form-link">SignUp Form</button>
            </a>
          </div>
            
        </div>

        <div className="difficulty-container">
          <h4>Facing difficulties? Reach out at:</h4>
          <button>contact@jss.sg</button>
        </div>

        <div className="faq-container">
          <h4>Frequently Asked Questions</h4>
          <Accordion />
        </div>

    </div>
  )
}

export default SignUp
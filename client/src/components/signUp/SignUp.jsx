import { React, useRef } from "react"
import './SignUp.css'
import jssLogo from './assets/img/logo.png';


function SignUp() {

  console.log("wooo")


  return (
    <div className="signup-container">
        <div>
          <img src="" alt="" />
          this is a image container
        </div>

        <div className="signup-instruction-container">

          <div className="local-student-container">
            <div className="local-student-spacetainer">
              <h4>Non Exchange Students</h4>
              <p>Step 1: Click Join in</p>
              <a className="form-link" href="">NUSync</a>
              <p>Step 2: fill in the form below:</p>
              <a className="form-link" href="">SignUp Form</a>
            </div>
          </div>

          <div className="exchange-student-container">
            <h4>Exchange Students</h4>
            
          </div>
        </div>

        <div className="difficulty-container">
          <h4>Facing difficulties? Reach out at:</h4>
          <a href="https:www.google.com">contact@jss.sg</a>
        </div>

        <div className="faq-container">
          <h4>Frequently Asked Questions</h4>
          <div className="Q&A-container">
            <p>Question</p>
            <p>Answer</p>
          </div>
        </div>

    </div>
  )
}

export default SignUp
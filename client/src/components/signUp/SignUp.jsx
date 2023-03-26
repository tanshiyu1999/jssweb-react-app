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
            <h4>Non Exchange Students</h4>
            <p>Follow the instruction on <a href="https:www.google.com">NUSync</a></p>

            <p>Then, fill in the form below:</p>

            
          </div>

          <div className="exchange-student-container">
            Exchange Student
          </div>
        </div>

        <div className="difficulty-container">
          <h4>Facing difficulties? Reach out at:</h4>
          <a href="https:www.google.com">contact@jss.sg</a>
        </div>

        <div className="faq-container">
          <h4>FAQ:</h4>
          <div className="Q&A-container">
            <p>Question</p>
            <p>Answer</p>
          </div>
        </div>

        <div className="bottom-graphic">
          <p>meow</p>
        </div>

    </div>
  )
}

export default SignUp
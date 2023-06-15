import React from 'react'
import './Footer.css'
import SocialIcons from '../reusable/SocialIcons'

const Footer = () => {
  return (
    <section id="footer">
      <div className="footer-container">
        <div className="web-info">
          <ul>
            <li>
              <span className="copyright">Copyright &copy; NUS JSS 2023</span>
              <br />
              <span>Page maintained by the current <a href="mailto:contact@jss.sg">IT Director</a></span>
            </li>
          </ul>
        </div>
        <div className="footer-socials">
          <SocialIcons className="socialsFooter" />
        </div>
        <div className="misc">
          <a>Privacy Policy</a>
          <br />
          <a>Terms of Use</a>
        </div>
      </div>
    </section>

  )
}

export default Footer
import React from 'react'

const Footer = () => {
  return (
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
      <div className="socials"></div>
      <div className="misc"></div>
    </div>
  )
}

export default Footer
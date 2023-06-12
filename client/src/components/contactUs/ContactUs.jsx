import React from 'react'
import './ContactUs.css';

const ContactUs = () => {
  return (
    <section id="contact">
      <div className="contact">
        <div className="header-container">
          <h2 className="contact-title">Contact Us</h2>
          <h3 className="pink-color contact-collaborate">Looking to collaborate with us?</h3>
          <h5 className="pink-color contact-address">Block AS8, Level 5, 10 Kent Ridge Crescent, Singapore 119260</h5>
          <h5 className="pink-color contact-email"><a href="mailto:contact@jss.sg">contact@jss.sg</a></h5>
        </div>

        <div className="map-container">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15955.190336014437!2d103.772334!3d1.296066!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1af92e1b84a1%3A0x22203e74bdfb54cc!2sNUS%2C%20Department%20of%20Japanese%20Studies!5e0!3m2!1sen!2sus!4v1686540316206!5m2!1sen!2sus" className="map" styles="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>



  )
}

export default ContactUs

{/* <section id="contact">
<div class="contact-container">
    <div class="row">
        <div class="col-12 text-center">
            <h2 class="section-heading text-uppercase">Contact Us</h2>
            <h3 class="section-subheading text-primary">Looking to collaborate with us?</h3>
            <h5 class="section-subheading text-primary contact-address">Block AS8, Level 5, 10 Kent Ridge Crescent, Singapore 119260</h5>
            <h5 class="section-subheading"><a class="text-primary" href="mailto:contact@jss.sg">contact@jss.sg</a></h5>
        </div>
        <div class="col-12 embed-responsive embed-responsive-16by9">
            <div class="embed-responsive-item">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7750.488716890388!2d103.7688686967911!3d1.2960188784595477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1af92e1b84a1%3A0x22203e74bdfb54cc!2sNUS%2C+Department+of+Japanese+Studies!5e0!3m2!1sen!2ssg!4v1534446410278" width="600" height="450" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </div>
</div>
</section> */}
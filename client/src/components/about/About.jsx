import React from 'react'
import './About.css'

const About = () => {
  return (
    <div id="about">
      <div className="about-slider">
        <div className="about-slides">
          <input type="radio" name="radio-btn" id="about-radio1" />
          <input type="radio" name="radio-btn" id="about-radio2" />
          <div className="about-slide about-first">
            <h1>ABOUT NUS JSS</h1>
            <div className="about-beginnings">
              <h3>
                1984
              </h3>
              <h3>
                Our Humble Beginnings
              </h3>
              <p>
                Established in 1984, the NUS Japanese Studies Society (JSS) is a student-run organization under the auspices of the Department of Japanese Studies that seeks to promote the understanding of Japan and appreciation of Japanese culture. It aims to bring the people of Japan and Singapore closer together by promoting mutual understanding, appreciation and cooperation. JSS is registered with the Registry of Societies, Singapore.
              </p>
              <p>
                In the JSS family, we also have 5 autonomous sub-clubs: Nihon Buyo Club (Japanese Traditional Dance), Sado Club (Japanese Tea Ceremony), KotoKottoN (Japanese Koto Ensemble), Odoro!! (Contemporary Japanese Dance Covers) and Japanese Music Club. Each sub-club engages their members in a specific area of Japanese culture through regular club activities.
              </p>
            </div>

            <div className="about-present">
              <h3>
                Present
              </h3>
              <h3>
                What We Do
              </h3>
              <p>
                JSS provides invaluable opportunities for exposure to Japanese culture and unites students with a shared passion for Japan’s vibrant traditions, arts and language. Our regular events revolve around various aspects of Japanese traditional and popular culture, and selected topics in Japanese Studies. Recent event themes include Japanese food, coffee culture, voice acting, as well as Japanese language and literature. Every year in June/July, we organise a Freshmen Orientation Camp, open to all incoming first-year students interested in Japan, to welcome them into the university.
              </p>
              <p>
                We also strengthen bilateral ties through extensive collaboration with Japanese partner universities, companies, and the local Japanese community. Currently, we maintain our engagement with our Japanese counterparts through interaction sessions with partner universities and our Brothers-and-Sisters Programme, both of which are currently held online. In pandemic-free times, we organise a mutual homestay exchange programme with our counterparts from Kyushu University where members get the opportunity to visit Kyushu as well as to host Kyushu University students during their stay in Singapore. We also conduct university visits for incoming students from Japan where Japanese students and JSS members can interact and build new friendships through a mutual cultural exchange.
              </p>
            </div>
          </div>
          <div>
            cat
          </div>
          {/* manual navigation start */}
          <div className="about-navigation-manual">
            <label htmlFor="about-radio1" className="about-manual-btn"></label>
            <label htmlFor="about-radio2" className="about-manual-btn"></label>
          </div>
          {/* manual navigation end */}
        </div>
      </div>
    </div>


  )
}

export default About
import React from "react"
import ReactDOM from "react-dom/client"
import Navbar from "/src/components/navbar/Navbar.jsx"
import Landing from "/src/components/landing/Landing.jsx"
import Event from "/src/components/events/Event.jsx"
import Sponsor from "/src/components/sponsors/Sponsor.jsx"
import SubClub from "/src/components/subclubs/SubClub.jsx"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      <SubClub />
      <Event />
      <Sponsor />
    </div>
  )
}

export default App
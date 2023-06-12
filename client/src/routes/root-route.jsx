import React from 'react';
import Navbar from "/src/components/navbar/Navbar.jsx"
import Landing from "/src/components/landing/Landing.jsx"
import Event from "/src/components/events/Event.jsx"
import Sponsor from "/src/components/sponsors/Sponsor.jsx"
import SubClub from "/src/components/subclubs/SubClub.jsx"
import SignUp from "/src/components/signUp/SignUp.jsx"
import {
  useLoaderData,
} from "react-router-dom";

const RootRoute = () => {

  const data = useLoaderData();
  
  return (
    <>
      <Navbar />
      <Landing />
      <SubClub data={data.subclubsData} />
      <Event data={data.eventsData} />
      <Sponsor data={data.sponsorsData} />
    </>
  )
}

export default RootRoute


/* -------------------- Loader Start -------------------- */
export async function loader() {
  try {
    let output = null;
    const res = await fetch("http://localhost:3000/client")
      .then(res => res.json())
      .then(data => {
        output = data
      })
    return output;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
/* -------------------- Loader End -------------------- */
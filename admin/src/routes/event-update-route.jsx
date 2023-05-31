import React, {Fragment, useState, useEffect} from "react";
import AbcIcon from '@mui/icons-material/Abc';
import Navbar from "../components/navbar/Navbar"
import Dashboard from "../components/dashboard/Dashboard"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subclubs from "../components/subclubs/Subclubs"
import EventUpdate from "../components/eventUpdate/EventUpdate";


function EventUpdateRoute(props) {
  return (
    <>
      <EventUpdate/>
    </>
  );
}

export default EventUpdateRoute

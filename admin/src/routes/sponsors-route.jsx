import React, { Fragment, useState, useEffect} from "react";
import AbcIcon from '@mui/icons-material/Abc';
import Navbar from "../components/navbar/Navbar"
import Dashboard from "../components/dashboard/Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sponsors from "../components//sponsors/Sponsors"


function SponsorsRoute(props) {
    return (
        <div className="login">
            <h1>Sponsors</h1>
            <Sponsors />
        </div>
    );
}

export default SponsorsRoute
import React, { Fragment, useState, useEffect} from "react";
import AbcIcon from '@mui/icons-material/Abc';
import Navbar from "../components/navbar/Navbar"
import Dashboard from "../components/dashboard/Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subclubs from "../components/subclubs/Subclubs"
import Logistic from "../components/logistic/Logistic"


function LogisticRoute(props) {
    return (
        <div className="ww">
            <Navbar />
            <h1>Logistic</h1>
            <Logistic />
        </div>
    );
}

export default LogisticRoute
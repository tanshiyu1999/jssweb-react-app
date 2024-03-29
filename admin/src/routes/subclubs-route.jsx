import React, { Fragment, useState, useEffect} from "react";
import AbcIcon from '@mui/icons-material/Abc';
import Navbar from "../components/navbar/Navbar"
import Dashboard from "../components/dashboard/Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subclubs from "../components/subclubs/Subclubs"


function SubclubsRoute(props) {
    return (
        <div className="login">
            <h1>Subclubs</h1>
            <Subclubs />
        </div>
    );
}

export default SubclubsRoute
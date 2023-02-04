import React, { Fragment, useState, useEffect} from "react";
import AbcIcon from '@mui/icons-material/Abc';
import Navbar from "../components/navbar/Navbar"
import Dashboard from "../components/dashboard/Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SubclubsRoute(props) {
    return (
        <div className="login">
            <Navbar />
            <h1>Subclubs</h1>

            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>

        </div>
    );
}

export default SubclubsRoute
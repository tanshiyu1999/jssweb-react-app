import React, { Fragment, useState, useEffect} from "react";
import AbcIcon from '@mui/icons-material/Abc';
import Navbar from "../components/navbar/Navbar"
import Dashboard from "../components/dashboard/Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subclubs from "../components/subclubs/Subclubs"
import Reimbursement from "../components/reimbursement/Reimbursement"


function ReimbursementRoute(props) {
    return (
        <div className="">
            <Navbar />
            <h1>Reimbursement</h1>
            <Reimbursement />
        </div>
    );
}

export default ReimbursementRoute
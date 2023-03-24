import React, { Fragment, useState, useEffect} from "react";
import AbcIcon from '@mui/icons-material/Abc';
import Navbar from "../components/navbar/Navbar"
import Dashboard from "../components/dashboard/Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


function DashboardRoute(props) {

    const [name, setName] = useState("");

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            
            setName(parseRes.user_name)
        } catch (err) {
            console.error(err.message)
            
        }
    }

    useEffect(() => {
        getName();
    }, [])

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
        toast.success("Logged Out")
    }

    return (
        <div className="login">
            <Navbar />
            <p>DASHBOARD {name}</p>

            <Link to="/subclubs">Go to Subclub</Link>
            <br/>
            <Link to="/eventupdate">Go to Event Update</Link>
            <br/>
            <Link to="/logistic">Go to Logistic</Link>
            <br/>
            <Link to="/treasuryReimbursement">Go to Treasury Reimbursement</Link>
            <br/>
            
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>

        </div>
    );
}

export default DashboardRoute


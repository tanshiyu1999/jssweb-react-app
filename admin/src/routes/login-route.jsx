import AbcIcon from '@mui/icons-material/Abc';
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar"
import Login from "../components/login/Login"
import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginRoute(props) {

    const [inputs, setInputs] = useState({
        email: "123@gmail.com",
        password: "default"
    })

    const { email, password } = inputs;

    const onChange = (e) => {
  
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {

            const body = {email, password}
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                props.setAuth(true);
                toast.success("login successfully");
            } else {
                props.setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message)            
        }
        
    }


    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    className="form-control my-3" 
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    className="form-control my-3" 
                    value={password}
                    onChange={e => onChange(e)}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">Register</Link>
            



        </div>
    );
}

export default LoginRoute


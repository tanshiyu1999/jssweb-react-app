import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterRoute(props) {

    const [inputs, setInputs] = useState({
        email: "",
        password: "default",
        name: "test",
    })

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const email = inputs.email;
            const password = inputs.password;
            const name = inputs.name;
            const body = {email, password, name};
            console.log(body);
            console.log("------------------------")
            console.log(JSON.stringify(body))

            const response = await fetch(
                "http://localhost:3000/auth/register", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                props.setAuth(true);
                toast.success("Registered Successfully")
            } else {
                props.setAuth(false)
                toast.error(parseRes)
            }

            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    className="form-control my-3" 
                    value={inputs.email}
                    onChange= {e => onChange(e)}
                />
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={inputs.password}
                    onChange= {e => onChange(e)} />
                <input type="text" name="name" placeholder="name" className="form-control my-3" value={inputs.name}
                    onChange= {e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Login</Link>

        </Fragment>
    );
}

export default RegisterRoute


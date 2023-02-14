import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import './App.css'
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import Root from "./routes/root"
import ErrorPage from "./routes/error-page";
import LoginRoute from "./routes/login-route"
import DashboardRoute from "./routes/dashboard-route"
import RegisterRoute from "./routes/register-route"
import SubclubsRoute from "./routes/subclubs-route"



function App() {
  const notify = () => toast("Wow so easy!");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  // Validate JWT Token on refreshes
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3000/auth/is-verify", {
        method: "GET",
        headers: {token : localStorage.token}
      });

      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect( () => {
    isAuth()
  })

  const loginLoader = async () => {
    if (isAuthenticated) {
      return redirect("/dashboard");
    }
    return null;
  };

  const dashboardLoader = async () => {
    if (isAuthenticated) {
      return null;
    }
    return redirect("/login");
  }

  const registerLoader = async () => {
    if (isAuthenticated) {
      return redirect("/dashboard");
    }
    return null;
  }

  const subclubsLoader = async () => {
    if (isAuthenticated) {
      return null;
    }
    return redirect("/login");
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
    
    },
    {
      path: "login",
      element: <LoginRoute setAuth={setAuth} />,
      loader: loginLoader,
    },
    {
      path: "/dashboard",
      element: <DashboardRoute setAuth={setAuth} />,
      loader: dashboardLoader,
    },
    { 
      path: "register",
      element: <RegisterRoute setAuth={setAuth} />,
      loader: registerLoader,
    },
    { 
      path: "subclubs",
      element: <SubclubsRoute setAuth={setAuth} />,
      loader: subclubsLoader,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App

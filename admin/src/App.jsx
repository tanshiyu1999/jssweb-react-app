import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import './App.css'
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* -------------------- Routes Import Start -------------------- */
import Root from "./routes/root"
import ErrorPage from "./routes/error-page"
import LoginRoute from "./routes/login-route"
import DashboardRoute from "./routes/dashboard-route"
import RegisterRoute from "./routes/register-route"
import SubclubsRoute from "./routes/subclubs-route"
import EventUpdateRoute from "./routes/event-update-route";
/* -------------------- Routes Import End -------------------- */

/* -------------------- Subclubs Import Start -------------------- */
import { 
  loaderInput as subclubLoaderInput, 
  action as subclubsAction 
} from "./components/subclubs/Subclubs"
import EditSubclub, {
  loader as editSubclubLoader,
  action as editSubclubAction,
} from "./components/subclubs/EditSubclub"
/* -------------------- Subclubs Import End -------------------- */

/* -------------------- Event Import Start -------------------- */
import AddEvent, {
  action as addEventAction
} from "./components/eventUpdate/AddEvent";
import { 
  loaderInput as eventUpdateLoaderInput,
  action as eventUpdateAction
} from "./components/eventUpdate/EventUpdate";
import EditEvent, {
  loader as editEventLoader,
  action as editEventAction
} from "./components/eventUpdate/EditEvent";
/* -------------------- Event Import End -------------------- */

/* -------------------- Logistics Import Start -------------------- */
import Logistic, {
  loader as logisticLoader
} from "./components/logistic/Logistic";
import AddLogistic, {
  action as addLogisticAction
} from "./components/logistic/AddLogistic";
import EditLogistic, {
  action as editLogisticAction,
  loader as editLogisticLoader
} from "./components/logistic/EditLogistic";
/* -------------------- Logistics Import End -------------------- */



function App() {

  /* -------------------- Authentication Start -------------------- */
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

  /* -------------------- Authentication End -------------------- */

  /* -------------------- Loaders Start -------------------- */
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
      return subclubLoaderInput();
    }
    return redirect("/login");
  }

  const eventUpdateLoader = async () => {
    if (isAuthenticated) {
      return eventUpdateLoaderInput();
    }
    return redirect('/login');
  };

  /* -------------------- Loaders End -------------------- */


  /* -------------------- Router Start -------------------- */
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
      path: "dashboard",
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
      action: subclubsAction,
      children: [
        {
          path: ":subclubId/edit",
          element: <EditSubclub />,
          loader: editSubclubLoader,
          action: editSubclubAction,
        }
      ]
    },
    { 
      path: "eventupdate",
      element: <EventUpdateRoute setAuth={setAuth} />,
      loader: eventUpdateLoader,
      action: eventUpdateAction,
      children: [
        {
          path: ":eventId/edit",
          element: <EditEvent />,
          loader: editEventLoader,
          action: editEventAction
        },
        {
          path: "addevent",
          element: <AddEvent />,
          action: addEventAction,
        }
      ]
    },
    {
      path: "logistic",
      element: <Logistic setAuth={setAuth} />,
      loader: logisticLoader,
      children: [
        {
          path: "addlogistic",
          element: <AddLogistic />,
          action: addLogisticAction
        },
        {
          path: ":logisticId/editLogistic",
          element: <EditLogistic />,
          action: editLogisticAction,
          loader: editLogisticLoader
        }
      ]
    }
  ]);
  /* -------------------- Router End -------------------- */

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Route
} from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box } from "@mui/material";


/* -------------------- Importing Theme Relevant Library Start -------------------- */
import { useSelector } from "react-redux"; 
import { themeSettings } from "./theme.js";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
/* -------------------- Importing Theme Relevant Library End -------------------- */


/* -------------------- Routes Import Start -------------------- */
import Root from "./routes/root"
import ErrorPage from "./routes/error-page"
import LoginRoute from "./routes/login-route"
import DashboardRoute from "./routes/dashboard-route"
import RegisterRoute from "./routes/register-route"
import SubclubsRoute from "./routes/subclubs-route"
import EventUpdateRoute from "./routes/event-update-route";
import LogisticRoute from "./routes/logistic-route"
import ReimbursementRoute from "./routes/reimbursement-route"
import SponsorsRoute from "./routes/sponsors-route" 
import AdminRoute from "./routes/admin-route.jsx"

/* -------------------- Routes Import End -------------------- */

/* -------------------- Admin Import Start -------------------- */
/* -------------------- Admin Import End -------------------- */


/* -------------------- Subclubs Import Start -------------------- */
import { 
  loaderInput as subclubLoaderInput, 
  action as subclubsAction 
} from "./components/subclubs/Subclubs"
import EditSubclub, {
  loader as editSubclubLoader,
  action as editSubclubAction,
} from "./components/subclubs/EditSubclub"
import AddSubclub, {
  action as addSubclubAction,
} from "./components/subclubs/AddSubclub.jsx"
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
  loader as logisticLoader,
  action as logisticAction
} from "./components/logistic/Logistic";
import AddLogistic, {
  action as addLogisticAction
} from "./components/logistic/AddLogistic";
import EditLogistic, {
  action as editLogisticAction,
  loader as editLogisticLoader
} from "./components/logistic/EditLogistic";

import BorrowLogistic, {
  loader as borrowLogisticLoader,
  action as borrowLogisticAction
} from "./components/logistic/BorrowLogistic";
/* -------------------- Logistics Import End -------------------- */

/* -------------------- Treasury Reimbursement Import Start -------------------- */
import Reimbursement, {
  loader as reimbursementLoader,
  action as reimbursementAction,
} from "./components/reimbursement/Reimbursement";
import AddReimbursement, {
  action as addReimbursementAction,
} from "./components/reimbursement/AddReimbursement";

import EditReimbursement, {
  action as editReimbursementAction,
  loader as editReimbursementLoader
} from "./components/reimbursement/EditReimbursement";

/* -------------------- Treasury Reimbursement Import End -------------------- */


/* -------------------- Sponsors Import Start -------------------- */
import AddSponsor, {
  action as addSponsorAction
} from "./components/sponsors/AddSponsor"

import Sponsors, {
  loader as sponsorsLoader,
  action as sponsorsAction
} from "./components/sponsors/Sponsors"

import EditSponsor, {
  action as editSponsorAction,
} from "./components/sponsors/EditSponsor"


/* -------------------- Sponsors Import End -------------------- */



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);




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
      children: [
        {
          path: "admin",
          element: <AdminRoute sethAuth={setAuth} />,
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
            },
            {
              path: "addsubclub",
              element: <AddSubclub />,
              action: addSubclubAction,
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
          element: <LogisticRoute setAuth={setAuth} />,
          loader: logisticLoader,
          action: logisticAction,
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
            },
            {
              path: ":borrowLogisticId/borrowLogistic",
              element: <BorrowLogistic />,
              loader: borrowLogisticLoader,
              action: borrowLogisticAction
            },
          ]
        },
        {
          path: "reimbursement",
          element: <ReimbursementRoute setAuth={setAuth} />,
          loader: reimbursementLoader,
          action: reimbursementAction,
          children: [
            {
              path: "addReimbursement",
              element: <AddReimbursement />,
              action: addReimbursementAction,
            },
            {
              path: ":reimbursementId/editReimbursement",
              element: <EditReimbursement />,
              action: editReimbursementAction,
            }
          ]
        },
        {
          path: "sponsors",
          element: <SponsorsRoute setAuth={setAuth} />,
          loader: sponsorsLoader,
          action: sponsorsAction,
          children: [
            {
              path: "addSponsor",
              element: <AddSponsor />,
              action: addSponsorAction,
            },
            {
              path: ":sponsorId/editSponsor",
              element: <EditSponsor />,
              action: editSponsorAction
            }
          ]
        }
      ]
    },
  ]);
  /* -------------------- Router End -------------------- */

  // console.log(theme)
  // console.log(theme.palette.background.alt)
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App
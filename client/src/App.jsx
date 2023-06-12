import React from "react"
import RootRoute, {
  loader as rootLoader,
} from "/src/routes/root-route.jsx"


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    loader: rootLoader, 
    children: [
      {
        path: "event"
      },
      {
        path: "signup"
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
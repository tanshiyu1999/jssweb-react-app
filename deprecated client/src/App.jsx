import React from "react"
import RootRoute from "/src/routes/root-route.jsx"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
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
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
      {/* <RouterProvider router={router} /> */}
    </>
  )
}

export default App
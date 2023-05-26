import React, { useState } from 'react';
import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import { Link, Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";



function Root() {
  const isNonMobile = useMediaQuery("(min-width: 600px");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const data = {}
    

  return (
    <Box display={isNonMobile ? "flex" : "block" } width="100%" height="100%">

      <Sidebar
        // sending {} because initially, data might be undefined as its fetching, so it should send {} so not to break the app
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box flexGrow={1}>
        <Navbar 
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>

    </Box>
  );
}

export default Root

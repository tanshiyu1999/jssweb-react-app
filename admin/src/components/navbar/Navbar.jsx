import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppBar, IconButton, InputBase, Toolbar, useTheme, Button, Box, Typography, Menu, MenuItem } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import { setMode } from "../../state/index.js";
import FlexBetween from '../reusable/FlexBetween';


export default function Navbar({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  // Importing Global State
  const dispatch = useDispatch();

  // Importing Theme
  const theme = useTheme();

  // For Dropdown Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between"}}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          {/* Below is the Search Box */}
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: "25px"}} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px"}} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px"}} />
          </IconButton>

          <FlexBetween>
            <Button onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem"}}>
              <Box
                component="img"
                alt="profile"
                src="http://placekitten.com/200/300"
                height="32px"
                width="32px"
                borderRadius="50%"
                // objectFit crops the image to fit
                sx={{ objectFit: "cover"}}
              />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100]}}>
                  {/* {user.name} */}
                </Typography>
                <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200]}}>
                  {/* {user.occupation} */}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px"}}
              />
            </Button>
            {/* The menu is in the MUI documentation: https://mui.com/material-ui/react-popover/ */}
            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center"}}>
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>

        </FlexBetween>
      </Toolbar>

    </AppBar>

  );
}
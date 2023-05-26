import React, { useEffect, useState } from 'react'
import {
  Box, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  useTheme
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../reusable/FlexBetween';

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />
  },
  {
    text: "Website General",
    icon: null,
  },
  {
    text: "Subclubs",
    icon: <ShoppingCartOutlined />
  },
  {
    text: "Event",
    icon: <Groups2Outlined />
  },
  {
    text: "Sponsors",
    icon: <Groups2Outlined />
  },
  {
    text: "Internal Affair",
    icon: null
  },
  {
    text: "Admin",
    icon: <PublicOutlined />
  },
  {
    text: "Logistic",
    icon: <PublicOutlined />
  },
  {
    text: "Reimbursement",
    icon: <PublicOutlined />
  },
  {
    text: "Placeholder",
    icon: null
  },

]

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  user
}) => {

  // What page we are currently at
  const { pathname } = useLocation();
  const [active, setActive] = useState("");

  // To navigate to other pages
  const navigate = useNavigate();

  // Grabbing the theme and colours
  const theme = useTheme();

  useEffect(() => {
    // Anytime pathname change, active value goes to current page
    setActive(pathname.substring(1));
  }, [pathname])

  return (
    <Box component="nav">
      { isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx = {{
            width: drawerWidth,
            // to inspect to find the Mui class name
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth
            }
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Japanese Studies Society
                  </Typography>

                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}

              </FlexBetween>
            </Box>

            {/* List of nav items below */}
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} fontSize="1.2rem" sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  )
                }
                let lcText = text.toLowerCase();
                switch(lcText) {
                  case "event":
                    lcText = "eventupdate"
                    break;
        
                  default:
                    break;
                }
                
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                      }}
                      sx={{
                        backgroundColor: active === lcText 
                          ? theme.palette.secondary[300]
                          : "transparent",
                        color: active === lcText 
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx = {{
                          ml: "2rem",
                          color: active === lcText 
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto "}} />
                      )}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src="http://placekitten.com/200/300"
                height="40px"
                width="40px"
                borderRadius="50%"
                // objectFit crops the image to fit
                sx={{ objectFit: "cover"}}
              />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100]}}>
                  {/* {user.name} */}
                  placerholder name
                </Typography>
                <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[200]}}>
                  {/* {user.occupation} */}
                  placeholder occupation
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px"}}  
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
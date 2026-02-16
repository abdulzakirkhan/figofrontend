import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import {  useState } from "react";



const Dashboardnav = ({ type,navigatePage }) => {
  const [profileData, setProfileData] = useState({});

  return (
    <Box
      className=""
      sx={{
        backgroundColor: "var(--panel-bg)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
     
     
      <Box
        className=""
        sx={{ display: "flex", height: "100vh", width: "100vw" }}
      >
        <CssBaseline />
        <Header profileData={profileData} navigatePage={navigatePage} />
        <Box
          style={{ overflow: "auto" }}
          component="main"
          sx={{
            flexGrow: 1,
            width: {
              xs: "100%",
              md: `calc(100% - ${270}px)`,
            },
            marginTop: "85px",
          }}
        >
          <Outlet context={{ type }} />

          {/* <Footer/> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboardnav;

import React from "react";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie/loading.json";

const AppLoader = ({
  fullPage = false,
  size = 250,
}) => {
  return (
    <Box
      sx={{
        minHeight: fullPage ? "70vh" : "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Lottie
        animationData={loadingAnimation}
        loop
        style={{ width: size, height: size }}
      />

    
    </Box>
  );
};

export default AppLoader;





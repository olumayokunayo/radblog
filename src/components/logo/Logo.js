import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Typography
      variant="h4"
      component={Link}
      to="/"
      sx={{
        flexGrow: 1,
        color: "black",
        textDecoration: "none",
        fontWeight: 600,
        elevation: 0,
      }}
    >
      Rad<span style={{ color: "green" }}>Blog</span>
    </Typography>
  );
};

export default Logo;

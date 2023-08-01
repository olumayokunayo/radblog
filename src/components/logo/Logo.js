import { Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const homeBtn = () => {
    navigate("/");
  };
  return (
    <Typography
      onClick={homeBtn}
      variant="h4"
      component={Link}
      to="/"
      sx={{
        flexGrow: 1,
        color: "black",
        textDecoration: "none",
        fontWeight: 600,
        elevation: 0,
        letterSpacing: -2
      }}
    >
      Rad<span style={{ color: "green" }}>Blog</span>
    </Typography>
  );
};

export default Logo;

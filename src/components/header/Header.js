import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";

const Header = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#ffffff", boxShadow: "none" }}
        >
          <Toolbar>
            <Logo />

            {/* Sign in button */}
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "green",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#fff",
                },
              }}
            >
              Sign in
            </Button>

            {/* Sign up button */}
            <Button
              component={Link}
              to="/register"
              sx={{
                color: "#fff",
                fontWeight: 600,
                backgroundColor: "green",
                textTransform: "none",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
              }}
            >
              Sign up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
};

export default Header;

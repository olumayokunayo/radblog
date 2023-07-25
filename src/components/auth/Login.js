import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
      <Container
        maxWidth="xs"
        sx={{ marginTop: "5rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      >
        <Box
          sx={{
            paddingTop: "2rem",
            bgcolor: "#fff",
            height: "65vh",
            textAlign: "center",
          }}
        >
          <Logo />
          <Typography
            variant="h5"
            sx={{
              marginTop: "1rem",
              marginBottom: "2rem",
              fontWeight: 300,
              lineHeight: 1.6,
              letterSpacing: "0.2rem",
            }}
          >
            Welcome Back
          </Typography>
          <Button sx={{ border: "0.5px solid black", padding: "0.6rem 4rem" }}>
            <FcGoogle sx={{ color: "red" }} size={25} />
            <Typography
              variant="body1"
              sx={{ textTransform: "none", color: "black" }}
            >
              {" "}
              &nbsp; Continue With Google
            </Typography>
          </Button>
          <Typography
            variant="body2"
            sx={{ marginTop: "1rem", marginBottom: "1rem", fontWeight: 300 }}
          >
            Or
          </Typography>
          <form>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  label="Email Address"
                  id="outlined-size-small"
                  size="medium"
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="outlined-size-normal"
                  size="medium"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <AiOutlineEye size={25} />
                        ) : (
                          <AiOutlineEyeInvisible size={25} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="body2" sx={{ textAlign: "right" }}>
                  Forgot Password?
                </Typography>
                <Button
                  sx={{
                    bgcolor: "green",
                    color: "#fff",
                    width: "45ch",
                    marginTop: "1.5rem",
                    padding: "0.8rem",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "darkgreen",
                    },
                  }}
                >
                  Sign in
                </Button>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "right", marginTop: "1rem" }}
                >
                  Don't have an account? &nbsp;
                  <Link style={{ color: "black" }} to="/register">
                    Sign up
                  </Link>
                </Typography>
              </div>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;

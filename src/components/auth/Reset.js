import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button,  TextField, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import Loader from "../loader/Loader";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  // form handler
  const formHandler = (e) => {
    e.preventDefault();
    const { email } = data;
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success(
          "Password reset email sent has been sent to your email address"
        );
    //  navigate('/login')
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Enter a valid email address");
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <Container
        maxWidth="xs"
        sx={{ marginTop: "5rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      >
        <Box
          sx={{
            padding: "2rem",
            bgcolor: "#fff",
            height: "fit-content",
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
            Reset password
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Email Address"
                id="outlined-size-small"
                size="medium"
                name="email"
                value={data.email}
                onChange={(e) => handleInputChange(e)}
              />

              <Typography
                variant="body2"
                sx={{ textAlign: "right" }}
              ></Typography>
              <Button
                type="submit"
                onClick={formHandler}
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
                Reset password
              </Button>
            </div>
            <Button component={Link} to='/login'>login</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Reset;

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Loader from "../loader/Loader";
import { login } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // const formHandler = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const { email, password, firstName, lastName } = data;
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       const displayName = `${firstName} ${lastName}`;

  //       updateProfile(user, { displayName });
  //       const userRef = addDoc(collection(db, "users"), {
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //       });
  //       setIsLoading(false);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error.message);
  //     });
  // };

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password, firstName, lastName } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const displayName = `${firstName} ${lastName}`;

        updateProfile(user, { displayName });

        // Dispatch the login action to update the Redux store with the user information
        dispatch(
          login({
            firstName: firstName,
            lastName: lastName,
            email: email,
          })
        );

        const userRef = addDoc(collection(db, "users"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
      });
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
    {isLoading && <Loader />}
      <Container
        maxWidth="xs"
        sx={{ marginTop: "2rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      >
        <Box
          sx={{
            paddingTop: "1rem",
            paddingBottom: "2rem",
            bgcolor: "#fff",
            height: "70vh",
            textAlign: "center",
          }}
        >
          <Logo />
          <Typography
            variant="h5"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              fontWeight: 300,
              lineHeight: 1.6,
              letterSpacing: "0.2rem",
            }}
          >
            Create Account
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="First Name"
                //   id="outlined-size-small"
                size="medium"
                name="firstName"
                value={data.firstName}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                label="Last Name"
                id="outlined-size-normal"
                size="medium"
                name="lastName"
                value={data.lastName}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <TextField
                label="Email Address"
                //   id="filled-size-small"
                variant="filled"
                size="small"
                name="email"
                value={data.email}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                //   id="outlined-size-small"
                size="medium"
                name="password"
                value={data.password}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                //   id="outlined-size-normal"
                size="medium"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={(e) => handleInputChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={handleTogglePassword}>
                        {showPassword ? (
                          <AiOutlineEye size={25} />
                        ) : (
                          <AiOutlineEyeInvisible size={25} />
                        )}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                onClick={formHandler}
                sx={{
                  bgcolor: "green",
                  width: "45ch",
                  color: "#fff",
                  marginTop: "1rem",
                  padding: "0.8rem 2rem",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "darkgreen",
                  },
                }}
              >
                Continue
              </Button>
              <Typography
                variant="body2"
                sx={{ textAlign: "right", marginTop: "1rem" }}
              >
                Already have a RadBlog account?
                <Link style={{ color: "black" }} to="/login">
                  &nbsp; Sign in
                </Link>
              </Typography>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
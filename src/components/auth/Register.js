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
import { auth } from "../../firebase/config";
import Loader from "../loader/Loader";
import { signup } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
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

  // Capitalize first letter of input field
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      setData({ ...data, [name]: capitalizeFirstLetter(value) });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password, firstName, lastName } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const displayName = `${firstName} ${lastName}`;

      await updateProfile(user, { displayName });

      console.log(user);

      dispatch(
        signup({
          firstName,
          lastName,
          email,
          uid: user.uid,
        })
      );

      setIsLoading(false);
      toast.success("Registration successful");
      navigate(`/manage-interests`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
      {<ToastContainer />}
      {isLoading && <Loader />}
      <Container
        maxWidth="xs"
        sx={{
          padding: "1rem",
          marginTop: "5rem",
          boxShadow: "2px 4px 4px 8px rgba(0,0,0,0.05)",
          height: "fit-content",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            // paddingTop: "1rem",
            // paddingBottom: "2rem",
            bgcolor: "#fff",
            height: "fit-content",
            textAlign: "center",
          }}
        >
          {/* <Logo /> */}
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
              "@media (max-width: 700px)": {
                "& .MuiTextField-root": { m: 1, width: "100%" },
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="First Name"
                size="medium"
                name="firstName"
                value={data.firstName}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                sx={{ "@media (max-width: 700px)": { width: "100px" } }}
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
                variant="filled"
                size="small"
                name="email"
                value={data.email}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                size="medium"
                name="password"
                value={data.password}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
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
                {isLoading ? "Loading" : "Continue"}
              </Button>
              <Typography
                variant="body2"
                sx={{ textAlign: "center", marginTop: "2rem" }}
              >
                Already have a RadBlog account?
                <Link
                  style={{ color: "green", textDecoration: "none" }}
                  to="/login"
                >
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

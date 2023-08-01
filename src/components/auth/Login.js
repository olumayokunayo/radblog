import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Loader from "../loader/Loader";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // sign in with google
  const provider = new GoogleAuthProvider();
  const googleHandler = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("login successful");
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
      });
  };

  // toggle password
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // form handler
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
         // Dispatch the login action to update the Redux store with the user information
         setIsLoading(false);
         dispatch(
          login(user)
        );
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
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
          <Button
            sx={{ border: "0.5px solid black", padding: "0.6rem 4rem" }}
            onClick={googleHandler}
          >
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
                name="email"
                value={data.email}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                id="outlined-size-normal"
                size="medium"
                name="password"
                value={data.password}
                onChange={(e) => handleInputChange(e)}
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
        </Box>
      </Container>
    </>
  );
};

export default Login;

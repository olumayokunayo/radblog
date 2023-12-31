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
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
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
        toast.success("Login successful");
        localStorage.removeItem("likedBlogs");
        localStorage.removeItem("bookmarkedBlogs");
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
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
        const { email, uid, displayName } = user;
        setIsLoading(false);
        toast.success("Login successful");
        dispatch(login({ email, uid, displayName }));
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {<ToastContainer />}
      {isLoading && <Loader />}
      <Container
        maxWidth="xs"
        sx={{
          marginTop: "6rem",
          boxShadow: "2px 4px 4px 8px rgba(0,0,0,0.05)",
          height: "fit-content",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            paddingTop: "2rem",
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
              "@media (max-width: 700px)": {
                "& .MuiTextField-root": { m: 1, width: "100%" },
              },
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
                <Link
                  to="/reset-password"
                  style={{ textDecoration: "none", color: "#222" }}
                >
                  Forgot Password?
                </Link>
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
                {isLoading ? "Loading" : " Sign in"}
              </Button>
              <Typography
                variant="body2"
                sx={{ textAlign: "center", marginTop: "3rem" }}
              >
                Don't have an account? &nbsp;
                <Link
                  style={{ color: "green", textDecoration: "none" }}
                  to="/register"
                >
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

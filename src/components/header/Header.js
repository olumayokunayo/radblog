import { React } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Container, MenuItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  selectDisplayName,
  selectIsLoggedIn,
  user_name,
} from "../../redux/slice/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InterestsIcon from "@mui/icons-material/Interests";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "firebase/auth";
import Loader from "../loader/Loader";
import { SHOW_WRITE_POST, selectIsShown } from "../../redux/slice/showSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Header = () => {
  const isShown = useSelector(selectIsShown);
  const userdisplayName = useSelector(selectDisplayName);
  console.log(userdisplayName);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState("");
  const [showHeader, setShowHeader] = useState(true);

  const fixedNavbar = () => {
    if (window.scrollY > 50) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", fixedNavbar);

    return () => window.removeEventListener("scroll", fixedNavbar);
  }, []);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
        navigate("/login");
      });
  };
  const handleWritePost = () => {
    dispatch(SHOW_WRITE_POST(false));
    navigate("/write-blog");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        const displayUsername = user.displayName.charAt(0).toLocaleUpperCase();
        setDisplay(displayUsername);

        dispatch(login(user));
        dispatch(
          user_name({
            username: displayUsername,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {showHeader && (
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="sticky"
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "none",
                padding: "0.5rem",
                top: 0,
              }}
            >
              <Toolbar>
                <Logo />
                {isLoggedIn ? (
                  <>
                    <Button
                      onClick={handleWritePost}
                      component={Link}
                      to="/write-blog"
                      sx={{
                        bgcolor: "green",
                        padding: "1rem",
                        borderRadius: "30px",
                        color: "#fff",
                        display: "flex",
                        gap: "0.3rem",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          bgcolor: "darkgreen",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          textTransform: "none",
                          textDecoration: "none",
                          color: "#fff",
                        }}
                      >
                        Write a Post
                      </Typography>
                      <CreateIcon />
                    </Button>
                    <Button
                      sx={{
                        "&:hover": {
                          bgcolor: "none",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          flexGrow: 0,
                          "&:hover": {
                            bgcolor: "none",
                          },
                        }}
                      >
                        {/* <Tooltip> */}
                        <IconButton
                          onClick={handleOpenUserMenu}
                          sx={{
                            p: 0,
                            borderRadius: "15px",
                            bgcolor: "#222",
                            color: "#fff",
                            "&:hover": {
                              bgcolor: "#333333",
                              borderRadius: "none",
                              color: "#fff",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              padding: "0.4rem 0.5rem",
                              borderRadius: "20px",
                            }}
                          >
                            {userdisplayName}
                          </Typography>
                          <ExpandMoreIcon style={{ color: "#fff" }} />
                          {/* <Avatar
                            sx={{ bgcolor: "green" }}
                            alt={display}
                            src="/static/images/avatar/2.jpg"
                          /> */}
                        </IconButton>
                        {/* </Tooltip> */}
                        <Menu
                          sx={{
                            mt: "45px",
                            marginTop: "4rem",
                            "& .css-olj38-MuiButtonBase-root-MuiMenuItem-root:hover":
                              {
                                backgroundColor: "transparent",
                              },
                          }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          <MenuItem
                            sx={{
                              "&:hover": {
                                bgcolor: "none",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                              }}
                            >
                              <Button
                                sx={{
                                  textTransform: "none",
                                  color: "#333333",
                                  display: "flex",
                                  gap: "0.5rem",
                                }}
                              >
                                <PersonOutlineIcon />
                                <Typography>
                                  <Link
                                    to="/profile"
                                    style={{
                                      textDecoration: "none",
                                      color: "#222",
                                    }}
                                  >
                                    Profile
                                  </Link>
                                </Typography>
                              </Button>
                              <Button
                                sx={{
                                  textTransform: "none",
                                  color: "#333333",
                                  display: "flex",
                                  gap: "0.5rem",
                                }}
                              >
                                {/* <InterestsIcon /> */}
                                {/* <Typography>
                                  <Link to="/manage-interests">
                                    Manage Interests
                                  </Link>
                                </Typography> */}
                              </Button>
                              <hr style={{ width: "100%" }} />
                              <Button
                                onClick={logoutHandler}
                                sx={{
                                  width: "100%",
                                  textTransform: "none",
                                  display: "flex",
                                  gap: "0.5rem",
                                  color: "#222",
                                  padding: "0.5rem 2rem",
                                  marginTop: "1rem",
                                  backgroundImage:
                                    "linear-gradient(to top, green, #fff)",
                                }}
                              >
                                <Typography variant="body2">
                                  Sign Out
                                </Typography>
                                <AiOutlineLogout size={20} />
                              </Button>
                            </Box>
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Toolbar>
            </AppBar>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Header;

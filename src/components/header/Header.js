import { React } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Avatar, Container, MenuItem, Typography } from "@mui/material";
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
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "firebase/auth";
import Loader from "../loader/Loader";
import { SHOW_WRITE_POST } from "../../redux/slice/showSlice";
import "./Header.css";

const Header = () => {
  const userdisplayName = useSelector(selectDisplayName);
  console.log(userdisplayName);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [isWritingBlog, setIsWritingBlog] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);

  const fixedNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
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
        localStorage.removeItem("likedBlogs")
        localStorage.removeItem("bookmarkedBlogs")
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
        navigate("/login");
      });
  };
  const handleWritePost = () => {
    setIsWritingBlog(true);
    dispatch(SHOW_WRITE_POST(false));
    navigate("/write-blog");
  };

  useEffect(() => {
    if (isLoading) {
      const delay = setTimeout(() => {
        setIsLoading(false);
        navigate("/profile");
      }, 1000);

      return () => clearTimeout(delay);
    }
  }, [isLoading, navigate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName } = user;
        const displayUsername = displayName.charAt(0).toLocaleUpperCase();
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
          <Box sx={{ flexGrow: 2 }}>
            <AppBar
              className={scrollPage ? "fixed" : ""}
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 2px 2px rgba(0,0,0,0.01)",
                padding: "0.5rem 8rem",
                "@media (max-width: 800px)": {
                  flexDirection: "column",
                  padding: "0.5rem",
                },
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
                        "@media (max-width: 800px)": {
                          padding: "0.5rem 1rem ",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          textTransform: "none",
                          textDecoration: "none",
                          color: "#fff",
                          "@media (max-width: 700px)": { display: "none" },
                        }}
                      >
                        Write a Post
                      </Typography>
                      <CreateIcon />
                    </Button>
                    <div
                      style={{
                        "&:hover": {
                          bgcolor: "none",
                        },
                        padding: "1rem",
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
                        <IconButton
                          onClick={handleOpenUserMenu}
                          sx={{
                            p: 0,
                            borderRadius: "15px",
                            color: "#fff",
                          }}
                        >
                          <Avatar
                            sx={{ bgcolor: "#222" }}
                            alt={display}
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
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
                                    onClick={() => setIsLoading(true)}
                                  >
                                    {isLoading ? <Loader /> : "Profile"}
                                  </Link>
                                </Typography>
                              </Button>
                              <hr style={{ width: "100%" }} />
                              <Button
                                onClick={logoutHandler}
                                sx={{
                                  width: "100%",
                                  textTransform: "none",
                                  display: "flex",
                                  gap: "0.5rem",
                                  color: "#fff",
                                  marginTop: "1rem",
                                  bgcolor: "#000000ed",
                                  "&:hover": {
                                    bgcolor: "#222",
                                  },
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
                    </div>
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

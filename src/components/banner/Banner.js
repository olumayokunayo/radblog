import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import backgroundImg from "../../images/rad.jpg";
import { Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Banner.css";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const Banner = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const delay = setTimeout(() => {
        setIsLoading(false);
        navigate("/blog");
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [isLoading, navigate]);
  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundImage: "linear-gradient(to right, #e6f4e9 ,#fff, #fff)",
        padding: "2rem",
        "@media (max-width: 600px)": {
          marginBottom: "-4rem",
          backgroundImage: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "2rem", alignItems: "center" }}
        >
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 500,
                fontSize: "3rem",
                marginBottom: "1rem",
                "@media (max-width: 800px)": {
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  padding: "1rem 0rem",
                },
              }}
            >
              Unleash your thoughts and pen them down
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "2rem", fontSize: "1rem", lineHeight: 1.6 }}
            >
              Share your thoughts even as you immerse yourself in our rich
              content that covers a wide range of topics.
            </Typography>
            {isLoggedIn ? (
              <>
                <Button
                  sx={{
                    bgcolor: "green",
                    padding: "1rem",
                    color: "#fff",
                    borderRadius: "30px",
                    "&:hover": {
                      bgcolor: "darkgreen",
                      color: "#fff",
                    },
                    // "@media (max-width: 700px)": { marginLeft: "50%" },
                  }}
                  component={Link}
                  to="/blog"
                  onClick={() => setIsLoading(true)}
                >
                  {isLoading ? <Loader /> : " Visit Blog"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{
                    bgcolor: "green",
                    padding: "1rem",
                    color: "#fff",
                    borderRadius: "30px",
                    "&:hover": {
                      bgcolor: "darkgreen",
                      color: "#fff",
                    },
                    "@media (max-width: 700px)": { marginLeft: "25%" },
                  }}
                  component={Link}
                  to="/register"
                >
                  Get started
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: "60vh",
                "@media (max-width: 800px)": { height: "35vh" },
              }}
            >
              <img
                src={backgroundImg}
                alt="backgrounds"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                className="banner-image"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Banner;

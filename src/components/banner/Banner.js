import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import backgroundImg from "../../images/rad.jpg";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './Banner.css'

const Banner = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundImage:'linear-gradient(to right, #e6f4e9 ,#fff, #fff)'}}
    >
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "2rem", alignItems: "center"}}
      >
        <Grid item xs={6}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 500, fontSize: "3rem", marginBottom: "1rem" }}
          >
            Unleash your thoughts and pen them down
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "2rem", fontSize: "1rem", lineHeight: 1.6 }}
          >
            Share your thoughts even as you immerse yourself in our rich content
            that covers a wide range of topics.
          </Typography>
          <Button
            sx={{
              bgcolor: "green",
              padding: '1rem',
              color: "#fff",
              borderRadius: "30px",
              "&:hover": {
                bgcolor: "darkgreen",
                color: "#fff",
              },
            }}
            component={Link}
            to="/register"
          >
            Get started
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ height: "60vh" }}>
            <img
              src={backgroundImg}
              alt="backgrounds"
              style={{ width: "100%", height: "100%" }}
              className="banner-image"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Banner;

import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import blogImg from "../../images/blogImg.svg";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundImage:'linear-gradient(to top, #e6f4e9 , #fff)', padding: "5rem 0rem 5rem 0rem" }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={4}>
          <Box>
            <img
              src={blogImg}
              alt="backgrounds"
              style={{ width: "100%"}}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h1"
            sx={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}
          >
            Join a community of creative geniuses
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}
          >
            Connect with curious minds, tell your story and share your knowledge
            even just the way you want it
          </Typography>
          <Button
            sx={{
              padding: "1rem",
              bgcolor: "green",
              color: "#fff",
              borderRadius: "30px",
              '&:hover' : {
                bgcolor: 'darkgreen',
                color: '#fff'
              }
            }}
            component={Link}
            to="/register"
          >
            Get started
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Join;

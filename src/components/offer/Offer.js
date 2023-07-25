import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import ForumIcon from "@mui/icons-material/Forum";


const Offer = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: "9rem" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        What we offer you
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "#f1ffe3 ",
                width: "10%",
                borderRadius: "50%",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReceiptLongOutlinedIcon
                style={{ color: "green", fontSize: "2rem" }}
              />
            </div>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Informative Content
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, color: "gray" }}>
              From expert advice to insightful articles, expand your knowledge
              and stay informed. Join our community and dive into a world of
              valuable information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "#f1ffe3 ",
                width: "10%",
                borderRadius: "50%",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ModelTrainingIcon style={{ color: "green", fontSize: "2rem" }} />
            </div>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Interactive Discussions
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, color: "gray" }}>
              Engage in lively and interactive discussions on BytesBlog. Share
              your thoughts, exchange ideas, and connect with like-minded
              individuals
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "#f1ffe3 ",
                width: "10%",
                borderRadius: "50%",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ForumIcon style={{ color: "green", fontSize: "2rem" }} />
            </div>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              Social Connectivity
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, color: "gray" }}>
              Experience a new level of social connectivity on BytesBlog.
              Connect with fellow users, build meaningful relationships, and
              expand your network
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Offer;

import * as React from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import CheckboxInput from "../checkbox/Checkbox";
import { useNavigate } from "react-router-dom";

const ActionBlog = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate('/write-blog')
  };
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Container maxWidth="lg" sx={{ marginTop: "1rem" }}>
        <Button
          sx={{ display: "flex", gap: "0.5rem", color: "#222" }}
          onClick={backHandler}
        >
          <IoArrowBackCircleOutline />
          <Typography sx={{ textTransform: "none" }}>Back</Typography>
        </Button>
      </Container>
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "#fff",
          height: "150px",
          marginTop: "3rem",
          boxShadow: "2px 2px 2px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6">Reading Duration</Typography>
        <Typography variant="body1" sx={{ color: "#8b919f" }}>
          Please state the estimated time it might take to read this post
          (minutes).
        </Typography>
        <input
          type="number"
          style={{
            width: "90%",
            marginTop: "1rem",
            height: "1rem",
            padding: "1rem 0.5rem",
            fontSize: " 1.2rem",
            outline: "none",
            border: "3px solid green",
            borderRadius: "10px",
          }}
        />
      </Container>
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "#fff",
          paddingBottom: "1rem",
          height: "fit-content",
          marginTop: "5rem",
          boxShadow: "2px 2px 2px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6">Category</Typography>
        <Typography variant="body1" sx={{ color: "#8b919f" }}>
          Select the category/categories that best describe this post.{" "}
          <span style={{ fontWeight: 600 }}>
            Maximum of 3 (cannot be changed later).
          </span>
        </Typography>
        <Typography variant="body1" sx={{ color: "#8b919f" }}>
          <span style={{ fontWeight: 600 }}>Note: </span> Only categories in
          your interests are populated here.
        </Typography>
        <CheckboxInput />
      </Container>
      <Container maxWidth="xl" sx={{ paddingTop: "4rem" }}>
        <Button
          // onClick={nextHandler}
          sx={{
            marginLeft: "52rem",
            padding: "0.5rem 3rem",
            bgcolor: "green",
            borderRadius: "25px",
            color: "#fff",
            "&:hover": {
              bgcolor: "darkgreen",
            },
          }}
        >
          Publish
        </Button>
      </Container>
    </Container>
  );
};

export default ActionBlog;

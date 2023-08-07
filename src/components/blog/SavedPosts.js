import { Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

const SavedPosts = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/profile");
  };
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ boxShadow: "0px 4px 4px 4px rgba(0,0,0,0.05)"}}
      >
        <Button
          onClick={backHandler}
          sx={{
            display: "flex",
            gap: "0.5rem",
            color: "#222",
            marginBottom: "1rem",
          }}
        >
          <BsArrowLeftCircle />
          <span>Back</span>
        </Button>
      </Container>
    </>
  );
};

export default SavedPosts;

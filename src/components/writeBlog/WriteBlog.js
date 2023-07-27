import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RichTextEditor from "../textEditor/TextEditor";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const navigate = useNavigate();
  const nextHandler = () => {
    navigate("/write-action");
  };
  return (
    <Container maxWidth="lg" sx={{ paddingTop: "10rem" }}>
      <Box sx={{ bgcolor: "#fff", height: "50vh" }}>
        <Container maxWidth="lg" sx={{ display: "flex", gap: "1rem" }}>
          <AddCircleOutlineIcon sx={{ fontSize: "2rem", color: "#b6b6b6 " }} />
          <input
            type="text"
            placeholder="Title"
            cols={100}
            style={{
              border: "none",
              outline: "none",
              fontSize: "1.5rem",
              color: "black",
            }}
          />
        </Container>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", gap: "1rem", paddingTop: "2rem" }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: "2rem", color: "#b6b6b6 " }} />
          <input
            width="100%"
            type="file"
            accept="image/*"
            id="fileInput"
            placeholder="Add Image"
            cols={100}
            rows={3}
            style={{
              display: "none",
              cursor: "pointer",
            }}
          />
          <label
            htmlFor="fileInput"
            style={{ cursor: "pointer", fontSize: "1.5rem", color: "#b6b6b6" }}
          >
            Add Image
          </label>
        </Container>
        <RichTextEditor />
      </Box>
      <Container maxWidth="xl" sx={{ paddingTop: "4rem" }}>
        <Button
          onClick={nextHandler}
          sx={{
            marginLeft: "59rem",
            padding: "0.5rem 4rem",
            bgcolor: "green",
            borderRadius: "25px",
            color: "#fff",
            "&:hover": {
              bgcolor: "darkgreen",
            },
          }}
        >
          Next
        </Button>
      </Container>
    </Container>
  );
};

export default WriteBlog;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RichTextEditor from "../textEditor/TextEditor";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SAVE_BLOG_DATA } from "../../redux/slice/blogSlice";

const WriteBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("");

  // Validate fields
  const validateFields = () => {
    let isValid = true;
    if (title.trim() === "") {
      toast.error("Title is required");
      isValid = false;
    }
    if (content.trim() === "") {
      toast.error("content field is empty");
      isValid = false;
    }
    return isValid;
  };

  // handle text editor
  const handleRichTextChange = (value) => {
    setContent(value);
  };

  // handle image

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    if (imageFile) {
      setSelectedImage(imageFile);

      reader.onloadend = () => {
        setImageURL(reader.result);
      };

      reader.readAsDataURL(imageFile);
    } else {
      setSelectedImage(null);
      setImageURL("");
    }
  };

  // next handler
  const nextHandler = () => {
    const isValid = validateFields();

    if (isValid) {
      const blogData = {
        title,
        // postedBy: 
        image: selectedImage,
        content,
      };
      dispatch(SAVE_BLOG_DATA(blogData));
      navigate("/write-action");
    }
  };
  return (
    <Container maxWidth="md" sx={{ paddingTop: "5rem" }}>
      <Box sx={{ bgcolor: "#fff", height: "50vh" }}>
        <ToastContainer />
        <Container maxWidth="lg" sx={{ display: "flex", gap: "1rem" }}>
          <AddCircleOutlineIcon sx={{ fontSize: "2rem", color: "darkgreen" }} />
          <input
            type="text"
            placeholder="Title"
            cols={100}
            style={{
              border: "none",
              outline: "none",
              fontSize: "1rem",
              color: "black",
              "&::placeholder": {
                color: "red",
              },
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Container>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", gap: "1rem", paddingTop: "2rem" }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: "2rem", color: "darkgreen " }} />
          <input
            width="100%"
            type="file"
            accept="image/*"
            id="fileInput"
            placeholder="Add Image"
            cols={100}
            rows={3}
            style={{
              cursor: "pointer",
            }}
            onChange={handleImageChange}
          />
          
        </Container>
        {imageURL && (
          <div>
            <img src={imageURL} alt="Selected" style={{ maxWidth: "200px" }} />
          </div>
        )}
        <RichTextEditor value={content} onChange={handleRichTextChange} />

        <Container maxWidth="md" sx={{ paddingTop: "4rem" }}>
          <Button
            onClick={nextHandler}
            sx={{
              marginTop: "2rem",
              marginLeft: "40rem",
              padding: "0.5rem 3rem",
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
      </Box>
    </Container>
  );
};

export default WriteBlog;

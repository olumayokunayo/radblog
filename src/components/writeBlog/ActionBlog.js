import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import CheckboxInput from "../checkbox/Checkbox";
import { useNavigate } from "react-router-dom";
import {
  SAVE_BLOG_DATA,
  selectImage,
  selectTitle,
  selectContent,
} from "../../redux/slice/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const ActionBlog = () => {
  const image = useSelector(selectImage);
  const title = useSelector(selectTitle);
  const content = useSelector(selectContent);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const allItems = [
    { id: 1, name: "Programming" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Culture" },
    { id: 4, name: "Sports" },
    { id: 5, name: "Writing" },
    { id: 6, name: "Education" },
  ];

  // get selected names from ids
  const getSelectedNames = () => {
    return selectedItems.map((itemId) => {
      const selectedItem = allItems.find((item) => item.id === itemId);
      return selectedItem ? selectedItem.name : "";
    });
  };

  //   back button
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/write-blog");
  };

  //   publish / post blog handler
  const publishHandler = () => {
    const selectedNames = getSelectedNames();
    const blogData = {
      title,
      image,
      content,
      duration,
      categories: selectedNames,
    };
    console.log(blogData);
    dispatch(SAVE_BLOG_DATA(blogData));
    // console.log(duration, selectedNames);
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
          onChange={(e) => setDuration(e.target.value)}
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
        <CheckboxInput
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </Container>
      <Button
        onClick={publishHandler}
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
        Publish
      </Button>
    </Container>
  );
};

export default ActionBlog;

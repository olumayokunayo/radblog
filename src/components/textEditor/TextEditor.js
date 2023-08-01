import { Container } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ onChange, value }) => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: "2rem" }}>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder="Write something..."
        style={{
          height: "30vh",
          width: "100%",
        }}
        theme="snow" // Choose the editor theme (snow or bubble)
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }], // Headers
            ["bold", "italic", "underline", "strike"], // Text formatting
            [{ align: [] }], // Text alignment
            ["blockquote", "code-block"], // Quote and code blocks
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            [{ script: "sub" }, { script: "super" }], // Subscript and superscript
            [{ indent: "-1" }, { indent: "+1" }], // Indentation
            [{ color: [] }, { background: [] }], // Text and background color
            ["link", "image"], // Links and images
            ["clean"], // Remove formatting
          ],
        }}
      />
    </Container>
  );
};

export default RichTextEditor;

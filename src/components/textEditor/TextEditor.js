import { Container } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = () => {
  const [text, setText] = useState("");

  // Handler function to update the text when the user edits the content
  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "2rem" }}>
      <ReactQuill 
        value={text}
        onChange={handleTextChange}
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

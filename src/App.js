import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Blog from "./components/blog/Blog";
import WriteBlog from "./components/writeBlog/WriteBlog";
import ActionBlog from "./components/writeBlog/ActionBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/write-action" element={<ActionBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

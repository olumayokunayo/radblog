import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Blog from "./components/blog/Blog";
import WriteBlog from "./components/writeBlog/WriteBlog";
import ActionBlog from "./components/writeBlog/ActionBlog";
import BlogDetails from "./components/blog/BlogDetails";
import Users from "./components/users/Users";
import Reset from "./components/auth/Reset";
import Profile from "./components/profile/Profile";
import ManageInterests from "./components/profile/ManageInterests";
import MyPosts from "./components/blog/MyPosts";
import Bookmark from "./components/blog/Bookmark";

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
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/user/:id" element={<Users />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage-interests" element={<ManageInterests />} />
          <Route path="/profile/my-posts" element={<MyPosts />} />
          <Route path="/profile/bookmarks" element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

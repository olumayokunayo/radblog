import * as React from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Search from "../search/Search";
import Interests from "../interests/Interests";

const Blog = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundImage: 'linear-gradient(to right,#e6f4e9 ,#f1fff5,#e6f4e9)', height: "30vh" }}>
      <Container maxWidth='lg' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '30vh'}}>
        <Typography variant="h2" sx={{fontWeight: '500'}}>Welcome to RadBlog</Typography>
      </Container>
      <Search />
      <Interests />
    </Container>
  );
};

export default Blog;

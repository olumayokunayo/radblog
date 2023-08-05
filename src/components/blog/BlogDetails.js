import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectBlogs } from "../../redux/slice/postSlice";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { AiOutlineLeftCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DOMPurify from "dompurify";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { FaRegComment } from "react-icons/fa";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { selectDisplayName } from "../../redux/slice/authSlice";
import Loader from "../loader/Loader";

const BlogDetail = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });
  const contentWithoutPTags = sanitizedContent
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "");

  return <div dangerouslySetInnerHTML={{ __html: contentWithoutPTags }} />;
};

const BlogDetails = () => {
  const name = useSelector(selectDisplayName);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams();
  const allBlogsData = useSelector(selectBlogs);
  const blogPost = allBlogsData.find((blog) => blog.id === id);
  console.log(blogPost);

  const backHandler = () => {
    setIsLoading(true)
    navigate("/blog");
    setIsLoading(false)
  };

  const getDaysAgo = (timestamp) => {
    const currentDate = new Date();
    const postDate = new Date(timestamp * 1000); //convert seconds to milliseconds
    const timeDiff = currentDate.getTime() - postDate.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

  const displayName = name.charAt(0).toLocaleUpperCase();
 
  return (
    <>
    {isLoading && <Loader />}
      <Container
        maxWidth="xl"
        sx={{
          height: "fit-content",
          backgroundImage: "linear-gradient(to bottom,#fff ,#e6f4e9)",
        }}
      >
        <Typography sx={{ marginLeft: "10%", marginTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <Link to="/blog" style={{ color: "#222" }}>
              Blog
            </Link>{" "}
            <span>|</span>
            <Button
              onClick={backHandler}
              sx={{
                bgcolor: "none",
                textTransform: "none",
                display: "flex",
                gap: "0.2rem",
                color: "gray",
              }}
            >
              <AiOutlineLeftCircle sx={{ bgcolor: "none" }} />
              <span>Back</span>
            </Button>
          </div>
        </Typography>
        <Container maxWidth="lg" sx={{ display: "flex" }}>
          <Box sx={{ flex: 2, borderRight: "1px solid black" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10rem",
                paddingTop: "2rem",
              }}
            >
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <Tooltip>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      sx={{ bgcolor: "#222" }}
                      alt={displayName}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <div>
                  <Typography variant="body1">{blogPost.postedBy}</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {`${getDaysAgo(blogPost.createdAt.seconds)} ${
                      getDaysAgo(blogPost.createdAt.seconds) === 0 || 1
                        ? "day"
                        : "days"
                    } ago`}
                  </Typography>
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}
              >
                <AccessTimeIcon style={{ color: "gray" }} />
                <Typography
                  variant="body1"
                  sx={{ color: "gray", fontSize: "0.8rem" }}
                >{`${blogPost.duration} mins read`}</Typography>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <FaEdit size={20} />
                <BsLinkedin size={20} />
                <BsFacebook size={20} />
                <BsLink45Deg size={20} />
              </div>
            </div>
            <Typography variant="h3" sx={{ marginTop: "3rem", marginBottom: '2rem' }}>
              {blogPost.title}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={blogPost.imageURL}
                alt="image"
                style={{ height: "300px", marginBottom: "2rem" }}
              />
            </div>
            <BlogDetail content={blogPost.content} />
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: '2rem'}}>
              <Typography variant="body">Categories:</Typography>
              <Typography
                sx={{
                  bgcolor: "lightgreen",
                  padding: "0.4rem",
                  borderRadius: "30px",
                  border: "2px solid green",
                }}
                variant="body2"
              >
                {/* {" "} */}
                {blogPost.categories.join()}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginTop: "1rem",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
              >
                <ThumbUpOffAltIcon />
                <span>0</span>
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
              >
                <FaRegComment />
                <span>0</span>
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
              >
                <BookmarkBorderIcon />
                <span>0</span>
              </span>
            </div>
          </Box>
          <Box sx={{ flex: 1, padding: "0.5rem" }}>
            <Typography>Related posts</Typography>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default BlogDetails;

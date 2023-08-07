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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const allBlogsData = useSelector(selectBlogs);
  const blogPost = allBlogsData.find((blog) => blog.id === id);
  const blogCategories = blogPost.categories;
  console.log(blogCategories);

  const relatedPosts = allBlogsData.filter((blog) =>
    blog.categories.some((category) => blogCategories.includes(category))
  );

  console.log(relatedPosts);
  const backHandler = () => {
    setIsLoading(true);
    navigate("/blog");
    setIsLoading(false);
  };

  const sliceContent = (content, limit) => {
    const words = content.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return content;
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
        maxWidth="lg"
        sx={{
          height: "fit-content",
          backgroundImage: "linear-gradient(to bottom,#fff ,#e6f4e9)",
          paddingTop: '6rem'
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            marginLeft: "3%",
          }}
        >
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
            <AiOutlineLeftCircle style={{ bgcolor: "none", color: 'black'}} />
            <span>Back</span>
          </Button>
        </div>

        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            boxShadow: "0px 2px 4px 4px rgba(0,0,0,0.1)",
            padding: "1rem",
          }}
        >
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
            <Typography
              variant="h3"
              sx={{ marginTop: "3rem", marginBottom: "2rem" }}
            >
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
                alt={blogPost.title}
                style={{ height: "300px", marginBottom: "2rem" }}
              />
            </div>
            <BlogDetail content={blogPost.content} />
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
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
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: "1rem" }}
            >
              Related Posts
            </Typography>
            <Typography>
              {relatedPosts.slice(1).map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  style={{
                    marginTop: "1rem",
                    borderBottom: "3px solid brown",
                    padding: "1rem",
                  }}
                >
                  <Link
                    to={`/blog/${relatedPost.id}`}
                    style={{ textDecoration: "none", color: "#222" }}
                  >
                    <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                      {relatedPost.title}
                    </Typography>
                    <img
                      src={relatedPost.imageURL}
                      alt=""
                      width={300}
                      height={200}
                    />
                    <BlogDetail
                      content={sliceContent(relatedPost.content, 20)}
                    ></BlogDetail>
                  </Link>
                </div>
              ))}
            </Typography>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default BlogDetails;

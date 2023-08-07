import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import Search from "../search/Search";
import Interests from "../interests/Interests";
import { SET_BLOG, selectBlogs } from "../../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Loader from "../loader/Loader";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { selectUserId } from "../../redux/slice/authSlice";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

// edit <p> tag from content
const BlogPost = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });
  const contentWithoutPTags = sanitizedContent
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "");

  return (
    <div
      style={{ color: "black" }}
      dangerouslySetInnerHTML={{ __html: contentWithoutPTags }}
    />
  );
};

const Blog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const allBlogData = useSelector(selectBlogs);
  const id = useSelector(selectUserId);
  const [filteredData, setFilteredData] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("All");
  const [selectedInterests, setSelectedInterests] = useState([]);

  const sliceContent = (content, limit) => {
    const words = content.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return content;
  };

  const getDaysAgo = (timestamp) => {
    const currentDate = new Date();
    const postDate = new Date(timestamp * 1000);
    const timeDiff = currentDate.getTime() - postDate.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = () => {
    try {
      setIsLoading(true);
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allBlogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          user: id,
        }));
        setIsLoading(false);
        dispatch(SET_BLOG(allBlogs));
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const searchHandler = () => {
    const filteredBlogs = allBlogData.filter(
      (blog) =>
        blog.title.toLocaleLowerCase().includes(searchInput) ||
        blog.content.toLocaleLowerCase().includes(searchInput)
    );
    setFilteredData(filteredBlogs);
    setIsFilterActive(filteredBlogs.length > 0);
    console.log(filteredData);
    console.log(searchInput);
  };

  const clearHandler = () => {
    setSearchInput("");
    setFilteredData(null);
    setIsFilterActive(false);
  };

  const handleInterestChange = (interest) => {
    setSelectedInterest(interest);
    console.log(selectedInterest);
    const filtered = allBlogData.filter((blog) =>
      blog.categories.includes(interest)
    );
    setSelectedInterests(filtered);
    console.log(selectedInterests);
  };
  return (
    <>
      {isLoading && <Loader />}
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "#28a76c",
          color: "#fff",
          // backgroundImage: "linear-gradient(to right,#e6f4e9 ,#f1fff5,#e6f4e9)",
          height: "30vh",
          borderRadius: "5px",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "30vh",
          }}
        >
          <Typography variant="body" sx={{ fontWeight: "500" }}>
            Welcome to RadBlog...
          </Typography>
        </Container>

        <Container maxWidth="md" sx={{ paddingTop: "3rem" }}>
          <Box sx={{ height: "fit-content", width: "100%" }}>
            <input
              type="text"
              placeholder="Search posts by title, authors, categories"
              value={searchInput}
              onChange={(e) => handleInputChange(e)}
              style={{
                padding: "0rem 1rem",
                height: "3.2rem",
                width: "80%",
                outline: "none",
                border: "0.1px solid gray",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                boxShadow: " 1px 2px 8px 8px rgba(0, 0, 0, 0.1)",
              }}
            />

            <Button
              onClick={searchHandler}
              sx={{
                bgcolor: "#222",
                height: "3.29rem",
                padding: "1.5rem 0",
                borderTopLeftRadius: "1px",
                borderBottomLeftRadius: "1px",
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
                "&:hover": {
                  bgcolor: "black",
                },
              }}
            >
              <SearchIcon />
            </Button>
            {searchInput && (
              <Button onClick={clearHandler}>
                <ClearIcon />
              </Button>
            )}
          </Box>
        </Container>

        {/* <Search onSearch={handleSearch}/> */}
        <Interests onInterestChange={handleInterestChange} />
        <Container maxWidth="lg" sx={{ padding: "2rem" }}>
          <div>
            {isFilterActive ? (
              filteredData?.length > 0 ? (
                filteredData.map((blog) => (
                  <div
                    key={blog.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      marginBottom: "20px",
                      borderBottom: "3px solid #e4e7eb",
                      padding: "1rem",
                    }}
                  >
                    {/* Left column for the image */}
                    <div style={{ flex: 3, marginLeft: "20px" }}>
                      <img
                        src={blog.imageURL}
                        alt="blog"
                        style={{ height: "300px", width: "70%" }}
                      />
                    </div>

                    {/* Right column for title, content, and other information */}
                    <div style={{ flex: 3 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <Box
                          component={Link}
                          to={`/user/${id}`}
                          sx={{
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "#222",
                          }}
                        >
                          <IconButton sx={{ p: 0 }}>
                            <Avatar
                              sx={{ bgcolor: "#222", color: "#fff" }}
                              alt={blog.postedBy.charAt(0).toLocaleUpperCase()}
                              src="/static/images/avatar/2.jpg"
                            />
                          </IconButton>
                          <span>
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "1.2rem" }}
                            >
                              {blog.postedBy}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "gray", fontSize: "0.8rem" }}
                            >
                              {`${getDaysAgo(blog.createdAt.seconds)} ${
                                getDaysAgo(blog.createdAt.seconds) <= 1
                                  ? "day"
                                  : "days"
                              } ago`}
                            </Typography>
                          </span>
                        </Box>
                      </div>
                      <Typography
                        variant="h4"
                        sx={{ marginBottom: "1rem", color: "black" }}
                      >
                        {blog.title}
                      </Typography>
                      <BlogPost content={`${sliceContent(blog.content, 20)}`} />
                      <Typography sx={{ marginTop: "1rem" }}>
                        <Link
                          to={`/blog/${blog.id}`}
                          style={{
                            textDecoration: "none",
                            color: "#008001",
                            fontWeight: 500,
                          }}
                        >
                          Read more
                        </Link>
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginTop: "1rem",
                        }}
                      >
                        <ThumbUpOffAltIcon style={{ color: "black" }} />{" "}
                        <span style={{ color: "black" }}>0 likes</span>
                      </div>
                    </div>

                    {/* column for duration */}
                    <div
                      style={{
                        display: "grid",
                        gap: "6em",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <AccessTimeIcon style={{ color: "gray" }} />
                        <Typography
                          variant="body1"
                          sx={{ color: "gray", fontSize: "0.8rem" }}
                        >{`${blog.duration} mins read`}</Typography>
                      </div>

                      <div style={{ display: "flex", alignItems: "center" }}>
                        <BookmarkBorderIcon style={{ color: "black" }} />
                        <span style={{ fontSize: "1rem", color: "black" }}>
                          0 bookmarks
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Typography>No results found</Typography>
              )
            ) : (
              <>
                {selectedInterests.length > 0
                  ? selectedInterests.map((blog) => (
                      <div
                        key={blog.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                          marginBottom: "20px",
                          borderBottom: "3px solid #e4e7eb",
                          padding: "1rem",
                        }}
                      >
                        {/* Left column for the image */}
                        <div style={{ flex: 3, marginLeft: "20px" }}>
                          <img
                            src={blog.imageURL}
                            alt="blog"
                            style={{ height: "300px", width: "70%" }}
                          />
                        </div>

                        {/* Right column for title, content, and other information */}
                        <div style={{ flex: 3 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <Box
                              component={Link}
                              to={`/user/${id}`}
                              sx={{
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#222",
                              }}
                            >
                              <IconButton sx={{ p: 0 }}>
                                <Avatar
                                  sx={{ bgcolor: "#222", color: "#fff" }}
                                  alt={blog.postedBy
                                    .charAt(0)
                                    .toLocaleUpperCase()}
                                  src="/static/images/avatar/2.jpg"
                                />
                              </IconButton>
                              <span>
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "1.2rem" }}
                                >
                                  {blog.postedBy}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "gray", fontSize: "0.8rem" }}
                                >
                                  {`${getDaysAgo(blog.createdAt.seconds)} ${
                                    getDaysAgo(blog.createdAt.seconds) <= 1
                                      ? "day"
                                      : "days"
                                  } ago`}
                                </Typography>
                              </span>
                            </Box>
                          </div>
                          <Typography
                            variant="h4"
                            sx={{ marginBottom: "1rem", color: "black" }}
                          >
                            {blog.title}
                          </Typography>
                          <BlogPost
                            content={`${sliceContent(blog.content, 20)}`}
                          />
                          <Typography sx={{ marginTop: "1rem" }}>
                            <Link
                              to={`/blog/${blog.id}`}
                              style={{
                                textDecoration: "none",
                                color: "#008001",
                                fontWeight: 500,
                              }}
                            >
                              Read more
                            </Link>
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginTop: "1rem",
                            }}
                          >
                            <ThumbUpOffAltIcon style={{ color: "black" }} />{" "}
                            <span style={{ color: "black" }}>0 likes</span>
                          </div>
                        </div>

                        {/* column for duration */}
                        <div
                          style={{
                            display: "grid",
                            gap: "6em",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <AccessTimeIcon style={{ color: "gray" }} />
                            <Typography
                              variant="body1"
                              sx={{ color: "gray", fontSize: "0.8rem" }}
                            >{`${blog.duration} mins read`}</Typography>
                          </div>

                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BookmarkBorderIcon style={{ color: "black" }} />
                            <span style={{ fontSize: "1rem", color: "black" }}>
                              0 bookmarks
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                    
                  : allBlogData.map((blog) => (
                      <div
                        key={blog.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                          marginBottom: "20px",
                          borderBottom: "3px solid #e4e7eb",
                          padding: "1rem",
                        }}
                      >
                        {/* Left column for the image */}
                        <div style={{ flex: 3, marginLeft: "20px" }}>
                          <img
                            src={blog.imageURL}
                            alt="blog"
                            style={{ height: "300px", width: "70%" }}
                          />
                        </div>

                        {/* Right column for title, content, and other information */}
                        <div style={{ flex: 3 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <Box
                              component={Link}
                              to={`/user/${id}`}
                              sx={{
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                color: "#222",
                              }}
                            >
                              <IconButton sx={{ p: 0 }}>
                                <Avatar
                                  sx={{ bgcolor: "#222", color: "#fff" }}
                                  alt={blog.postedBy
                                    .charAt(0)
                                    .toLocaleUpperCase()}
                                  src="/static/images/avatar/2.jpg"
                                />
                              </IconButton>
                              <span>
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "1.2rem" }}
                                >
                                  {blog.postedBy}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "gray", fontSize: "0.8rem" }}
                                >
                                  {`${getDaysAgo(blog.createdAt.seconds)} ${
                                    getDaysAgo(blog.createdAt.seconds) <= 1
                                      ? "day"
                                      : "days"
                                  } ago`}
                                </Typography>
                              </span>
                            </Box>
                          </div>
                          <Typography
                            variant="h4"
                            sx={{ marginBottom: "1rem", color: "black" }}
                          >
                            {blog.title}
                          </Typography>
                          <BlogPost
                            content={`${sliceContent(blog.content, 20)}`}
                          />
                          <Typography sx={{ marginTop: "1rem" }}>
                            <Link
                              to={`/blog/${blog.id}`}
                              style={{
                                textDecoration: "none",
                                color: "#008001",
                                fontWeight: 500,
                              }}
                            >
                              Read more
                            </Link>
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginTop: "1rem",
                            }}
                          >
                            <ThumbUpOffAltIcon style={{ color: "black" }} />{" "}
                            <span style={{ color: "black" }}>0 likes</span>
                          </div>
                        </div>

                        {/* column for duration */}
                        <div
                          style={{
                            display: "grid",
                            gap: "6em",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <AccessTimeIcon style={{ color: "gray" }} />
                            <Typography
                              variant="body1"
                              sx={{ color: "gray", fontSize: "0.8rem" }}
                            >{`${blog.duration} mins read`}</Typography>
                          </div>

                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BookmarkBorderIcon style={{ color: "black" }} />
                            <span style={{ fontSize: "1rem", color: "black" }}>
                              0 bookmarks
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Blog;

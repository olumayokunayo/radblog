import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import Interests from "../interests/Interests";
import { SET_BLOG, selectBlogs } from "../../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Loader from "../loader/Loader";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { selectUserId } from "../../redux/slice/authSlice";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  addBookmarkedPost,
  addLikedPost,
  removedBookmarkedPost,
} from "../functions/Functions";

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
      style={{ color: "black", marginBottom: "2rem" }}
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
  console.log(id);
  const [filteredData, setFilteredData] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("All");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});

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

  const handleLike = (postId) => {
    const updatedLikes = {
      ...likedPosts,
      [postId]: !likedPosts[postId],
    };

    localStorage.setItem("likedBlogs", JSON.stringify(updatedLikes));
    if (updatedLikes[postId]) {
      addLikedPost(id, postId);
    }
    setLikedPosts(updatedLikes);
  };

  const handleBookmark = (postId) => {
    const updatedBookmarked = {
      ...bookmarkedPosts,
      [postId]: !bookmarkedPosts[postId],
    };
    localStorage.setItem("bookmarkedBlogs", JSON.stringify(updatedBookmarked));
    setBookmarkedPosts(updatedBookmarked);
    if (updatedBookmarked[postId]) {
      addBookmarkedPost(id, postId);
    } else {
      removedBookmarkedPost(id, postId);
    }
  };

  useEffect(() => {
    const likedPosts = localStorage.getItem("likedBlogs");
    if (likedPosts) {
      setLikedPosts(JSON.parse(likedPosts));
    }

    const bookmarkedPosts = localStorage.getItem("bookmarkedBlogs");
    if (bookmarkedPosts) {
      setBookmarkedPosts(JSON.parse(bookmarkedPosts));
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Container maxWidth="xl" sx={{ marginTop: "6rem" }}>
        <Container maxWidth="md" sx={{}}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              height: "fit-content",
              width: "100%",
              "@media (maxWidth: 768px)": {
                flexDirection: "column",
                alignItems: "flex-start",
              },
            }}
          >
            <input
              type="text"
              placeholder="Search posts by title, authors, categories"
              value={searchInput}
              onChange={(e) => handleInputChange(e)}
              style={{
                padding: "0.2rem",
                height: "3.2rem",
                marginRight: "2rem",
                width: "80%",
                outline: "none",
                border: "0.1px solid gray",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
                boxShadow: "1px 2px 8px 8px rgba(0, 0, 0, 0.1)",
                "@media (maxWidth: 768px)": {
                  marginBottom: "1rem",
                  borderRadius: "15px",
                },
              }}
            />

            <Button
              onClick={searchHandler}
              sx={{
                bgcolor: "#222",
                height: "3.29rem",
                padding: "1.5rem 0",
                borderRadius: "15px",
                "&:hover": {
                  bgcolor: "black",
                },
                "@media (max-width: 768px)": {
                  width: "18%",
                  position: "absolute",
                  right: "5%",
                  padding: "1.8rem",
                },
              }}
            >
              <SearchIcon />
            </Button>
            {searchInput && window.innerWidth > 768 && (
              <Button onClick={clearHandler}>
                <ClearIcon />
              </Button>
            )}
          </Box>
        </Container>

        <Interests onInterestChange={handleInterestChange} />

        <Container maxWidth="md">
          {isFilterActive ? (
            filteredData?.length > 0 ? (
              filteredData.map((blog) => (
                <div key={blog.id}>
                  <Container
                    sx={{
                      paddingTop: "2rem",
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
                        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                          {blog.postedBy}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "gray", fontSize: "0.6rem" }}
                        >
                          {`${getDaysAgo(blog.createdAt.seconds)} ${
                            getDaysAgo(blog.createdAt.seconds) <= 1
                              ? "day"
                              : "days"
                          } ago`}
                        </Typography>
                      </span>
                    </Box>
                  </Container>
                  <Container
                    sx={{
                      display: "flex",
                      gap: "4rem",
                      "@media (max-width: 700px)": { display: "block" },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        "@media (max-width: 700px)": { width: "100%" },
                      }}
                    >
                      <img
                        src={blog.imageURL}
                        alt="blog"
                        style={{
                          height: "300px",
                          width: "100%",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        "@media (max-width: 700px)": { width: "100%" },
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        <AccessTimeIcon style={{ color: "gray" }} />
                        <Typography
                          variant="body1"
                          sx={{ color: "gray", fontSize: "0.8rem" }}
                        >{`${blog.duration} mins read`}</Typography>
                      </div>
                      <Typography
                        variant="h4"
                        sx={{ color: "#222", marginBottom: "1rem" }}
                      >{`${blog.title}`}</Typography>
                      <BlogPost content={`${sliceContent(blog.content, 15)}`} />
                      <Box>
                        <Typography
                          sx={{
                            color: "#222",
                            width: "fit-content",
                            bgcolor: "lightgreen",
                            padding: "0.4rem",
                            borderRadius: "30px",
                            border: "1px solid green",
                            marginBottom: "2rem",
                          }}
                          variant="body2"
                        >
                          {blog.categories.join(" / ")}
                        </Typography>

                        <div
                          style={{
                            marginBottom: "1rem",
                          }}
                        >
                          {likedPosts[blog.id] ? (
                            <FavoriteIcon color="red" />
                          ) : (
                            <FavoriteBorderIcon />
                          )}{" "}
                          {bookmarkedPosts[blog.id] ? (
                            <BookmarkIcon
                              onClick={() => handleBookmark(blog.id)}
                              style={{ color: "black" }}
                            />
                          ) : (
                            <BookmarkBorderIcon
                              onClick={() => handleBookmark(blog.id)}
                              style={{
                                color: "black",
                              }}
                            />
                          )}
                        </div>
                      </Box>
                    </Box>
                  </Container>
                </div>
              ))
            ) : (
              <Typography>No results found</Typography>
            )
          ) : (
            <>
              {selectedInterests.length > 0
                ? selectedInterests.map((blog) => (
                    <div key={blog.id}>
                      <Container
                        sx={{
                          paddingTop: "2rem",
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
                              sx={{ fontSize: "1rem" }}
                            >
                              {blog.postedBy}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "gray", fontSize: "0.6rem" }}
                            >
                              {`${getDaysAgo(blog.createdAt.seconds)} ${
                                getDaysAgo(blog.createdAt.seconds) <= 1
                                  ? "day"
                                  : "days"
                              } ago`}
                            </Typography>
                          </span>
                        </Box>
                      </Container>
                      <Container
                        sx={{
                          display: "flex",
                          gap: "4rem",
                          "@media (max-width: 700px)": { display: "block" },
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            "@media (max-width: 700px)": { width: "100%" },
                          }}
                        >
                          <img
                            src={blog.imageURL}
                            alt="blog"
                            style={{
                              height: "300px",
                              width: "100%",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            "@media (max-width: 700px)": { width: "100%" },
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              alignItems: "center",
                              marginBottom: "1rem",
                            }}
                          >
                            <AccessTimeIcon style={{ color: "gray" }} />
                            <Typography
                              variant="body1"
                              sx={{ color: "gray", fontSize: "0.8rem" }}
                            >{`${blog.duration} mins read`}</Typography>
                          </div>
                          <Typography
                            variant="h4"
                            sx={{ color: "#222", marginBottom: "1rem" }}
                          >{`${blog.title}`}</Typography>
                          <BlogPost
                            content={`${sliceContent(blog.content, 15)}`}
                          />
                          <Box>
                            <Typography
                              sx={{
                                color: "#222",
                                width: "fit-content",
                                bgcolor: "lightgreen",
                                padding: "0.4rem",
                                borderRadius: "30px",
                                border: "1px solid green",
                                marginBottom: "2rem",
                              }}
                              variant="body2"
                            >
                              {blog.categories.join(" / ")}
                            </Typography>

                            <div
                              style={{
                                marginBottom: "1rem",
                              }}
                            >
                              {likedPosts[blog.id] ? (
                                <FavoriteIcon color="red" />
                              ) : (
                                <FavoriteBorderIcon />
                              )}{" "}
                              {bookmarkedPosts[blog.id] ? (
                                <BookmarkIcon
                                  onClick={() => handleBookmark(blog.id)}
                                  style={{ color: "black" }}
                                />
                              ) : (
                                <BookmarkBorderIcon
                                  onClick={() => handleBookmark(blog.id)}
                                  style={{
                                    color: "black",
                                  }}
                                />
                              )}
                            </div>
                          </Box>
                        </Box>
                      </Container>
                    </div>
                  ))
                : allBlogData.map((blog) => (
                    <div
                      key={blog.id}
                      style={{
                        boxShadow: "0px 4px 4px 4px rgba(0,0,0,0.1)",
                        marginTop: "1rem",
                      }}
                    >
                      <Container
                        sx={{
                          paddingTop: "2rem",
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
                              sx={{ fontSize: "1rem" }}
                            >
                              {blog.postedBy}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "gray", fontSize: "0.6rem" }}
                            >
                              {`${getDaysAgo(blog.createdAt.seconds)} ${
                                getDaysAgo(blog.createdAt.seconds) <= 1
                                  ? "day"
                                  : "days"
                              } ago`}
                            </Typography>
                          </span>
                        </Box>
                      </Container>
                      <Container
                        sx={{
                          display: "flex",
                          gap: "4rem",
                          "@media (max-width: 700px)": { display: "block" },
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            "@media (max-width: 700px)": { width: "100%" },
                          }}
                        >
                          <img
                            src={blog.imageURL}
                            alt="blog"
                            style={{
                              height: "300px",
                              width: "100%",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            "@media (max-width: 700px)": { width: "100%" },
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              alignItems: "center",
                              marginBottom: "1rem",
                            }}
                          >
                            <AccessTimeIcon style={{ color: "gray" }} />
                            <Typography
                              variant="body1"
                              sx={{ color: "gray", fontSize: "0.8rem" }}
                            >{`${blog.duration} mins read`}</Typography>
                          </div>
                          <Typography
                            variant="h4"
                            sx={{ color: "#222", marginBottom: "1rem" }}
                          >{`${blog.title}`}</Typography>
                          <BlogPost
                            content={`${sliceContent(blog.content, 15)}`}
                          />
                          <Box>
                            <Typography
                              sx={{
                                marginTop: "1rem",
                                marginBottom: "1rem",
                                "@media (max-width: 768px)": {
                                  fontSize: "0.9rem",
                                },
                              }}
                            >
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
                            <Typography
                              sx={{
                                color: "#222",
                                width: "fit-content",
                                bgcolor: "lightgreen",
                                padding: "0.2rem",
                                borderRadius: "30px",
                                border: "1px solid green",
                                marginBottom: "2rem",
                                "@media (max-width: 768px)": {
                                  marginBottom: "1rem",
                                },
                              }}
                              variant="body2"
                            >
                              {blog.categories.join(" / ")}
                            </Typography>

                            <div
                              style={{
                                marginBottom: "1rem",
                              }}
                            >
                              {likedPosts[blog.id] ? (
                                <FavoriteIcon
                                  onClick={() => handleLike(blog.id)}
                                  style={{ color: "red" }}
                                />
                              ) : (
                                <FavoriteBorderIcon
                                  onClick={() => handleLike(blog.id)}
                                  style={{ color: "black" }}
                                />
                              )}{" "}
                              {bookmarkedPosts[blog.id] ? (
                                <BookmarkIcon
                                  onClick={() => handleBookmark(blog.id)}
                                  style={{ color: "black" }}
                                />
                              ) : (
                                <BookmarkBorderIcon
                                  onClick={() => handleBookmark(blog.id)}
                                  style={{
                                    color: "black",
                                  }}
                                />
                              )}
                            </div>
                          </Box>
                        </Box>
                      </Container>
                    </div>
                  ))}
            </>
          )}
        </Container>
      </Container>
    </>
  );
};

export default Blog;

import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { getBookmarkedPosts, getLikedPosts } from "../functions/Functions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectUserId } from "../../redux/slice/authSlice";
import DOMPurify from "dompurify";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Loader from "../loader/Loader";

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

const Bookmark = () => {
  const [likedData, setLikedData] = useState([]);
  const [bookmarkedData, setBookmarkedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector(selectUserId);
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/profile");
  };

  const getDaysAgo = (timestamp) => {
    const currentDate = new Date();
    const postDate = new Date(timestamp * 1000);
    const timeDiff = currentDate.getTime() - postDate.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

  const sliceContent = (content, limit) => {
    const words = content.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return content;
  };

  useEffect(() => {
    const fetchLikedPosts = async () => {
      setIsLoading(true);
      const likedPosts = await getLikedPosts(id);
      const likedPostsData = [];

      for (const postId of likedPosts) {
        const postsRef = doc(db, "blogs", postId);
        const postsDoc = await getDoc(postsRef);

        if (postsDoc.exists()) {
          likedPostsData.push({ id: postsDoc.id, ...postsDoc.data() });
        }
      }
      setIsLoading(false);
      setLikedData([...likedPostsData]);
    };

    const fetchBookmarkedPosts = async () => {
      setIsLoading(true);
      const bookmarkedPosts = await getBookmarkedPosts(id);
      const bookmarkedPostsData = [];

      for (const postId of bookmarkedPosts) {
        const postsRef = doc(db, "blogs", postId);
        const postsDoc = await getDoc(postsRef);

        if (postsDoc.exists()) {
          bookmarkedPostsData.push({ id: postsDoc.id, ...postsDoc.data() });
        }
      }
      setIsLoading(false);
      setBookmarkedData([...bookmarkedPostsData]);
    };
    fetchLikedPosts();
    fetchBookmarkedPosts();
  }, [id]);
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          // bgcolor: "lightblue",
          height: "fit-content",
          padding: "1rem",
          boxShadow: "0px 4px 4px 4px rgba(0,0,0,0.05)",
          marginTop: "6rem",
        }}
      >
        <Button
          onClick={backHandler}
          sx={{
            display: "flex",
            gap: "0.5rem",
            color: "#222",
            marginBottom: "1rem",
          }}
        >
          <BsArrowLeftCircle />
          <span>Back</span>
        </Button>

        <Container>
          <Typography
            variant="h6"
            sx={{
              color: "#222",
              textAlign: "center",
              borderBottom: "1px solid black",
              width: "30%",
              margin: "auto",
            }}
          >
            Bookmarks
          </Typography>
          {isLoading && <Loader />}
          {bookmarkedData && (
            <>
              {bookmarkedData.map((data) => (
                <div key={data.id}>
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
                          alt={data.postedBy.charAt(0).toLocaleUpperCase()}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                      <span>
                        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                          {data.postedBy}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "gray", fontSize: "0.6rem" }}
                        >
                          {`${getDaysAgo(data.createdAt.seconds)} ${
                            getDaysAgo(data.createdAt.seconds) <= 1
                              ? "day"
                              : "days"
                          } ago`}
                        </Typography>
                      </span>
                    </Box>
                  </Container>
                  <Container
                    component={Link}
                    to={`/blog/${data.id}`}
                    sx={{
                      textDecoration: 'none',
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
                        src={data.imageURL}
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
                        >{`${data.duration} mins read`}</Typography>
                      </div>
                      <Typography
                        variant="h4"
                        sx={{ color: "#222", marginBottom: "1rem" }}
                      >{`${data.title}`}</Typography>
                      <BlogPost content={`${sliceContent(data.content, 15)}`} />
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
                          {data.categories.join(" / ")}
                        </Typography>
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

export default Bookmark;

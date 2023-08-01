import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Avatar, IconButton, Typography } from "@mui/material";
import Search from "../search/Search";
import Interests from "../interests/Interests";
import { SET_BLOG, selectBlogs } from "../../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectFirstName, selectLastName } from "../../redux/slice/authSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Loader from "../loader/Loader";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const BlogPost = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });
  const contentWithoutPTags = sanitizedContent
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "");

  return <div dangerouslySetInnerHTML={{ __html: contentWithoutPTags }} />;
};

const Blog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const allBlogData = useSelector(selectBlogs);
  const firstname = useSelector(selectFirstName);
  const lastname = useSelector(selectLastName);
  const [postedByUser, setPostedByUser] = useState({});

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const allBlogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIsLoading(false);
        dispatch(SET_BLOG(allBlogs));

        // Get user information for each blog and store it in state
        const fetchUsers = async () => {
          const usersPromises = allBlogs.map(async (blog) => {
            if (blog.user) {
              const userRef = doc(db, "users", blog.user);
              const userSnapshot = await getDoc(userRef);
              if (userSnapshot.exists()) {
                return { id: blog.user, ...userSnapshot.data() };
              } else {
                return null;
              }
            } else {
              return null;
            }
          });
          const usersData = await Promise.all(usersPromises);
          const usersMap = usersData.reduce((map, user) => {
            if (user) {
              map[user.id] = user;
            }
            return map;
          }, {});
          setPostedByUser(usersMap);
        };

        fetchUsers();
      });

      // Clean up the snapshot listener when the component unmounts
      return () => unsubscribe();
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container
        maxWidth="xl"
        sx={{
          backgroundImage: "linear-gradient(to right,#e6f4e9 ,#f1fff5,#e6f4e9)",
          height: "30vh",
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
          <Typography variant="h2" sx={{ fontWeight: "500" }}>
            Welcome to RadBlog
          </Typography>
        </Container>
        <Search />
        <Interests />
        <Container maxWidth="lg" sx={{ padding: "2rem" }}>
          <div>
            {allBlogData.map((blog) => (
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
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        sx={{ bgcolor: "#222", color: "white" }}
                        alt={postedByUser[blog.user]?.firstName || ""}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                    <div>
                      {postedByUser[blog.user] && (
                        <div>
                          <Typography variant="h6">
                            Posted by: {postedByUser[blog.user].firstName}{" "}
                            {postedByUser[blog.user].lastName}
                          </Typography>
                          <Typography variant="body2">
                            Email: {postedByUser[blog.user].email}
                          </Typography>
                        </div>
                      )}
                    </div>
                    <Typography variant="body1" sx={{ color: "gray" }}>
                      - 4 days ago
                    </Typography>
                  </div>
                  <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                    {blog.title}
                  </Typography>
                  <BlogPost content={blog.content} />
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
                    <ThumbUpOffAltIcon /> <span>0 likes</span>
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
                    <BookmarkBorderIcon />
                    <span style={{ fontSize: "1rem" }}>0 bookmarks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Blog;

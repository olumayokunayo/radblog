import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectDisplayName } from "../../redux/slice/authSlice";
import { Button, Container, Typography } from "@mui/material";
import Loader from "../loader/Loader";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DOMPurify from "dompurify";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BlogDetail = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });
  const contentWithoutPTags = sanitizedContent
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "");

  return <div dangerouslySetInnerHTML={{ __html: contentWithoutPTags }} />;
};

const MyPosts = () => {
  const navigate = useNavigate();
  const userdisplayName = useSelector(selectDisplayName);
  const [isLoading, setIsLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);

  const fetchBlogs = () => {
    try {
      setIsLoading(true);
      console.log("fetching blogs...");
      const usersRef = collection(db, "blogs");
      const q = query(usersRef);
      onSnapshot(q, (snapshot) => {
        const allBlogsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const userBlogs = allBlogsData.filter(
          (blog) => blog.postedBy === userdisplayName
        );

        setAllBlogs(userBlogs);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const backHandler = () => {
    navigate("/profile");
  };
  return (
    <>
      <Container maxWidth="sm">
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
        {isLoading ? (
          <Loader />
        ) : allBlogs.length === 0 ? (
          <p>No Blogs posted</p>
        ) : (
          <>
            {allBlogs.map((blogPost) => (
              <div key={blogPost.id}>
                <div
                  style={{
                    display: "flex",
                    gap: "0.3rem",
                    alignItems: "center",
                    marginTop: '4rem'
                  }}
                >
                  <AccessTimeIcon style={{ color: "gray" }} />
                  <Typography
                    variant="body1"
                    sx={{ color: "gray", fontSize: "0.8rem" }}
                  >{`${blogPost.duration} mins read`}</Typography>
                </div>

                <Typography
                  variant="h5"
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
                    alt="image"
                    style={{ height: "200px", marginBottom: "2rem" }}
                  />
                </div>
                <BlogDetail content={blogPost.content}></BlogDetail>
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
                    {blogPost.categories.join(" , ")}
                  </Typography>
                </div>
              </div>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default MyPosts;

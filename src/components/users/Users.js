import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { Box, Button, Container, Typography } from "@mui/material";
import Loader from "../loader/Loader";
import { selectDisplayName } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const BlogDetail = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });
  const contentWithoutPTags = sanitizedContent
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "");

  return <div dangerouslySetInnerHTML={{ __html: contentWithoutPTags }} />;
};

const Users = () => {
  const navigate = useNavigate();
  const userdisplayName = useSelector(selectDisplayName);
  const { id } = useParams();
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchUserData(id);
    fetchBlogData(id);
  }, []);

  const fetchUserData = (id) => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("id", "==", id)); // Modify this line
      onSnapshot(q, (snapshot) => {
        const userDoc = snapshot.docs[0]; // Get the first document from the query result
        if (userDoc) {
          const userData = userDoc.data();
          setUser(userData);
        }
        console.log(user);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const fetchBlogData = (id) => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, "blogs");
      const q = query(usersRef);
      onSnapshot(q, (snapshot) => {
        const allBlogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allBlogs);

        const userBlogs = allBlogs.find(
          (blog) => blog.postedBy === userdisplayName
        );
        setBlog(userBlogs);

        // const userProfile = allBlogs.find((blog) => blog.id === id);
        // // setUser(userProfile);
        // console.log(userProfile);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const backHandler = () => {
    navigate("/blog");
  };
  return (
    <>
      {isLoading && <Loader />}

      <Container maxWidth="md">
        <Box
          sx={{
            // boxShadow: "2px 4px 4px 2px rgba(0,0,0,0.05)",
            height: "fit-contnent",
            marginTop: '5rem',
            // paddingTop: '5rem',
            padding: "5rem 2rem 2rem 2rem",
          }}
        >
          <Button
            sx={{ display: "flex", gap: "0.5rem", color: "#222" }}
            onClick={backHandler}
          >
            <IoArrowBackCircleOutline />
            <Typography sx={{ textTransform: "none" }}>Back</Typography>
          </Button>
          {/* <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "green" }}
          >
            User Profile
          </Typography> */}
          <Box
            sx={{
              boxShadow: "0px 2px 4px 4px rgba(0,0,0,0.05)",
              padding: "1rem",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
              First name:{" "}
              <span style={{ color: "gray" }}>{user && user.firstname}</span>
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
              Last name:{" "}
              <span style={{ color: "gray" }}>{user && user.lastname}</span>
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
              Interests:{" "}
            </Typography>
            <Typography sx={{ marginBottom: "1rem", color: "gray" }}>
              {user && user.interests.join(", ")}
            </Typography>
            <Typography variant="body">
              Date joined:{" "}
              <span style={{ color: "gray" }}>
                {user && formatDate(user.time)}
              </span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              Blogs
            </Typography>
            <div>
              <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                {blog && blog.title}
              </Typography>
              {/* <img
              src={blog.imageURL}
              alt={blog.title}
              width={500}
              style={{ marginBottom: "1rem" }}
            /> */}
              <BlogDetail content={blog && blog.content}></BlogDetail>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Users;

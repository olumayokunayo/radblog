import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayName, selectEmail } from "../../redux/slice/authSlice";
import { Link, NavLink, Routes, Route } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import EditIcon from "@mui/icons-material/Edit";
import "./Profile.css";
import MyPosts from "../blog/MyPosts";
import SavedPosts from "../blog/SavedPosts";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";

const Profile = () => {
  const email = useSelector(selectEmail);
  const isActiveLink = ({ isActive }) => (isActive ? "active" : "");
  const userdisplayName = useSelector(selectDisplayName);
  const [isLoading, setIsLoading] = useState(" ");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, "users");
      const q = query(usersRef);
      onSnapshot(q, (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          //   user: doc.data().postedBy,
        }));

        const userData = allUsers.find((user) => user.email === email);
        setData(userData);
        console.log(data);
        // console.log(allUsers);
        setIsLoading(false);
        //   dispatch(SET_BLOG(allBlogs));
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Typography
          variant="h5"
          sx={{
            borderBottom: "1px solid #e4e7eb",
            width: "fit-content",
            fontWeight: 600,
          }}
        >
          My Profile
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "2rem",
            gap: "0.5rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              padding: "0.4rem 0.8rem",
              borderRadius: "10px",
              bgcolor: "#222",
              width: "fit-content",
              color: "#fff",
            }}
          >
            {userdisplayName}
          </Typography>
          <Typography>
            <Link style={{ color: "green", fontSize: "1rem" }}>
              edit profile
            </Link>
          </Typography>
        </Box>
        <Typography sx={{ marginTop: "1rem" }}>{email}</Typography>
        <div style={{ display: "flex", marginTop: "2rem" }}>
          <TodayIcon style={{ color: "orangered" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography>Date Joined:</Typography>
            <span>{formatDate(data.time)}</span>
            {/* <Typography>at</Typography>
            <span>2.30pm</span> */}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "2rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid #e4e7eb",
          }}
        >
          <TodayIcon style={{ color: "orangered" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography>Last Updated:</Typography>
            <span>Jan 3rd, 1899</span>
            <Typography>at</Typography>
            <span>2.30pm</span>
          </div>
        </div>
        <div
          style={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid #e4e7eb",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, marginBottom: "1rem" }}
          >
            About
          </Typography>
          <Typography variant="body" sx={{ color: "gray", marginTop: "4rem" }}>
            Your bio will appear here
          </Typography>
        </div>
        <div
          style={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid #e4e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: "1rem" }}
            >
              Interests
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EditIcon style={{ fontSize: "1rem" }} />
              <Typography variant="body" sx={{ color: "gray" }}>
                Manage
              </Typography>
            </div>
          </div>
          <Typography variant="body" sx={{ color: "gray", marginTop: "4rem" }}>
            Your Interests will appear here
          </Typography>
        </div>
        <div
          style={{
            paddingTop: "2rem",
            paddingBottom: "2rem",
            // borderBottom: "1px solid #e4e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              borderBottom: "2px solid #e4e7eb",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, marginBottom: "1rem" }}
            >
              <NavLink
                className={isActiveLink}
                style={{ textDecoration: "none", color: "gray" }}
                to="/profile/my-posts"
              >
                My Posts
              </NavLink>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, marginBottom: "1rem" }}
            >
              <NavLink
                className={isActiveLink}
                style={{ textDecoration: "none", color: "gray" }}
                to="/profile/saved-posts"
              >
                Saved Posts
              </NavLink>
            </Typography>
          </div>
          <Routes>
            <Route path="/profile/my-posts" element={<MyPosts />} />
            <Route path="/profile/saved-posts" element={<SavedPosts />} />
          </Routes>
        </div>
      </Container>
    </>
  );
};

export default Profile;

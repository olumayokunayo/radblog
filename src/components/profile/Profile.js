import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectDisplayName,
  selectEmail,
  selectUser,
} from "../../redux/slice/authSlice";
import { Link, NavLink } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import EditIcon from "@mui/icons-material/Edit";
import "./Profile.css";
import MyPosts from "../blog/MyPosts";
import SavedPosts from "../blog/SavedPosts";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../loader/Loader";
const Profile = () => {
  const email = useSelector(selectEmail);
  const isActiveLink = ({ isActive }) => (isActive ? "active" : "");
  const userdisplayName = useSelector(selectDisplayName);
  const id = useSelector(selectUser);
  console.log(id);
  const [isLoading, setIsLoading] = useState(" ");
  const [data, setData] = useState(null);
  const [users, setUsers] = useState({});
  const [allBlogs, setAllBlogs] = useState(null);
  const [bio, setBio] = useState({
    text: "",
  });
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [displayBio, setDisplayBio] = useState(null);

  const fetchUserData = () => {
    try {
      setIsLoading(true);
      console.log("fetching...");
      const usersRef = collection(db, "users");
      const q = query(usersRef);
      onSnapshot(q, (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allUsers);
        console.log(data);
        setIsLoading(false);

        // Find the user data inside the onSnapshot callback
        const userData = allUsers.find((user) => user.email === email);
        console.log("userData:", userData);
        setUsers(userData);
        console.log(users);


        const userDat = allUsers.find((user) => user.id === id);
        console.log(userDat);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  const fetchBlogs = () => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, "blogs");
      const q = query(usersRef);
      onSnapshot(q, (snapshot) => {
        const allBlogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllBlogs(allBlogs);
        setIsLoading(false);

        // Find the user data inside the onSnapshot callback

        const userBlog = allBlogs.find(
          (blog) => blog.postedBy === userdisplayName
        );
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBlogs();
  }, []);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBio({ ...bio, [name]: value });
    console.log(bio);
  };

  const bioHandler = () => {
    setIsBioEditing(true);
  };

  const saveHandler = async () => {
    try {
      
      const usersRef = doc(db, "users", id);
            const docSnap = await getDoc(usersRef);

     if(docSnap.exists()){
      console.log(true);
     } else {
      console.log(false);
     }
      // const docSnap = await getDoc(usersRef);
      // console.log(docSnap);

      // if (docSnap.exists()) {
      //   // Document exists, proceed with updating
      //   await updateDoc(usersRef, { bio: bio.text });
      //   setDisplayBio(bio.text);
      //   setIsBioEditing(false);
      // } else {
      //   console.error("Document not found.");
      // }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
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

          <Typography>
            <Link style={{ color: "green", fontSize: "1rem" }}>
              edit profile
            </Link>
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "1.4rem",
              // padding: "0.4rem 0.8rem",
              borderRadius: "10px",
              // bgcolor: "#222",
              width: "fit-content",
              color: "#222",
            }}
          >
            {userdisplayName}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ marginTop: "1rem" }}>
          Email Address: <span style={{ color: "gray" }}>{email}</span>
        </Typography>
        <div style={{ display: "flex", marginTop: "2rem" }}>
          <TodayIcon style={{ color: "orangered" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography>Date Joined:</Typography>
              {users && users.time ? (
                <span>{formatDate(users.time)}</span>
              ) : (
                <span>No data available</span>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e4e7eb",
          }}
        ></div>

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
              About
            </Typography>
            {isBioEditing ? (
              <>
                <Button
                  onClick={() => setIsBioEditing(false)}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={saveHandler}
                >
                  Save
                </Button>
              </>
            ) : (
              <EditIcon
                style={{ fontSize: "1rem", cursor: "pointer" }}
                onClick={bioHandler}
              />
            )}
          </div>
          <div></div>

          {isBioEditing ? (
            <textarea
              disabled={!isBioEditing}
              name="text"
              value={bio.text}
              onChange={(e) => handleInputChange(e)}
              cols={60}
              rows="fit-content"
              style={{
                border: "0.1px solid gray",
                outline: "none",
                // borderRadius: "10px",
                color: "#222",
              }}
            />
          ) : (
            <div>{displayBio}</div>
          )}
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
              <span>Interests</span>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {users && users.interests ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                    }}
                  >
                    {users.interests.map((interest) => (
                      <Button
                        key={interest}
                        variant="body2"
                        sx={{ padding: "0.2rem", border: "1px solid green" }}
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                ) : (
                  "Your Interests will appear here"
                )}
              </div>
            </Typography>
          </div>
          {/* <Typography variant="body" sx={{ color: "gray", marginTop: "4rem" }}>
            Your Interests will appear here
          </Typography> */}
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
        </div>
      </Container>
    </>
  );
};

export default Profile;

import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { db } from "../../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  selectEmail,
  selectFirstName,
  selectLastName,
  selectUser,
} from "../../redux/slice/authSlice";
const ManageInterests = () => {
  const firstname = useSelector(selectFirstName);
  const lastname = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const user = useSelector(selectUser);

  console.log(firstname, lastname, email, user);
  const navigate = useNavigate();
  const Interests = [
    "Technology",
    "Programming",
    "Writing",
    "Religion",
    "Business",
    "Education",
    "Data science",
    "Culture",
    "Finance",
    "Science",
    "UI/UX",
    "Lifestyle",
    "Sports",
    "Arts",
    "Music",
    "Food",
    "Books",
    "Marketing",
    "Entrepreneurship",
    "Startup",
    "Product Management",
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);

  //   useEffect(() => {
  //     async function fetchInterests() {
  //       const userDoc = await getDoc(doc(db, "users", userId));
  //       if (userDoc.exists()) {
  //         const userData = userDoc.data();
  //         setSelectedInterests(userData.interests || []);
  //         console.log(`fetching ${userData}`);
  //       }
  //     }
  //     fetchInterests();
  //   }, []);

  const handleInterestToggle = (interest) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((item) => item !== interest);
      } else {
        return [...prevInterests, interest];
      }
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      console.log("Saving user data with selected interests...");

      const signUpTime = Timestamp.now().toDate();

      const userData = {
        firstname,
        lastname,
        email,
        user,
        interests: selectedInterests,
        time: signUpTime,
        id: user
      };
      const usersRef = await addDoc(collection(db, "users"), userData);
      console.log(firstname, lastname, email);
      console.log("User data with interests saved to Firebase.");
      navigate(`/`);
    } catch (error) {
      console.error("Error saving user data with interests:", error);
    }
  };

  const backHandler = () => {
    navigate("/register");
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{ height: "85vh", boxShadow: "2px 4px 4px 8px rgba(0,0,0,0.02)" }}
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
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, textAlign: "center", fontSize: "2rem" }}
        >
          Manage Your Interests
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: 500,
            marginBottom: "1rem",
          }}
        >
          This would determine the blog posts you would see
        </Typography>
        <div>
          {Interests.map((interest) => (
            <Button
              key={interest}
              variant={
                selectedInterests.includes(interest) ? "contained" : "outlined"
              }
              sx={{ margin: "1rem", borderRadius: "10px" }}
              onClick={() => handleInterestToggle(interest)}
            >
              {interest}
            </Button>
          ))}
        </div>
        <Button
          onClick={formHandler}
          sx={{
            textAlign: "center",
            bgcolor: "#008000e0;",
            width: "100%",
            color: "#fff",
            "&:hover": {
              bgcolor: "#008000",
            },
          }}
        >
          Save Changes
        </Button>
      </Container>
    </>
  );
};

export default ManageInterests;

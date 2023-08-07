import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectFirstName,
  selectLastName,
  selectUserId,
  signup,
} from "../../redux/slice/authSlice";
import { ToastContainer, toast } from "react-toastify";

const ManageInterests = () => {
  const dispatch = useDispatch();
  const firstname = useSelector(selectFirstName);
  const lastname = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const user = useSelector(selectUserId);

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
      const signUpTime = Timestamp.now().toDate();

      const userData = {
        firstname,
        lastname,
        email,
        user,
        interests: selectedInterests,
        time: signUpTime,
        id: user,
      };
      dispatch(
        signup({
          firstname,
          lastname,
          email,
          user,
          interests: selectedInterests,
          time: signUpTime,
          id: user,
        })
      );
      const usersRef = await addDoc(collection(db, "users"), userData);
      navigate(`/login`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const backHandler = () => {
    navigate("/register");
  };

  return (
    <>
      {<ToastContainer />}
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

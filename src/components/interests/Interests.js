import { Box, Button, Container } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { selectUserId } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";

const interests = [
  "All",
  "Technology",
  "Programming",
  "Writing",
  "Religion",
  "Business",
  "Education",
  "Data science",
  "Finance",
  "Culture",
  "Science",
  "Health",
  "UI/UX",
  " Lifestyle",
  "Sports",
  "Arts",
  "Food",
  "Books",
  "Housing",
  "Startup",
  "Marketing",
];

const Interests = ({ onInterestChange }) => {
  const id = useSelector(selectUserId);
  const [selectedInterest, setSelectedInterest] = useState("All");

  useEffect(() => {
    onInterestChange(selectedInterest);
  }, [selectedInterest]);

  const handleInterestChange = (int) => {
    setSelectedInterest(int);
    onInterestChange(int);
  };
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          borderRadius: '10px',
          marginTop: "1.5rem",
          bgcolor: "#fff",
          overflowX: "scroll",
          width: "100%",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          borderBottom: "4px solid #e4e7eb",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            whiteSpace: "nowrap",
            padding: "1rem 2rem",
            borderRadius: '20px',
            "@media (max-width: 768px)": {
              padding: "0.5rem 0.1rem",
              marginRight: "2rem",
            },
          }}
        >
          {interests.map((int) => {
            return (
              <Button
                onClick={() => onInterestChange(int)}
                variant={selectedInterest === int ? "contained" : "outlined"}
                sx={{
                  padding: "0rem 3rem",
                  textTransform: "none",
                  fontSize: "0.9rem",
                  "@media (max-width: 768px)": { padding: "0rem 3rem" },
                  "&.css-e00z8e-MuiButtonBase-root-MuiButton-root": {
                    backgroundColor: "red",
                  },
                }}
                key={int}
              >
                {int}
              </Button>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default Interests;

import { Box, Button, Container } from "@mui/material";
import React from "react";

const interest = [
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

const Interests = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: '1.5rem',
          bgcolor: "#fff",
          overflowX: "scroll",
          width: "100%",
          "&::-webkit-scrollbar": {
            display: "none",
          },
         borderBottom: '4px solid #e4e7eb'
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            whiteSpace: "nowrap",
            padding: "1rem 2rem",
          }}
        >
          {interest.map((int) => {
            return (
              <Button
                sx={{
                  textTransform: "none",
                  fontSize: "0.9rem",
                  color: int === "All" ? "green" : "gray",
                  '&.css-e00z8e-MuiButtonBase-root-MuiButton-root' : {
                    backgroundColor: 'red'
                  }
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

import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Search = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: "3rem" }}>
      <Box sx={{ height: "fit-content", width: "100%" }}>
        <input
          type="search"
          placeholder="Search posts by title, authors, categories"
          style={{
            padding: '0rem 1rem',
            height: "3.2rem",
            width: "92%",
            outline: "none",
            border: "0.1px solid gray",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            boxShadow: " 1px 2px 8px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Button
          sx={{
            bgcolor: "#222",
            height: "3.29rem",
            padding: "1.5rem 0",
            borderTopLeftRadius: "1px",
            borderBottomLeftRadius: "1px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            '&:hover' : {
                bgcolor: 'black'
            }
          }}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Container>
  );
};

export default Search;

// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import { Button } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const Search = () => {
//   const [searchInput, setSearchInput] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSearchInput(value)
//   };

//   const searchHandler = () => {
//   };
//   return (
//     <Container maxWidth="md" sx={{ paddingTop: "3rem" }}>
//       <Box sx={{ height: "fit-content", width: "100%" }}>
//         <input
//           type="search"
//           placeholder="Search posts by title, authors, categories"
//           value={searchInput}
//           onChange={(e) => handleInputChange(e)}
//           style={{
//             padding: "0rem 1rem",
//             height: "3.2rem",
//             width: "80%",
//             outline: "none",
//             border: "0.1px solid gray",
//             borderTopLeftRadius: "15px",
//             borderBottomLeftRadius: "15px",
//             boxShadow: " 1px 2px 8px 8px rgba(0, 0, 0, 0.1)",
//           }}
//         />

//         <Button
//           onClick={searchHandler}
//           sx={{
//             bgcolor: "#222",
//             height: "3.29rem",
//             padding: "1.5rem 0",
//             borderTopLeftRadius: "1px",
//             borderBottomLeftRadius: "1px",
//             borderTopRightRadius: "15px",
//             borderBottomRightRadius: "15px",
//             "&:hover": {
//               bgcolor: "black",
//             },
//           }}
//         >
//           <SearchIcon />
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Search;

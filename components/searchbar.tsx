import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import Container from "@mui/material/Container";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: pink[50],

  // marginLeft: 0,
  //   width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchBar() {
  return (
    <AppBar
      position="static"
      style={{
        background: "transparent",
        color: "black ",
        boxShadow: "none",
      }}
    >
      <Container>
        <Toolbar>
          <Search sx={{ flexGrow: 10 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder=""
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ flexGrow: 1 }}

            // sx={{ mr: 2 }}
          >
            <MenuIcon style={{ fontSize: 50 }} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

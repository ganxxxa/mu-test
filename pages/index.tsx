import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Container,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import theme from "../styles/theme/theme";
import ProductCard from "../components/Product/productCard";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { Product } from "../store/productContext";
// import { ProductsList } from "../components/products-list";
// import { Card } from "../components/card";

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

const UseItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
}));

interface HomeProps {
  Products: Product[];
}

const Home: NextPage<HomeProps> = ({ Products }) => {
  const [filteredPosts, setFilteredPosts] = useState<Product[]>(Products);
  const [postTitles, setPostTitles] = useState<string[]>(
    Products.map((post: Product) => post.title.toLowerCase())
  );
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const filteredPostsTitles: string[] = [...postTitles].filter(
      (title: string) => title.indexOf(searchString.trim().toLowerCase()) !== -1
    );

    const refilteredPosts: Product[] = [...Products].filter((post: Product) =>
      filteredPostsTitles.includes(post.title.toLowerCase())
    );

    setFilteredPosts(refilteredPosts);
  }, [searchString, postTitles, Products]);

  return (
    <ThemeProvider theme={theme}>
      <Typography align="center" variant="h1" color="primary">
        Filter by Search
      </Typography>

      <Box className={styles.container}>
        <Head>
          <title>M U T </title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Toolbar>
            <Search sx={{ flexGrow: 10 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder=""
                inputProps={{ "aria-label": "search" }}
                value={searchString}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchString(e.target.value)
                }
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
        <Container maxWidth="md"></Container>
      </Box>

      <Grid container spacing={12} justifyContent="center">
        {filteredPosts.map((data: Product, index: number) => {
          return (
            <Grid item xs={5}>
              <UseItem
                sx={{ my: 2 }}
                style={{
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <ProductCard key={index} item={data} />
              </UseItem>
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const Products = await axios.get<Product[]>(
    "https://fakestoreapi.com/products?limit=6"
  );
  return {
    props: {
      Products: Products.data,
    },
  };
};

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await axios.get<ProductType[]>(
//     "https://fakestoreapi.com/products"
//   );
//   return {
//     props: {
//       data: data.data,
//     },
//   };
// };

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Grid,
  Typography,
  TextField,
  Chip,
  Stack,
  Paper,
  Box,
  Button,
} from "@mui/material";
import theme from "../styles/theme/theme";
import ProductCard from "../components/Product/productCard";
import { Product } from "../store/productContext";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Product: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const tags = [
    "all",
    "electronics",
    "women's clothing",
    "jewelery",
    "men's clothing",
  ];

  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  useEffect(() => {
    setProductList(data);
  }, []);

  function getFilteredList() {
    if (!selectedCategory) {
      return productList;
    }
    return productList.filter((item) => item.category === selectedCategory);
  }
  var filteredList = useMemo(getFilteredList, [selectedCategory, productList]);

  function handleCategoryChange(event: any) {
    setSelectedCategory(event.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography align="center" variant="h1" color="primary">
        Filter by Category
      </Typography>

      <Box
        onClick={handleCategoryChange}
        sx={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
          boxShadow: 0,
        }}
      >
        <Button value="" variant="contained">
          All
        </Button>
        <Button value="electronics" variant="contained">
          electronics
        </Button>
        <Button value="women's clothing" variant="contained">
          women's clothing
        </Button>
        <Button value="men's clothing" variant="contained">
          men's clothing
        </Button>
        <Button value="jewelery" variant="contained">
          jewelery
        </Button>
      </Box>

      <Grid container spacing={12} justifyContent="center">
        {filteredList.map((data: Product, index: number) => {
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
      {/* <Grid container spacing={12} justifyContent="center">
        {filteredPosts.map((data: Product, index: number) => {
          if (!isAllTag && data.tags.some((tag: Tag) => tags.includes(tag))) {
            return (
              <Grid key={data.id} item xs={5}>
                <UseItem
                  sx={{ my: 2 }}
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <ProductCard item={data} />
                </UseItem>
              </Grid>
            );
          } else if (isAllTag) {
            return (
              <Grid key={data.id} item xs={5}>
                <UseItem
                  sx={{ my: 2 }}
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <ProductCard item={data} />
                </UseItem>
              </Grid>
            );
          }
        })}
        <Grid key={data.id} item xs={5}>
          <UseItem
            sx={{ my: 2 }}
            style={{
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <ProductCard item={data} />
          </UseItem>
        </Grid>
      </Grid> */}
    </ThemeProvider>
  );
};
export default Product;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: { data },
  };
};

const UseItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
}));

// export const getStaticProps: GetStaticProps = async () => {
//   const data = await axios.get<Product[]>(
//     "https://fakestoreapi.com/products"
//   );
//   return {
//     props: {
//       data: data.data,
//     },
//   };
// };

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Grid, Typography, TextField, Chip, Stack, Paper } from "@mui/material";
import theme from "../styles/theme/theme";
import ProductCard from "../components/Product/productCard";
import { ProductType } from "../components/Product/product-context";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { Tag, tagFilters } from "../src/tag";
import SearchIcon from "@mui/icons-material/Search";
import { Post } from "../src/Post.interface";

const Product: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filteredPosts, setFilteredPosts] = useState<ProductType[]>(data);
  const [postTitles, setPostTitles] = useState<string[]>(
    data.map((post: ProductType) => post.title.toLowerCase())
  );
  const [searchString, setSearchString] = useState("");
  const [isAllTag, setIsAllTag] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const filteredPostsTitles: string[] = [...postTitles].filter(
      (title: string) => title.indexOf(searchString.trim().toLowerCase()) !== -1
    );

    const refilteredPosts: ProductType[] = [...data].filter(
      (post: ProductType) =>
        filteredPostsTitles.includes(post.title.toLowerCase())
    );

    setFilteredPosts(refilteredPosts);
  }, [searchString, postTitles, data]);

  useEffect(() => {
    if (tags.length > 0) {
      setIsAllTag(false);
    } else {
      setIsAllTag(true);
    }
  }, [tags]);

  return (
    <ThemeProvider theme={theme}>
      <Typography align="center" variant="h1" color="primary">
        Products
      </Typography>
      <Paper
        component="form"
        sx={{ width: 400, margin: "20px auto", boxShadow: 0 }}
      >
        <TextField
          style={{ width: 400 }}
          placeholder="Search..."
          value={searchString}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchString(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <SearchIcon style={{ fontSize: 30, marginRight: 8 }} />
            ),
            style: { fontSize: 20 },
          }}
        />
      </Paper>
      <Paper
        sx={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
          boxShadow: 0,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Chip
            onClick={() => {
              setTags([]);
              setIsAllTag(true);
            }}
            label="All"
            variant="outlined"
            color={isAllTag ? "secondary" : "default"}
          />
          {tagFilters.map((tag: Tag, index: number) => (
            <Chip
              onClick={() => {
                if (!tags.includes(tag)) {
                  setTags([...tags, tag]);
                } else {
                  const selectedTags = [...tags].filter(
                    (selectedTag: Tag) => selectedTag !== tag
                  );
                  setTags(selectedTags);
                }
              }}
              key={index}
              label={tag}
              variant="outlined"
              color={tags.includes(tag) ? "secondary" : "default"}
            />
          ))}
        </Stack>
      </Paper>
      <div style={{ display: "flex" }}>
        {filteredPosts.map((post: ProductType, index: number) => {
          if (!isAllTag && post.tags.some((tag: Tag) => tags.includes(tag))) {
            return <ProductCard key={index} item={post} />;
          } else if (isAllTag) {
            return <ProductCard key={index} item={post} />;
          }
        })}
      </div>
      {/* <Grid container spacing={12} justifyContent="center">
        {filteredPosts.map((data: ProductType, index: number) => {
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
//   const data = await axios.get<ProductType[]>(
//     "https://fakestoreapi.com/products"
//   );
//   return {
//     props: {
//       data: data.data,
//     },
//   };
// };

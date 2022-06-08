import type { GetServerSideProps } from "next";
import { Container, Grid } from "@mui/material";

import ProductCard from "../components/Product/productCard";
import { ProductType } from "../components/Product/product-context";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const UseItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
}));

interface yow {
  data: ProductType[];
}
export default function Product({ data }: yow) {
  return (
    <Grid container spacing={12} justifyContent="center">
      {data.map((e) => (
        <Grid key={e.id} item xs={5}>
          <UseItem
            sx={{ my: 2 }}
            style={{
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <ProductCard data={e} />
          </UseItem>
        </Grid>
      ))}
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: { data },
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

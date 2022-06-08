import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActions, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box, { BoxProps } from "@mui/material/Box";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        fontSize: "0.875rem",
        ...sx,
      }}
      {...other}
    />
  );
}

const ProductCard = ({ data }: any) => {
  return (
    <Card
      sx={{ my: 3, height: 550 }}
      style={{
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <CardMedia
        component="img"
        image={data.image}
        alt={data.title}
        sx={{ width: "100%", height: 400, borderRadius: "46px" }}
      />
      <CardContent sx={{ display: "flex" }}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Item>{data.title}</Item>
          <Item pl={23}>${data.price} </Item>
        </Typography>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

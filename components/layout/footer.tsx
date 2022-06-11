import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Container } from "@mui/material";
import { useAppSelector } from "../../src/hooks";
import styles from "../../styles/Home.module.css";

const Footer = () => {
  // const { amount } = useAppSelector((store) => store.cart);
  return (
    <>
      <Container
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          backgroundColor: "#fcb2bc",
        }}
      >
        <Box className={styles.navCenter}>
          <h3>Shoppingg cart</h3>
          <Box className={styles.navContainer} mx="5">
            <ShoppingCartIcon color="action" />
            <div className={styles.amountContainer}>
              <p className={styles.totalAmount}>amount</p>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Footer;

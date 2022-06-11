import Navbar from "./navbar";
import React, { FC, HTMLProps, useEffect } from "react";
import Footer from "./footer";
// import CartContainer from "../cartContainer";
import { useDispatch } from "react-redux";
// import { calculateTotals, getCartItems } from "../../src/cart/cartSlice";
import { useAppSelector } from "../../src/hooks";

interface Props extends HTMLProps<HTMLAllCollection> {}

const layout: FC<Props> = ({ children }) => {
  // const { cartItems, isLoading } = useAppSelector((store) => store.cart);
  // const { isOpen } = useAppSelector((store) => store.modal);

  // if (isLoading) {
  //   return (
  //     <div className="loading">
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }
  return (
    <div>
      <Navbar />
      {/* <CartContainer /> */}
      {children}
      <Footer />
    </div>
  );
};

export default layout;

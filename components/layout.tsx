import Navbar from "./navbar";
import React, { FC, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLAllCollection> {}

const layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;

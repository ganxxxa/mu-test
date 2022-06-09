import { createContext } from "react";
import { Tag } from "../../src/tag";

export interface ProductType {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  tags: Tag[];
}

export interface ProductList {
  ProductType: ProductType[];
  tags: Tag[];
}

const ProductContext = createContext<ProductList | null>(null);

export default ProductContext;

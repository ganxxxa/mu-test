import { createContext } from "react";

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
}

export type ProductList = {
  products: ProductType[];
  categories: string[];
};

const ProductContext = createContext<ProductList | null>(null);

export default ProductContext;

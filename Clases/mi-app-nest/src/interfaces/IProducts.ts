import { Category } from "src/entities/product.entity";

export type IProduct = {
  id: number;
  nameProduct: string;
  description: string;
  price: number;
  category: Category;
  imageUrl?: string;
  isAvailable: boolean;
};

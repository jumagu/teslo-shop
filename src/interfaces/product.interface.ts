export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // todo: type: Type;
  gender: Gender;
}

export interface CartProduct {
  id: string;
  size: Size;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
export type Gender = "men" | "women" | "kids" | "unisex";
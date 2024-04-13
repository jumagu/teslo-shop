"use client";

import { useState } from "react";

import Link from "next/link";

import { Product } from "@/interfaces";
import { ProductImage } from "@/components/product/image/ProductImage";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayedImage, setDisplayedImage] = useState(product.images[0]);

  const onlyOneImage = product.images.length === 1;

  const onMouseEnter = () => {
    if (onlyOneImage) return;

    setDisplayedImage(product.images[1]);
  };

  const onMouseLeave = () => {
    if (onlyOneImage) return;

    setDisplayedImage(product.images[0]);
  };

  return (
    <div className="fade-in w-[47%] sm:w-[30%] my-[25px]">
      <div className="mb-1 relative">
        {product.inStock === 0 && (
          <div className="out-of-stock-label">Out Of Stock</div>
        )}

        <Link href={`/product/${product.slug}`}>
          <ProductImage
            className="w-full object-cover"
            src={displayedImage}
            width={2000}
            height={2000}
            alt={product.title}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </Link>
      </div>

      <div className="flex flex-col">
        <Link
          className="font-medium text-[12px] sm:text-[13px] leading-[24px] tracking-[1.8px] no-underline hover:opacity-70 w-fit"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <p className="font-medium text-[12px] sm:text-[13px] leading-[24px] tracking-[1.8px] w-fit">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

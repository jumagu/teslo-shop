"use client";

import { useState } from "react";

import { useCartStore } from "@/store";
import type { CartProduct, Product, Size } from "@/interfaces";
import { ButtonPrimary, QuantitySelector, SizeSelector } from "@/components";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { id, slug, title, price, sizes, images } = product;

  const addToCart = () => {
    setIsFormSubmitted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id,
      size,
      slug,
      title,
      price,
      quantity,
      image: images[0],
    };

    addProductToCart(cartProduct);

    setQuantity(1);
    setSize(undefined);
    setIsFormSubmitted(false);
  };

  return (
    <>
      <div className="pb-1">
        {/* size selector */}
        <SizeSelector
          selectedSize={size}
          availableSizes={sizes}
          onSizeSelected={setSize}
        />

        {/* quantity selector */}
        <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      </div>

      {isFormSubmitted && !size && (
        <p className="text-red-500 text-[13px] font-medium leading-[24px] tracking-[1.8px] my-[5px] pb-3">
          Please select a size
        </p>
      )}

      {/* add cart button */}
      <ButtonPrimary type="button" text="Add to Cart" onClick={addToCart} />
    </>
  );
};

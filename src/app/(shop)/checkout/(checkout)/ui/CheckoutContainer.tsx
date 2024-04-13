"use client";

import { useEffect, useState } from "react";

import { useAddressStore, useCartStore } from "@/store";

import { Loader } from "@/components";

import { PlaceOrder } from "./PlaceOrder";
import { ProductsToOrder } from "./ProductsToOrder";

export const CheckoutContainer = () => {
  const address = useAddressStore((state) => state.address);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded)
    return (
      <Loader className="h-[calc(100vh-241px)] min-[600px]:h-[calc(100vh-209px)]" />
    );

  return (
    <>
      {totalItemsInCart < 1 || !address.firstName ? (
        <p className="font-normal mt-6 mx:mt-10 text-[12px] leading-[24px] tracking-[1.8px]">
          Please complete the previous steps to complete the order
        </p>
      ) : (
        <>
          <div className="font-normal text-gray-600 text-[12px] leading-[44px] tracking-[1.8px] xm:hidden">
            Order Summary ({totalItemsInCart}{" "}
            {totalItemsInCart === 1 ? "Item" : "Items"})
          </div>

          <div className="grid grid-cols-1 xm:grid-cols-2 gap-8 xm:gap-6">
            <ProductsToOrder />

            <PlaceOrder />
          </div>
        </>
      )}
    </>
  );
};

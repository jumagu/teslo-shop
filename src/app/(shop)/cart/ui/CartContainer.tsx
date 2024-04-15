"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/store";

import { EmptyCart } from "./EmptyCart";
import { FilledCart } from "./FilledCart";

export const CartContainer = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <></>;

  return <>{totalItemsInCart < 1 ? <EmptyCart /> : <FilledCart />}</>;
};

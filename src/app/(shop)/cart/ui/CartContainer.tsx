"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/store";

import { Loader } from "@/components";

import { EmptyCart } from "./EmptyCart";
import { FilledCart } from "./FilledCart";

export const CartContainer = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded)
    return (
      <Loader className="h-[calc(100vh-208px)] min-[600px]:h-[calc(100vh-167px)]" />
    );

  return <>{totalItemsInCart < 1 ? <EmptyCart /> : <FilledCart />}</>;
};

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];

  // Item Methods
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
  clearCart: () => void;

  // Summary Methods
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    totalDue: number;
    totalItems: number;
  };
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // * Item Methods
      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );

        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      // * Summary Methods
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        const tax = subTotal * 0.07;

        const totalDue = subTotal + tax;

        const totalItems = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          totalDue,
          totalItems,
        };
      },
    }),
    { name: "shopping-cart" }
  )
);

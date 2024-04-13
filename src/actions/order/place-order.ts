"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsToOrder: ProductToOrder[],
  address: Address
) => {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId)
    return {
      ok: false,
      msg: "No user session.",
    };

  // ? Get products info
  const products = await prisma.product.findMany({
    where: { id: { in: productsToOrder.map((p) => p.productId) } },
  });

  if (products.length < 1)
    return {
      ok: false,
      msg: "No products to order.",
    };

  // ? Calculate totals
  // ?? Items
  const itemsInOrder = productsToOrder.reduce(
    (count, product) => count + product.quantity,
    0
  );

  // ?? subTotal, tax & totalDue
  const { subTotal, tax, totalDue } = productsToOrder.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product)
        throw new Error(`Product with id "${item.productId}" doesn't exist.`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.07;
      totals.totalDue += subTotal * 1.07;

      return totals;
    },
    { subTotal: 0, tax: 0, totalDue: 0 }
  );

  // * Transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // * 1. Update product stock
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productsToOrder
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0)
          throw new Error(
            `Product ${product.id} has no valid quantity defined.`
          );

        return tx.product.update({
          where: { id: product.id },
          data: { inStock: { decrement: productQuantity } },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // * Verify that the product's stock didn't go below zero.
      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(`${product.title} is out of stock.`);
      });

      // * 2. Create order details
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          totalDue,
          OrderItem: {
            createMany: {
              data: productsToOrder.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // * Verify that the product's price didn't go below zero.

      // * 3. Create order address
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order,
        orderAddress,
        updatedProducts,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
    };
  } catch (error: any) {
    return {
      ok: false,
      msg: error?.message,
    };
  }
};

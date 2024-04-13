"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { PayPalOrderStatusResponse } from "@/interfaces";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken)
    return {
      ok: false,
      msg: "Authentication token could not be obtained.",
    };

  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!resp)
    return {
      ok: false,
      msg: "An error occurred while verifying the order.",
    };

  const { status, purchase_units } = resp;

  // ? Invoice IDD => OrderID
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED")
    return {
      ok: false,
      msg: "Uncompleted payment process.",
    };

  // ? Update order in database
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date() },
    });

    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      msg: "Payment could not be completed.",
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(PAYPAL_OAUTH_URL, {
      ...requestOptions,
      cache: "no-store",
    }).then((resp) => resp.json());

    return result.access_token;
  } catch (error) {
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  authToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const PAYPAL_ORDERS_URL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const result = await fetch(PAYPAL_ORDERS_URL, {
      ...requestOptions,
      cache: "no-store",
    }).then((resp) => resp.json());

    return result;
  } catch (error) {
    return null;
  }
};

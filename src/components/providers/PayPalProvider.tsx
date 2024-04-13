"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface Props {
  children: React.ReactNode;
}

export const PayPalProvider = ({ children }: Props) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        intent: "capture",
        currency: "USD",
        locale: "en_US",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
};

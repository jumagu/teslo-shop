import type { Metadata } from "next";

import "./globals.css";

import { inter } from "@/config/fonts.config";
import { AuthProvider, PayPalProvider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s | Teslo",
    default: "Teslo Shop | Teslo",
  },
  description:
    "Find the latest fashion and accessories at Teslo Shop. Explore our collections for men, women, and kids. Shop now and enjoy fast shipping and easy returns!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PayPalProvider>
          <AuthProvider>{children}</AuthProvider>
        </PayPalProvider>
      </body>
    </html>
  );
}

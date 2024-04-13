import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });

export const teslaFont = localFont({
  src: "../../public/assets/TESLA.ttf",
  display: "swap",
});
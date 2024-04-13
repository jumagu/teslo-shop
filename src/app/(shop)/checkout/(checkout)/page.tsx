import Link from "next/link";

import { MdArrowBackIosNew } from "react-icons/md";

import { Title } from "@/components";
import { CheckoutContainer } from "./ui/CheckoutContainer";

export const metadata = {
  title: "Checkout",
  description:
    "Complete your purchase securely and conveniently at Teslo Shop. Fast shipping and easy returns. Shop now and enjoy hassle-free shopping experience.",
};

export default function CheckoutPage() {
  return (
    <div className="w-full mb-12 min-[600px]:mb-16">
      <div className="w-full sm:max-w-[600px] xm:max-w-[1200px] mx-auto px-6 min-[600px]:px-9 mlg:px-12">
        <Link
          className="flex items-center gap-1 cursor-auto pt-[6px] mb-[18px]"
          href="/checkout/address"
        >
          <MdArrowBackIosNew size={15} />
          <span className="font-normal text-[11px] leading-[26px] tracking-[1.5px] cursor-pointer">
            Back
          </span>
        </Link>

        <div className="font-normal text-gray-600 text-[12px] leading-[24px] tracking-[1.8px]">
          step 2 of 2
        </div>

        <Title
          title="Review And Pay"
          className="pb-2 text-[24px] xm:text-[28px] leading-[30px] xm:leading-[34px] tracking-[1.2px] xm:tracking-[1.4px]"
        />

        <CheckoutContainer />
      </div>
    </div>
  );
}

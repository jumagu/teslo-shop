import { Title } from "@/components";
import { CartContainer } from "./ui/CartContainer";

export const metadata = {
  title: "Your Cart",
  description:
    "Review the items in your shopping cart at Teslo Shop. Add or remove items as needed before proceeding to checkout. Fast shipping and easy returns.",
};

export default function CartPage() {
  return (
    <div className="w-full mb-12 min-[600px]:mb-16">
      <div className="w-full sm:max-w-[600px] xm:max-w-[1200px] mx-auto px-6 min-[600px]:px-9 mlg:px-12">
        <Title
          title="Cart"
          className="pt-8 pb-6 xm:pb-2 text-[18px] xm:text-[28px] leading-[22px] xm:leading-[34px] tracking-[0.9px] xm:tracking-[1.4px] border-b-[1px] border-b-[solid] border-b-gray-600 border-opacity-40 xm:border-none"
        />

        <CartContainer />
      </div>
    </div>
  );
}

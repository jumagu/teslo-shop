import { useCartStore } from "@/store";
import { currencyFormatter } from "@/utils";
import { ButtonLinkPrimary } from "@/components";

export const OrderSummary = () => {
  const { subTotal } = useCartStore((state) => state.getSummaryInformation());

  return (
    <div className="pt-8 xm:bg-gray-100 xm:bg-opacity-55 xm:p-8 w-full xm:max-w-[432px] h-fit ml-auto border-t-2 border-black">
      <h2 className="font-medium text-[17px] leading-[22px] tracking-[0.8px] pb-2">
        Order Summary
      </h2>

      <div className="flex justify-between font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case">
        <span>Shipping</span>
        <span className="text-right">Free</span>
      </div>

      <div className="flex justify-between font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case">
        <span>Sales Tax</span>
        <span className="text-right">Calculated at checkout</span>
      </div>

      <div className="flex justify-between pb-4">
        <span className="py-2 text-[17px] font-medium leading-[22px] tracking-[0.8px] ">
          Subtotal
        </span>
        <span className="py-2 text-[17px] font-medium leading-[22px] tracking-[0.8px] text-right">
          {currencyFormatter(subTotal)}
        </span>
      </div>

      <div className="mobile-checkout-btn-container">
        <ButtonLinkPrimary text="Checkout" href="/checkout/address" />
      </div>
    </div>
  );
};

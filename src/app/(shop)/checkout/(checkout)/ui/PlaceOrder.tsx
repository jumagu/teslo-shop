import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { placeOrder } from "@/actions";
import { currencyFormatter } from "@/utils";
import { useAddressStore, useCartStore } from "@/store";
import { ButtonPrimary, ErrorMessage } from "@/components";

export const PlaceOrder = () => {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { totalItems, subTotal, tax, totalDue } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const address = useAddressStore((state) => state.address);

  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    setErrorMessage("");

    const { rememberAddress, ...orderAddress } = address;

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, orderAddress);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.msg);
      return;
    }

    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  return (
    <div className="pt-8 xm:bg-gray-100 xm:bg-opacity-55 xm:p-8 w-full xm:max-w-[432px] h-fit ml-auto border-t-2 border-black">
      <h2 className="hidden xm:block font-medium text-[17px] leading-[22px] tracking-[0.8px] pb-2">
        Order summary ({totalItems} {totalItems === 1 ? "Item" : "Items"})
      </h2>

      {errorMessage && <ErrorMessage message={errorMessage} className="items-center xm:items-start mb-6 xm:mb-0 xm:mt-4" />}

      <div className="flex flex-col mb-6 xm:mt-6">
        <div className="flex justify-between mb-[5px]">
          <p className="font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case">
            Shipping Address
          </p>
          <Link
            className="font-normal underline text-right text-[15px] leading-[20px] tracking-normal normal-case"
            href="/checkout/address"
          >
            Edit
          </Link>
        </div>

        <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
          {address.firstName} {address.lastName}
        </span>
        <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
          {address.address}
        </span>
        <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
          {address.addressLineTwo}
        </span>
        <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
          {address.city} {address.zipCode}
        </span>
        <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
          {address.country}
        </span>
        <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
          {address.mobilePhoneNumber}
        </span>
      </div>

      <div className="flex justify-between font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case pb-1">
        <span>Subtotal</span>
        <span className="text-right">{currencyFormatter(subTotal)}</span>
      </div>

      <div className="flex justify-between font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case pb-1">
        <span>Shipping</span>
        <span className="text-right">Free</span>
      </div>

      <div className="flex justify-between font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case pb-1">
        <span>Sales Tax</span>
        <span className="text-right">{currencyFormatter(tax)}</span>
      </div>

      <div className="flex justify-between pb-4">
        <span className="font-medium text-[17px] leading-[22px] tracking-[0.8px]">
          Total Due
        </span>
        <span className="font-medium text-[17px] leading-[22px] tracking-[0.8px] text-right">
          {currencyFormatter(totalDue)}
        </span>
      </div>

      <div className="py-6">
        <p className="font-normal text-[15px] leading-[20px] tracking-[1.65px] xm:tracking-[1.8px] normal-case text-gray-600">
          By continuing, I understand and agree to the{" "}
          <span className="underline cursor-pointer hover:text-black transition-all duration-500">
            General Terms and Conditions of Online Accessories Sales
          </span>
          ,{" "}
          <span className="underline cursor-pointer hover:text-black transition-all duration-500">
            Terms of Use
          </span>
          , and{" "}
          <span className="underline cursor-pointer hover:text-black transition-all duration-500">
            Privacy Notice
          </span>
          .
        </p>
      </div>

      <div className="mobile-checkout-btn-container">
        <ButtonPrimary
          type="button"
          text="Place Order"
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
        />
      </div>
    </div>
  );
};

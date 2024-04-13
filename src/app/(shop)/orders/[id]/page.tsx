import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getOrderById } from "@/actions";
import { currencyFormatter } from "@/utils";
import {
  Title,
  ProductImage,
  PayPalButton,
  OrderPaymentStatus,
} from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export function generateMetadata({ params: { id } }: Props): Metadata {
  const orderId = id.split("-").at(-1);

  return {
    title: `Order Details - #${orderId?.toUpperCase()}`,
    description: `View detailed information about your order #${orderId?.toUpperCase()} on Teslo Shop. Check the status, shipping details, and items included in your order.`,
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) redirect("/");

  const orderId = id.split("-").at(-1);

  const address = order!.OrderAddress;

  return (
    <div className="w-full pb-36 min-[600px]:pb-44 xm:pb-16">
      <div className="w-full sm:max-w-[600px] xm:max-w-[1200px] mx-auto px-6 min-[600px]:px-9 mlg:px-12">
        <Title
          title={`Order #${orderId}`}
          className="pt-8 pb-6 text-[18px] xm:text-[28px] leading-[22px] xm:leading-[34px] tracking-[0.9px] xm:tracking-[1.4px] border-b-[1px] border-b-[solid] border-b-gray-600 border-opacity-40 xm:border-none"
        />

        <div className="grid grid-cols-1 xm:grid-cols-2 gap-8 xm:gap-6">
          {/* items */}
          <div className="flex flex-col mt-4 min-[600px]:mt-10 xm:mt-0 gap-4 min-[600px]:gap-10 xm:gap-12 max-w-none xm:max-w-[546px]">
            {/* Payment Status */}
            <OrderPaymentStatus isPaid={order!.isPaid} />

            {order!.OrderItem.map((item) => (
              <div
                className="flex gap-6"
                key={`${item.product.slug}-${item.size}`}
              >
                <div className="basis-[100%] sm:basis-0 flex-1 max-w-max min-w-max">
                  <ProductImage
                    className="w-[80px] xm:w-[90px] h-[80px] xm:h-[90px]"
                    src={item.product.ProductImage[0].url}
                    width={500}
                    height={500}
                    alt={item.product.title}
                  />
                </div>

                <div className="flex-1 basis-[100%] sm:basis-[0%] size-[100%] min-w-[112px] -ml-[6px] xs:ml-[10px] xm:ml-0">
                  <p className="font-medium text-[12px] xm:text-[13px] leading-6 xm:leading-[26px] tracking-[1.65px] xm:tracking-[1.8px]">
                    {item.product.title}
                  </p>
                  <p className="font-normal text-black text-opacity-60 pt-[3px] text-[12px] xm:text-[13px] leading-6 xm:leading-[26px] tracking-[1.65px] xm:tracking-[1.8px]">
                    {item.size}
                  </p>
                  <p className="font-normal text-black text-opacity-60 pt-[3px] text-[13px] leading-6 tracking-[1.8px]">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="flex flex-col flex-1 basis-[100%] sm:flex-none min-w-[64px] xs:min-w-[unset] size-[100%] sm:size-[21.67%] items-end">
                  <p className="font-medium text-[12px] xm:text-[13px] leading-6 xm:leading-[26px] tracking-[1.65px] xm:tracking-[1.8px]">
                    {currencyFormatter(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* order summary */}
          <div className="pt-8 xm:bg-gray-100 xm:bg-opacity-55 xm:p-8 w-full xm:max-w-[432px] h-fit ml-auto border-t-2 border-black">
            <h2 className="font-medium text-[17px] leading-[22px] tracking-[0.8px] pb-2">
              Order summary ({order!.itemsInOrder}{" "}
              {order!.itemsInOrder === 1 ? "Item" : "Items"})
            </h2>

            <div className="flex flex-col mb-6 xm:mt-6">
              <p className="font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case mb-[5px]">
                Shipping Address
              </p>

              <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
                {address!.firstName} {address!.lastName}
              </span>
              <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
                {address!.address}
              </span>
              <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
                {address!.addressLineTwo}
              </span>
              <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
                {address!.city} {address!.zipCode}
              </span>
              <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
                {address!.country.name}
              </span>
              <span className="font-medium text-[15px] leading-[20px] tracking-normal normal-case">
                {address!.mobilePhoneNumber}
              </span>
            </div>

            <div className="flex justify-between font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case pb-1">
              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormatter(order!.subTotal)}
              </span>
            </div>

            <div className="flex justify-between font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case pb-1">
              <span>Shipping</span>
              <span className="text-right">Free</span>
            </div>

            <div className="flex justify-between font-normal text-gray-700 text-[15px] leading-[20px] tracking-normal normal-case pb-1">
              <span>Sales Tax</span>
              <span className="text-right">
                {currencyFormatter(order!.tax)}
              </span>
            </div>

            <div className="flex justify-between pb-6">
              <span className="font-medium text-[17px] leading-[22px] tracking-[0.8px]">
                Total Due
              </span>
              <span className="font-medium text-[17px] leading-[22px] tracking-[0.8px] text-right">
                {currencyFormatter(order!.totalDue)}
              </span>
            </div>

            <div className="mobile-checkout-btn-container">
              {order!.isPaid ? (
                <OrderPaymentStatus
                  isPaid={order!.isPaid}
                  className="w-full max-w-[500px]"
                />
              ) : (
                <PayPalButton orderId={order!.id} amount={order!.totalDue} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

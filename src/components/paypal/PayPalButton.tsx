"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import type {
  OnApproveData,
  CreateOrderData,
  OnApproveActions,
  CreateOrderActions,
} from "@paypal/paypal-js";

import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const roundedAmount = String(Math.round(amount * 100) / 100);

  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount,
            currency_code: "USD",
          },
        },
      ],
    });

    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) throw new Error("Order could not be updated.");

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture();

    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className="flex justify-center min-h-[148px] w-full">
      {isPending ? (
        <div className="flex flex-col items-center animate-pulse h-[148px] w-full max-w-[500px]">
          <div className="h-[44px] w-full rounded bg-gray-300 xm:bg-gray-200 mb-[14px]"></div>
          <div className="h-[44px] w-full rounded bg-gray-300 xm:bg-gray-200"></div>
          <div className="h-[14px] w-[110.5px] bg-gray-300 xm:bg-gray-200 my-[10px] rounded"></div>
        </div>
      ) : (
        <div className="w-full max-w-[500px] !transition-all !duration-300 z-0">
          <PayPalButtons
            style={{ height: 44, color: "black" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </div>
      )}
    </div>
  );
};

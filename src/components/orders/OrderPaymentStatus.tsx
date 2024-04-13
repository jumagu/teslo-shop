import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
  className?: string;
}

export const OrderPaymentStatus = ({ isPaid, className }: Props) => {
  return (
    <div
      className={clsx(`flex items-center gap-2 py-2 px-3.5 ${className}`, {
        "bg-red-700": !isPaid,
        "bg-green-700": isPaid,
      })}
    >
      <IoCardOutline className="text-white" size={30}></IoCardOutline>
      <span className="font-bold text-white text-[13px] leading-[20px] tracking-[1.4px] select-none">
        {isPaid ? "Payment Received" : "Outstanding Payment"}
      </span>
    </div>
  );
};

import { useSession } from "next-auth/react";
import { ButtonLinkPrimary, ButtonSecondary } from "@/components";

export const EmptyCart = () => {
  const { data: session } = useSession();

  return (
    <div className="px-6 sm:px-9 xl:px-12 mt-11">
      <div>
        <p className="text-[14px] font-normal tracking-[1.8px] leading-[26px] text-gray-600 text-center xm:text-left mt-[25%] xm:mt-0">
          Your cart is empty.
        </p>
      </div>

      <div className="flex flex-col xm:flex-row xm:items-center mt-6">
        <ButtonLinkPrimary
          className="xm:w-[320px]"
          text="Continue Shopping"
          href="/products"
        />

        {!session?.user && (
          <ButtonSecondary
            className="mt-4 xm:mt-0 xm:ml-6 xm:w-[320px]"
            text="Sign In"
            href="/auth/login"
          />
        )}
      </div>
    </div>
  );
};

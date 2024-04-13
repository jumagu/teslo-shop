import { auth } from "@/auth.config";
import { Title } from "@/components";
import { getCountries, getUserAddress } from "@/actions";

import { AddressFrom } from "./ui/AddressFrom";

export const metadata = {
  title: "Checkout",
  description:
    "Provide your shipping details to complete your purchase securely at Teslo Shop. Fast shipping and easy returns. Shop now and enjoy a hassle-free shopping experience.",
};

export default async function AddressPage() {
  const session = await auth();

  const countries = await getCountries();
  const userStoredAddress =
    (await getUserAddress(session!.user.id)) ?? undefined;

  return (
    <div className="w-full">
      <div className="w-full sm:max-w-[600px] xm:max-w-[1200px] mx-auto px-6 sm:px-9 lg:px-12">
        <Title
          title="Shipping"
          className="text-[18px] pb-2 xm:pt-8 tracking-[0.8px]"
        />

        <AddressFrom
          countries={countries}
          userStoredAddress={userStoredAddress}
        />
      </div>
    </div>
  );
}

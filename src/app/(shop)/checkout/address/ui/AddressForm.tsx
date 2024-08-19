"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import type { Address, Country } from "@/interfaces";
import { useAddressStore, useCartStore } from "@/store";
import { Form, FormField, ButtonPrimary } from "@/components";
import { deleteUserAddress, setUserAddress } from "@/actions";
import { AddressFormInputs, addressFormFields } from "@/schemas";

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { data: session } = useSession({ required: true });
  const { address, setAddress } = useAddressStore((state) => state);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  addressFormFields[6].options = countries.map(({ id, name }) => ({
    name,
    value: id,
  }));

  const methods = useForm<AddressFormInputs>({
    mode: "onTouched",
    defaultValues: { ...userStoredAddress },
  });

  const {
    register,
    formState: { isSubmitting, isLoading },
  } = methods;

  const onSubmit = async (data: AddressFormInputs) => {
    if (data.rememberAddress) {
      await setUserAddress(data, session!.user.id);
    } else {
      await deleteUserAddress(session!.user.id);
    }

    setAddress(data);

    router.push("/checkout");
  };

  useEffect(() => {
    if (address.firstName) methods.reset(address);
  }, [address, methods]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <></>;

  if (totalItemsInCart < 1)
    return (
      <p className="font-normal mt-6 mx:mt-10 text-[12px] leading-[24px] tracking-[1.8px] fade-in">
        Please fill your shopping cart first to start the checkout process
      </p>
    );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      className="max-w-[850px] grid grid-cols-1 sm:grid-cols-2 gap-6 fade-in"
    >
      {addressFormFields.map(
        ({ name, type, label, variant, options, validations }) => (
          <FormField
            key={name}
            name={name}
            type={type}
            label={label}
            variant={variant}
            options={options}
            validations={validations}
            errorVariant="sm"
          />
        )
      )}

      <label className="checkbox bounce flex items-center gap-2 sm:col-span-2 mt-2 w-fit h-fit cursor-pointer">
        <input type="checkbox" {...register("rememberAddress")} />
        <svg viewBox="0 0 21 21">
          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
        <span className="input-label select-none">Remember Address</span>
      </label>

      <div className="w-full sm:max-w-[206px] pt-2 pb-12">
        <ButtonPrimary
          type="submit"
          text="Next"
          disabled={isSubmitting || isLoading}
        />
      </div>
    </Form>
  );
};

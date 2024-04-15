"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  type SubmitHandler,
  type ValidationRule,
  useForm,
} from "react-hook-form";

import { ButtonPrimary } from "@/components";
import type { Address, Country } from "@/interfaces";
import { useAddressStore, useCartStore } from "@/store";
import { deleteUserAddress, setUserAddress } from "@/actions";

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  addressLineTwo?: string;
  zipCode: string;
  city: string;
  country: string;
  mobilePhoneNumber: string;
  rememberAddress: boolean;
};

const mobilePhoneNumberPattern: ValidationRule = new RegExp(
  "^\\+(?:[0-9] ?){6,14}[0-9]$"
);

export const AddressFrom = ({ countries, userStoredAddress = {} }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();

  const { data: session } = useSession({ required: true });

  const address = useAddressStore((state) => state.address);
  const setAddress = useAddressStore((state) => state.setAddress);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<FormInputs>({
    mode: "onTouched",
    defaultValues: { ...userStoredAddress },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (data.rememberAddress) {
      await setUserAddress(data, session!.user.id);
    } else {
      await deleteUserAddress(session!.user.id);
    }

    setAddress(data);

    router.push("/checkout");
  };

  useEffect(() => {
    if (address.firstName) reset(address);
  }, [address, reset]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <></>;

  return (
    <>
      {totalItemsInCart < 1 ? (
        <p className="font-normal mt-6 mx:mt-10 text-[12px] leading-[24px] tracking-[1.8px]">
          Please fill your shopping cart first to start the checkout process
        </p>
      ) : (
        <form
          className="max-w-[850px] grid grid-cols-1 sm:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="group">
            <span className="input-label">First Name</span>
            <input
              className={clsx("input-primary", {
                error: !!errors.firstName,
              })}
              aria-invalid={!!errors.firstName}
              type="text"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Please populate this field - First Name",
                },
              })}
            />
            {errors.firstName && (
              <p className="input-error-alert-address" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </label>

          <label className="group">
            <span className="input-label">Last Name</span>
            <input
              className={clsx("input-primary", {
                error: !!errors.lastName,
              })}
              aria-invalid={!!errors.lastName}
              type="text"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Please populate this field - Last Name",
                },
              })}
            />
            {errors.lastName && (
              <p className="input-error-alert-address" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </label>

          <label className="group">
            <span className="input-label">Address</span>
            <input
              className={clsx("input-primary", {
                error: !!errors.address,
              })}
              aria-invalid={!!errors.address}
              type="text"
              {...register("address", {
                required: {
                  value: true,
                  message:
                    "Please populate this field with valid non PO Box Address",
                },
              })}
            />
            {errors.address && (
              <p className="input-error-alert-address" role="alert">
                {errors.address.message}
              </p>
            )}
          </label>

          <label className="group">
            <span className="input-label">Address Line 2 (optional)</span>
            <input
              className={clsx("input-primary", {
                error: !!errors.addressLineTwo,
              })}
              aria-invalid={!!errors.addressLineTwo}
              type="text"
              {...register("addressLineTwo")}
            />
            {errors.addressLineTwo && (
              <p className="input-error-alert-address" role="alert">
                {errors.addressLineTwo.message}
              </p>
            )}
          </label>

          <label className="group">
            <span className="input-label">Postal Code</span>
            <input
              className={clsx("input-primary", {
                error: !!errors.zipCode,
              })}
              aria-invalid={!!errors.zipCode}
              type="text"
              {...register("zipCode", {
                required: {
                  value: true,
                  message: "Please populate this field - Postal Code",
                },
              })}
            />
            {errors.zipCode && (
              <p className="input-error-alert-address" role="alert">
                {errors.zipCode.message}
              </p>
            )}
          </label>

          <label className="group">
            <span className="input-label">City</span>
            <input
              className={clsx("input-primary", {
                error: !!errors.city,
              })}
              aria-invalid={!!errors.city}
              type="text"
              {...register("city", {
                required: {
                  value: true,
                  message: "Please populate this field - City",
                },
              })}
            />
            {errors.city && (
              <p className="input-error-alert-address" role="alert">
                {errors.city.message}
              </p>
            )}
          </label>

          <label className="group">
            <span className="input-label">Country</span>
            <select
              className={clsx("input-primary !bg-white", {
                error: !!errors.country,
              })}
              aria-invalid={!!errors.country}
              defaultValue=""
              {...register("country", {
                required: {
                  value: true,
                  message: "Please populate this field - Country",
                },
              })}
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="input-error-alert-address" role="alert">
                {errors.country.message}
              </p>
            )}
          </label>

          <label className="group">
            <span className="input-label">Mobile Phone Number</span>
            <input
              autoComplete="tel"
              className={clsx("input-primary", {
                error: !!errors.mobilePhoneNumber,
              })}
              aria-invalid={!!errors.mobilePhoneNumber}
              type="tel"
              inputMode="tel"
              {...register("mobilePhoneNumber", {
                required: {
                  value: true,
                  message: "Please populate this field - Phone Number",
                },
                pattern: {
                  value: mobilePhoneNumberPattern,
                  message: "Please provide a valid phone number",
                },
              })}
            />
            {errors.mobilePhoneNumber && (
              <p className="input-error-alert-address" role="alert">
                {errors.mobilePhoneNumber.message}
              </p>
            )}
          </label>

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
        </form>
      )}
    </>
  );
};

"use client";

import { useState } from "react";

import clsx from "clsx";
import {
  useForm,
  type SubmitHandler,
  type ValidationRule,
} from "react-hook-form";

import { login } from "@/actions";
import { ButtonPrimary, ButtonSecondary, ErrorMessage } from "@/components";

type FormInputs = {
  email: string;
  password: string;
};

const emailRegex: ValidationRule = new RegExp(
  "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
);

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");

    const result = await login(data.email, data.password);

    if (!result.ok) {
      setErrorMessage(result.msg ?? "");
      return;
    }

    window.location.replace("/");
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errorMessage && (
          <ErrorMessage message={errorMessage} className="items-center" />
        )}

        <label className="group">
          <span className="input-label">Email Address</span>
          <input
            className={clsx("input-primary", {
              error: !!errors.email,
            })}
            aria-invalid={!!errors.email}
            type="email"
            {...register("email", {
              required: { value: true, message: "Please enter email" },
              pattern: {
                value: emailRegex,
                message: "Please enter valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="input-error-alert-auth" role="alert">
              {errors.email.message}
            </p>
          )}
        </label>

        <label className="group">
          <span className="input-label">Password</span>
          <input
            className={clsx("input-primary", {
              error: !!errors.password,
            })}
            aria-invalid={!!errors.password}
            type="password"
            {...register("password", {
              required: { value: true, message: "Please enter password" },
            })}
          />
          {errors.password && (
            <p className="input-error-alert-auth" role="alert">
              {errors.password.message}
            </p>
          )}
        </label>

        <ButtonPrimary type="submit" text="Sign In" disabled={isSubmitting} />
      </form>

      <span className="block text-center my-8 text-gray-700 text-[14px] tracking-[1.8px] font-medium">
        OR
      </span>

      <ButtonSecondary
        text="Create Account"
        href="/auth/new-account"
        disabled={isSubmitting}
      />
    </>
  );
};

"use client";

import { useState } from "react";

import clsx from "clsx";
import {
  useForm,
  type SubmitHandler,
  type ValidationRule,
} from "react-hook-form";

import { login, register as registerUser } from "@/actions";
import { ButtonPrimary, ButtonSecondary, ErrorMessage } from "@/components";

type FormInputs = {
  fullName: string;
  email: string;
  password: string;
};

const emailRegex: ValidationRule = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
);

export const NewAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");

    const { fullName, email, password } = data;

    // * Server Action
    const resp = await registerUser(fullName, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.msg ?? "");
      return;
    }

    await login(email, password);

    window.location.replace("/");
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <label className="group">
          <span className="input-label">Full Name</span>
          <input
            className={clsx("input-primary", {
              error: !!errors.fullName,
            })}
            aria-invalid={!!errors.fullName}
            type="text"
            {...register("fullName", {
              required: { value: true, message: "Please enter full name" },
              maxLength: {
                value: 50,
                message: "Full name cannot be longer than 50 characters",
              },
            })}
          />
          {errors.fullName && (
            <p className="input-error-alert-auth" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </label>

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
              minLength: {
                value: 8,
                message: "Password must be 8 to 16 characters",
              },
              maxLength: {
                value: 16,
                message: "Password must be 8 to 16 characters",
              },
            })}
          />
          {errors.password && (
            <p className="input-error-alert-auth" role="alert">
              {errors.password.message}
            </p>
          )}
        </label>

        <ButtonPrimary
          type="submit"
          text="Create Account"
          disabled={isSubmitting}
        />
      </form>

      <span className="block text-center my-8 text-gray-700 text-[14px] tracking-[1.8px] font-medium">
        OR
      </span>

      <ButtonSecondary
        text="Sign In"
        href="/auth/login"
        disabled={isSubmitting}
      />
    </>
  );
};

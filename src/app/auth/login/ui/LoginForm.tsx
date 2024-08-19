"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { login } from "@/actions";
import { LoginFormInputs, loginFormFields } from "@/schemas";
import {
  Form,
  FormField,
  ErrorMessage,
  ButtonPrimary,
  ButtonSecondary,
} from "@/components";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<LoginFormInputs>();

  const onSubmit = async (values: LoginFormInputs) => {
    setErrorMessage("");
    setIsSubmitting(true);

    const result = await login(values.email, values.password);

    if (!result.ok) {
      setErrorMessage(result.msg ?? "");
      setIsSubmitting(false);
      return;
    }

    window.location.replace("/");
  };

  return (
    <>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-6 mt-4"
      >
        {errorMessage && (
          <ErrorMessage message={errorMessage} className="items-center" />
        )}

        {loginFormFields.map(({ name, type, label, validations }) => (
          <FormField
            key={name}
            name={name}
            type={type}
            label={label}
            disabled={isSubmitting}
            validations={validations}
          />
        ))}

        <ButtonPrimary type="submit" text="Sign In" disabled={isSubmitting} />
      </Form>

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

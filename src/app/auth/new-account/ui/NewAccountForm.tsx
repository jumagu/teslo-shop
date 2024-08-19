"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { login, register as registerUser } from "@/actions";
import { RegisterFormInputs, registerFormFields } from "@/schemas";
import {
  Form,
  FormField,
  ErrorMessage,
  ButtonPrimary,
  ButtonSecondary,
} from "@/components";

export const NewAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<RegisterFormInputs>({ mode: "onTouched" });

  const onSubmit = async (data: RegisterFormInputs) => {
    setErrorMessage("");
    setIsSubmitting(true);

    const { fullName, email, password } = data;

    // * Server Action
    const resp = await registerUser(fullName, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.msg ?? "");
      setIsSubmitting(false);
      return;
    }

    await login(email, password);

    window.location.replace("/");
  };

  return (
    <>
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-6 mt-4"
      >
        {errorMessage && <ErrorMessage message={errorMessage} />}

        {registerFormFields.map(({ name, type, label, validations }) => (
          <FormField
            key={name}
            name={name}
            type={type}
            label={label}
            disabled={isSubmitting}
            validations={validations}
          />
        ))}

        <ButtonPrimary
          type="submit"
          text="Create Account"
          disabled={isSubmitting}
        />
      </Form>

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

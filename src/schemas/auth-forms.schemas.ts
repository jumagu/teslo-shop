import type { RegisterOptions, ValidationRule } from "react-hook-form";
import { FormField } from "@/interfaces";

const emailRegex: ValidationRule = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
);

const fullNameRegex: ValidationRule = new RegExp(
  "(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})"
);

const passwordRegex: ValidationRule = new RegExp("^[^\\s]+$");

// ? Login Form

export type LoginFormInputs = {
  email: string;
  password: string;
};

const loginFormValidations: Record<
  keyof LoginFormInputs,
  RegisterOptions<LoginFormInputs>
> = {
  email: {
    required: {
      value: true,
      message: "Please enter email",
    },
    pattern: {
      value: emailRegex,
      message: "Please enter valid email address",
    },
  },
  password: {
    required: {
      value: true,
      message: "Please enter password",
    },
  },
};

export const loginFormFields: FormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    validations: loginFormValidations.email,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    validations: loginFormValidations.password,
  },
];

// ? Register Form

export type RegisterFormInputs = {
  fullName: string;
  email: string;
  password: string;
};

const registerFormValidations: Record<
  keyof RegisterFormInputs,
  RegisterOptions<RegisterFormInputs>
> = {
  fullName: {
    required: {
      value: true,
      message: "Please enter full name",
    },
    pattern: {
      value: fullNameRegex,
      message: "Please enter valid full name",
    },
    maxLength: {
      value: 25,
      message: "Full name cannot be longer than 25 characters",
    },
  },
  email: {
    required: {
      value: true,
      message: "Please enter email",
    },
    pattern: {
      value: emailRegex,
      message: "Please enter valid email address",
    },
  },
  password: {
    required: {
      value: true,
      message: "Please enter password",
    },
    pattern: {
      value: passwordRegex,
      message: "Please enter valid password",
    },
    minLength: {
      value: 8,
      message: "Password must be 8 to 16 characters",
    },
    maxLength: {
      value: 16,
      message: "Password must be 8 to 16 characters",
    },
  },
};

export const registerFormFields: FormField[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    validations: registerFormValidations.fullName,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    validations: registerFormValidations.email,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    validations: registerFormValidations.password,
  },
];

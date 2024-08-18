import type { RegisterOptions, ValidationRule } from "react-hook-form";
import { FormField } from "@/interfaces";

const mobilePhoneNumberRegex: ValidationRule = new RegExp(
  "^\\+(?:[0-9] ?){6,14}[0-9]$"
);

const noEmptyStringRegex: ValidationRule = new RegExp("^(?!\\s*$).+");

export type AddressFormInputs = {
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

const addressFormValidations: Record<
  keyof AddressFormInputs,
  RegisterOptions<AddressFormInputs>
> = {
  firstName: {
    required: {
      value: true,
      message: "Please populate this field - First Name",
    },
    pattern: {
      value: noEmptyStringRegex,
      message: "Please provide a valid first name",
    },
    maxLength: {
      value: 25,
      message: "First Name cannot be longer than 25 characters",
    },
  },
  lastName: {
    required: {
      value: true,
      message: "Please populate this field - Last Name",
    },
    pattern: {
      value: noEmptyStringRegex,
      message: "Please provide a valid last name",
    },
    maxLength: {
      value: 25,
      message: "Last Name cannot be longer than 25 characters",
    },
  },
  address: {
    required: {
      value: true,
      message: "Please populate this field with valid non PO Box Address",
    },
    pattern: {
      value: noEmptyStringRegex,
      message: "Please provide a valid address",
    },
    maxLength: {
      value: 50,
      message: "Address cannot be longer than 50 characters",
    },
  },
  addressLineTwo: {
    pattern: {
      value: noEmptyStringRegex,
      message: "Please provide a valid address line 2",
    },
    maxLength: {
      value: 50,
      message: "Address Line 2 cannot be longer than 50 characters",
    },
  },
  zipCode: {
    required: {
      value: true,
      message: "Please populate this field - Postal Code",
    },
    pattern: {
      value: noEmptyStringRegex,
      message: "Please provide a valid postal code",
    },
    maxLength: {
      value: 20,
      message: "Postal Code cannot be longer than 20 characters",
    },
  },
  city: {
    required: {
      value: true,
      message: "Please populate this field - City",
    },
    pattern: {
      value: noEmptyStringRegex,
      message: "Please provide a valid city",
    },
    maxLength: {
      value: 25,
      message: "City cannot be longer than 25 characters",
    },
  },
  country: {
    required: {
      value: true,
      message: "Please populate this field - Country",
    },
  },
  mobilePhoneNumber: {
    required: {
      value: true,
      message: "Please populate this field - Phone Number",
    },
    pattern: {
      value: mobilePhoneNumberRegex,
      message: "Please provide a valid phone number",
    },
  },
  rememberAddress: {},
};

export const addressFormFields: FormField[] = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    validations: addressFormValidations.firstName,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    validations: addressFormValidations.lastName,
  },
  {
    name: "address",
    type: "text",
    label: "Address",
    validations: addressFormValidations.address,
  },
  {
    name: "addressLineTwo",
    type: "text",
    label: "Address Line 2 (optional)",
    validations: addressFormValidations.addressLineTwo,
  },
  {
    name: "zipCode",
    type: "text",
    label: "Postal Code",
    validations: addressFormValidations.zipCode,
  },
  {
    name: "city",
    type: "text",
    label: "City",
    validations: addressFormValidations.city,
  },
  {
    name: "country",
    label: "Country",
    variant: "select",
    validations: addressFormValidations.country,
  },
  {
    name: "mobilePhoneNumber",
    type: "tel",
    label: "Mobile Phone Number",
    validations: addressFormValidations.mobilePhoneNumber,
  },
];

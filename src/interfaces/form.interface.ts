import type { RegisterOptions } from "react-hook-form";

export type FormFieldErrorVariant = "md" | "sm";
export type FormFieldVariant = "input" | "select" | "textarea";
export type SelectOption<T = string> = {
  name: string;
  value: T;
};

export interface BaseFormField {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string;
  validations?: RegisterOptions<any>;
  errorVariant?: FormFieldErrorVariant;
}

export interface Input extends BaseFormField {
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export interface Select extends BaseFormField {
  options?: SelectOption[];
}

export interface Textarea extends BaseFormField {
  placeholder?: string;
}

export interface FormField extends Input, Select, Textarea {
  variant?: FormFieldVariant;
}

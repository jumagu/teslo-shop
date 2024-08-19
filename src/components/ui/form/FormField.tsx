import { FormField as Props } from "@/interfaces";

import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

export const FormField = ({
  type,
  name,
  label,
  options,
  disabled,
  className,
  validations,
  placeholder,
  variant = "input",
  errorVariant = "md",
}: Props) => {
  if (variant === "input")
    return (
      <Input
        type={type}
        name={name}
        label={label}
        disabled={disabled}
        className={className}
        placeholder={placeholder}
        validations={validations}
        errorVariant={errorVariant}
      />
    );

  if (variant === "select")
    return (
      <Select
        name={name}
        label={label}
        options={options}
        disabled={disabled}
        className={className}
        validations={validations}
        errorVariant={errorVariant}
      />
    );

  if (variant === "textarea")
    return (
      <Textarea
        name={name}
        label={label}
        disabled={disabled}
        className={className}
        placeholder={placeholder}
        validations={validations}
        errorVariant={errorVariant}
      />
    );
};

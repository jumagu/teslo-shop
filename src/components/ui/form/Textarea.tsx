import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import { Textarea as Props } from "@/interfaces";
import { ErrorFeedback } from "./ErrorFeedback";

export const Textarea = ({
  name,
  label,
  disabled,
  className,
  validations,
  placeholder,
  errorVariant,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx("group", className)}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        {...register(name, validations)}
        className={clsx("input-primary__textarea", { error: !!errors[name] })}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!errors[name]}
        aria-describedby={`${name}-error`}
      />
      <ErrorFeedback
        id={`${name}-error`}
        varaint={errorVariant}
        message={errors[name]?.message as string}
      />
    </div>
  );
};

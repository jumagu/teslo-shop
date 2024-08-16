import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import { Input as Props } from "@/interfaces";

export const Input = ({
  type,
  name,
  label,
  disabled,
  validations,
  placeholder,
  errorVariant,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="group">
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, validations)}
        className={clsx("input-primary", { error: !!errors[name] })}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!errors[name]}
        aria-describedby={`${name}-error`}
      />
      {errors[name] && (
        <p
          id={`${name}-error`}
          role="alert"
          aria-live="assertive"
          className={`input-error-alert-auth`}
          // className={`input-error-alert-${errorVariant}`}
        >
          {(errors[name]?.message as string) ?? ""}
        </p>
      )}
    </div>
  );
};

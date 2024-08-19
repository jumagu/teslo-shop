import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import { Select as Props } from "@/interfaces";
import { ErrorFeedback } from "./ErrorFeedback";

export const Select = ({
  name,
  label,
  options,
  disabled,
  className,
  validations,
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
      <select
        id={name}
        defaultValue=""
        {...register(name, validations)}
        className={clsx("input-primary !bg-white", { error: !!errors[name] })}
        disabled={disabled}
        aria-invalid={!!errors[name]}
        aria-describedby={`${name}-error`}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options &&
          options.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
      </select>
      <ErrorFeedback
        id={`${name}-error`}
        varaint={errorVariant}
        message={errors[name]?.message as string}
      />
    </div>
  );
};

import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import { Select as Props } from "@/interfaces";

export const Select = ({
  name,
  label,
  options,
  disabled,
  validations,
  errorVariant,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="group">
      <label className="input-label" htmlFor={name}>
        Select
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
      {errors[name] && (
        <p
          id={`${name}-error`}
          role="alert"
          aria-live="assertive"
          className={`input-error-alert-${errorVariant}`}
        >
          {(errors[name]?.message as string) ?? ""}
        </p>
      )}
    </div>
  );
};

import { FormFieldErrorVariant } from "@/interfaces";

interface Props {
  id: string;
  message?: string;
  varaint?: FormFieldErrorVariant;
}

export const ErrorFeedback = ({ id, message, varaint = "md" }: Props) => {
  const feedback = message && message.length > 0 && (
    <p
      id={id}
      role="alert"
      aria-live="assertive"
      className={`input-error-alert-${varaint}`}
    >
      {message}
    </p>
  );

  return feedback;
};

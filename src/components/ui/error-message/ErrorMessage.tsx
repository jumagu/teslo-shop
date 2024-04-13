import { RiErrorWarningFill } from "react-icons/ri";

interface Props {
  message: string;
  className?: string;
}

export const ErrorMessage = ({ message, className }: Props) => {
  return (
    <div
      className={`fade-in flex gap-2 bg-gray-100 min-h-[46px] py-[10px] px-4 select-none ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <RiErrorWarningFill className="min-h-6 min-w-6 text-red-500" />
      <p className="font-medium text-sm text-gray-700">{message}</p>
    </div>
  );
};

interface Props {
  text: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
}

export const ButtonPrimary = ({ text, type, disabled, onClick }: Props) => {
  return (
    <div className="w-full flex justify-center aria-disabled:cursor-not-allowed" aria-disabled={disabled}>
      <button
        type={type}
        className="btn-primary group"
        aria-disabled={disabled}
        disabled={disabled}
        onClick={onClick}
      >
        <span className="btn-primary-text">{text}</span>
      </button>
    </div>
  );
};

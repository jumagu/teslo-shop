import Link from "next/link";

interface Props {
  text: string;
  href: string;
  disabled?: boolean;
  className?: string;
}

export const ButtonSecondary = ({ text, href, disabled, className }: Props) => {
  return (
    <div
      className="aria-disabled:cursor-not-allowed group"
      aria-disabled={disabled}
    >
      <Link className={`btn-secondary ${className}`} href={href}>
        {text}
      </Link>
    </div>
  );
};

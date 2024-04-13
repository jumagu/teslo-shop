import Link from "next/link";

interface Props {
  text: string;
  href: string;
  className?: string;
}

export const ButtonLinkPrimary = ({ text, href, className }: Props) => {
  return (
    <Link className={`btn-primary ${className} group`} href={href}>
      <span className="btn-primary-text">{text}</span>
    </Link>
  );
};

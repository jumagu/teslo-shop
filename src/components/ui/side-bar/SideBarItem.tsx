import Link from "next/link";

interface Props {
  name: string;
  path?: string;
  onClick?: () => Promise<void> | void;
  variant?: "link" | "button";
}

export const SideBarItem = ({
  name,
  path = "",
  onClick,
  variant = "link",
}: Props) => {
  const text = <span className="block mx-1">{name}</span>;

  const itemVariant =
    variant === "link" ? (
      <Link
        href={path}
        onClick={onClick}
        className="font-medium text-[13px] leading-[24px] tracking-[1.8px] mb-2 p-2 hover:bg-gray-100 transition-colors duration-[.33s] block"
      >
        {text}
      </Link>
    ) : (
      <button
        onClick={onClick}
        className="font-medium text-[13px] leading-[24px] tracking-[1.8px] mb-2 p-2 hover:bg-gray-100 transition-colors duration-[.33s] text-left uppercase block w-full"
      >
        {text}
      </button>
    );

  return (
    <li role="none" className="m-0 block list-none">
      {itemVariant}
    </li>
  );
};

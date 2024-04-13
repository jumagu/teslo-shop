import clsx from "clsx";

interface Props {
  label?: string;
}

export const Footer = ({ label }: Props) => {
  return (
    <footer className="w-full">
      <nav>
        <ul className="footer-list">
          <li className="footer-item">Teslo © {new Date().getFullYear()}</li>
          <li className="footer-item">Privacy & Legal</li>
          <li
            className={clsx("footer-item", {
              "hidden min-[600px]:block": label?.toLowerCase() !== "contact",
            })}
          >
            {label}
          </li>
        </ul>
      </nav>
    </footer>
  );
};
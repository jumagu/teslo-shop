import "./Loader.css";

interface Props {
  className?: string;
}

export const Loader = ({ className }: Props) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <div className="loader"></div>
    </div>
  );
};

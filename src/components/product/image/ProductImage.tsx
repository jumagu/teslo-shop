import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProductImage = ({
  src,
  alt,
  width,
  height,
  className,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/images/products/${src}`
    : "/images/no-product-image/NoProductImage.jpg";

  return (
    <Image
      className={className}
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      placeholder="blur"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

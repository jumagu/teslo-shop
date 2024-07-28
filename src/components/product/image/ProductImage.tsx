import Image from "next/image";

import { shimmer, toBase64 } from "@/utils";

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
      placeholder={`data:image/svg+xml;base64,${toBase64(
        shimmer(width, height)
      )}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

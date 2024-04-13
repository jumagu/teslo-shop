import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeSelected: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeSelected,
}: Props) => {
  return (
    <div className="mb-6">
      <legend className="font-semibold text-[13px] leading-[24px] tracking-[1.8px] antialiased">
        Size
      </legend>

      <div className="flex gap-[22px] mt-2 xm:mt-3">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx(
              "font-semibold text-[13px] leading-[24px] tracking-[1.8px] antialiased focus:outline-1 focus:outline-dotted focus:outline-offset-2 focus:outline-black",
              {
                "border-b border-solid border-transparent":
                  size !== selectedSize,
                "border-b border-solid border-black": size === selectedSize,
              }
            )}
            onClick={() => onSizeSelected(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

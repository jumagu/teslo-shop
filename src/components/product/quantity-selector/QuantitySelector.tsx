"use client";

import type { ChangeEvent } from "react";

import clsx from "clsx";

import { MdAdd, MdRemove } from "react-icons/md";

interface Props {
  quantity: number;
  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1 || quantity + value > 5) return;

    onQuantityChanged(quantity + value);
  };

  const onInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (isNaN(value)) {
      return;
    }

    if (value < 1 || value > 5) {
      // onQuantityChanged(1);
      return;
    }

    onQuantityChanged(value);
  };

  return (
    <div className="pb-[18px]">
      <legend className="font-semibold text-[13px] leading-[24px] tracking-[1.8px] antialiased">
        Quantity
      </legend>

      <div className="flex items-center mt-2">
        <button
          className={clsx("h-6", {
            "focus:outline-1 focus:outline-dotted focus:outline-current":
              quantity > 1,
            "cursor-not-allowed text-gray-600 opacity-60": quantity <= 1,
          })}
          onClick={() => onValueChanged(-1)}
        >
          <MdRemove />
        </button>

        <input
          className="w-[80px] h-[46px] mx-3 px-3 text-center text-gray-600 font-medium text-[13px] border border-solid border-gray-300 outline-none focus:border-gray-600 transition-all duration-500 uppercase"
          value={quantity}
          type="text"
          readOnly
          onChange={onInputChanged}
        />

        <button
          className={clsx("h-6", {
            "focus:outline-1 focus:outline-dotted focus:outline-current":
              quantity < 5,
            "cursor-not-allowed text-gray-600 opacity-60": quantity >= 5,
          })}
          onClick={() => onValueChanged(1)}
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

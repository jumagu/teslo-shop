import {
  forwardRef,
  type MouseEvent,
  type FocusEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

import clsx from "clsx";
import { IoIosSearch } from "react-icons/io";

import { CloseIcon } from "../icons/CloseIcon";

interface Props {
  open: boolean;
  value?: string;
  isOnSideBar?: boolean;

  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClickClearBtn?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  SearchInput.displayName = "SearchInput";

  const {
    open,
    value,
    onBlur,
    onClick,
    onChange,
    onKeyDown,
    isOnSideBar,
    onClickClearBtn,
  } = props;

  return (
    <div
      className={clsx({
        "search-input": !isOnSideBar,
        "search-input-mobile": !!isOnSideBar,
        open,
      })}
      onClick={onClick}
    >
      <div className="flex items-center pe-1 py-1">
        <IoIosSearch
          size={24}
          className="text-gray-600 hover:text-black transition-colors duration-[0.33s]"
        />
      </div>

      <input
        ref={ref}
        value={value}
        type="search"
        autoComplete="off"
        aria-label="Search"
        placeholder="Search"
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={clsx(
          "w-full font-medium text-[11.5px] bg-inherit border-none uppercase appearance-none focus:outline-none transition-opacity duration-[0.33s]",
          {
            "opacity-0": !open && !isOnSideBar,
            "opacity-100": open && isOnSideBar,
          }
        )}
      />

      <div
        className={clsx(
          "w-auto flex ps-1 py-1 transition-all duration-[0.33s]",
          {
            "invisible opacity-0": !value?.length,
          }
        )}
      >
        <button
          type="button"
          className="search-input-cancel-button"
          onClick={onClickClearBtn}
        >
          <CloseIcon className="min-w-4 min-h-4 text-gray-600 hover:text-black transition-colors duration-[0.33s]" />
        </button>
      </div>
    </div>
  );
});

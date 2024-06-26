import { useRef, useState, type KeyboardEvent } from "react";

import { useRouter } from "next/navigation";

import clsx from "clsx";

import { IoIosSearch } from "react-icons/io";
import { CloseIcon } from "../icons/CloseIcon";

import { useUiStore } from "@/store";

interface Props {
  value: string;
  setValue: (value: string) => void;
  setSuggestionsVisivility: (value: boolean) => void;

  isOnSideBar?: boolean;
}

export const SearchInput = ({
  value,
  setValue,
  setSuggestionsVisivility,
  isOnSideBar,
}: Props) => {
  const router = useRouter();

  const closeSideBarMenu = useUiStore((state) => state.closeSideBarMenu);

  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search?searchTerm=${value}`);

      if (isOnSideBar) {
        closeSideBarMenu();
      }
    }
  };

  const handleSearchBarBehavior = () => {
    setInputOpen(true);
    searchInputRef.current?.focus();
    setFocused(true);
  };

  const handleInputFocus = () => {
    setFocused(true);
    setSuggestionsVisivility(true);
  };

  const handleInputBlur = () => {
    setFocused(false);

    setTimeout(() => {
      setSuggestionsVisivility(false);
    }, 90);

    if (value.length > 0) return;

    if (!touched) {
      setTouched(true);
      return;
    }

    if (touched) {
      setInputOpen(false);
      setTouched(false);
    }
  };

  return (
    <div
      className={clsx({
        "search-input": !isOnSideBar,
        "search-input-mobile": isOnSideBar,
        open: inputOpen,
        focused: focused,
      })}
      onClick={handleSearchBarBehavior}
    >
      <div className="flex items-center pe-1 py-1">
        <IoIosSearch
          size={24}
          className="text-gray-600 hover:text-black transition-colors duration-[0.33s]"
        />
      </div>

      <input
        ref={searchInputRef}
        type="search"
        value={value}
        autoComplete="off"
        aria-label="Search"
        placeholder="Search"
        onChange={(event) => setValue(event.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={clsx(
          "w-full font-medium text-[11.5px] bg-inherit border-none uppercase appearance-none focus:outline-none transition-opacity duration-[0.33s]",
          {
            "opacity-0": !inputOpen && !isOnSideBar,
            "opacity-100": inputOpen && isOnSideBar,
          }
        )}
      />

      <div
        className={clsx(
          "w-auto flex ps-1 py-1 transition-all duration-[0.33s]",
          {
            "visible opacity-100": value.length > 0,
            "invisible opacity-0": !value.length,
          }
        )}
      >
        <button
          type="button"
          className="search-input-cancel-button"
          onClick={() => setValue("")}
        >
          <CloseIcon className="min-w-4 min-h-4 text-gray-600 hover:text-black transition-colors duration-[0.33s]" />
        </button>
      </div>
    </div>
  );
};

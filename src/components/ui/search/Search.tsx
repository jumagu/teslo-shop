import {
  useRef,
  useState,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

import { useRouter } from "next/navigation";

import { useUiStore } from "@/store";
import { getSuggestedProducts } from "@/actions";

import { SearchInput } from "./SearchInput";
import { SearchSuggestions } from "./SearchSuggestions";

interface Props {
  isOnSideBar?: boolean;
}

export const Search = ({ isOnSideBar }: Props) => {
  const router = useRouter();

  const closeSideBarMenu = useUiStore((state) => state.closeSideBarMenu);

  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [touched, setTouched] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const getSuggestedItems = async () => {
    if (searchTerm.trim().length <= 1) {
      setSuggestions([]);
      return;
    }

    const suggesterItems = await getSuggestedProducts(searchTerm);
    setSuggestions(suggesterItems);
  };

  // ? Search bar event handlers
  const handleClick = () => {
    setInputOpen(true);
    setSuggestionsVisible(true);
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    router.push(`/search?searchTerm=${searchTerm}`);

    if (isOnSideBar) {
      closeSideBarMenu();
    }

    searchInputRef.current?.blur();
  };

  const handleBlur = () => {
    setTouched(true);

    if (searchTerm.length === 0 && touched) {
      setTouched(false);
      setInputOpen(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClickClearBtn = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  // ? Suggestions list event handlers
  const handleClickSuggestion = (item: string) => {
    router.push(`/search?searchTerm=${item}`);

    if (isOnSideBar) {
      closeSideBarMenu();
    }

    setSuggestionsVisible(false);
  };

  // ? Effects
  useEffect(() => {
    getSuggestedItems();
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSuggestionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group" role="search">
      <SearchInput
        ref={searchInputRef}
        open={inputOpen}
        value={searchTerm}
        onBlur={handleBlur}
        onClick={handleClick}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        isOnSideBar={isOnSideBar}
        onClickClearBtn={handleClickClearBtn}
      />
      <SearchSuggestions
        ref={suggestionsRef}
        visible={suggestionsVisible}
        suggestions={suggestions}
        onClickSuggestion={handleClickSuggestion}
      />
    </div>
  );
};

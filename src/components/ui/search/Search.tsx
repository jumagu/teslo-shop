import { useEffect, useState } from "react";

import { getSuggestedProducts } from "@/actions";

import { SearchInput } from "./SearchInput";
import { SearchSuggestions } from "./SearchSuggestions";

interface Props {
  isOnSideBar?: boolean;
}

export const Search = ({ isOnSideBar }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggesterItems, setSuggesterItems] = useState<string[]>([]);
  const [suggestionsVisivility, setSuggestionsVisivility] = useState(false);

  const getSuggestedItems = async () => {
    const suggesterItems = await getSuggestedProducts(searchValue);
    setSuggesterItems(suggesterItems);
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      getSuggestedItems();
      return;
    }

    setSuggesterItems([]);
  }, [searchValue]);

  return (
    <div className="relative">
      <SearchInput
        value={searchValue}
        setValue={setSearchValue}
        setSuggestionsVisivility={setSuggestionsVisivility}
        isOnSideBar={isOnSideBar}
      />
      <SearchSuggestions
        visible={suggestionsVisivility}
        suggesterItems={suggesterItems}
        isOnSideBar={isOnSideBar}
      />
    </div>
  );
};

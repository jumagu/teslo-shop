import { forwardRef } from "react";

interface Props {
  visible: boolean;
  suggestions: string[];
  onClickSuggestion: (item: string) => void;
}

export const SearchSuggestions = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    SearchSuggestions.displayName = "SearchSuggestions";

    const { visible, suggestions, onClickSuggestion } = props;

    if (!visible || suggestions.length <= 0) return null;

    return (
      <ul className="w-full mt-2 py-2 bg-white shadow-lg absolute z-[1] list-none">
        <div ref={ref}>
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="w-full py-1.5 px-[21px] leading-[20px] hover:bg-gray-100 hover:cursor-pointer"
              onClick={() => onClickSuggestion(item)}
            >
              <span className="text-gray-600 text-[11.5px] font-normal leading-[24px] tracking-[1.8px]">
                {item}
              </span>
            </li>
          ))}
        </div>
      </ul>
    );
  }
);

import { useRouter } from "next/navigation";

import { useUiStore } from "@/store";

interface Props {
  visible: boolean;
  suggesterItems: string[];

  isOnSideBar?: boolean;
}

export const SearchSuggestions = ({
  visible,
  suggesterItems,
  isOnSideBar,
}: Props) => {
  const router = useRouter();

  const closeSideBarMenu = useUiStore((state) => state.closeSideBarMenu);

  const handleClick = (item: string) => {
    router.push(`/search?searchTerm=${item}`);

    if (isOnSideBar) {
      closeSideBarMenu();
    }
  };

  if (visible && suggesterItems.length > 0)
    return (
      <ul className="w-full mt-2 py-2 bg-white shadow-lg absolute z-[1] list-none">
        {suggesterItems.map((item, index) => (
          <li
            key={index}
            className="w-full py-1.5 px-[21px] leading-[20px] hover:bg-gray-100 hover:cursor-pointer"
            onClickCapture={() => handleClick(item)}
          >
            <span className="text-gray-600 text-[11.5px] font-normal leading-[24px] tracking-[1.8px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
};

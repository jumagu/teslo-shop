"use client";

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";

import clsx from "clsx";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import { generatePaginationNumbers } from "@/utils";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) redirect(pathName);

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") return `${pathName}?${params.toString()}`;

    if (+pageNumber <= 0) return `${pathName}`;

    if (+pageNumber > totalPages) return `${pathName}?${params.toString()}`;

    params.set("page", pageNumber.toString());

    return `${pathName}?${params.toString()}`;
  };

  return (
    <nav
      className="flex justify-center pt-6 pb-12"
      aria-label="Page Navigation"
    >
      <ul className="flex list-style-none gap-2 min-[600px]:gap-3">
        <li>
          <Link
            className={clsx(
              "flex justify-center items-center w-8 min-[600px]:w-10 h-8 min-[600px]:h-10 border-0 outline-none transition-all duration-500",
              {
                "text-gray-800 hover:bg-gray-200": currentPage > 1,
                "text-gray-400 pointer-events-none": currentPage === 1,
              }
            )}
            href={createPageUrl(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            <MdArrowBackIosNew className="w-[24px] min-[600px]:w-[30px] h-[24px] min-[600px]:h-[30px]" />
          </Link>
        </li>

        {allPages.map((page, index) => (
          <li key={index}>
            <Link
              className={clsx(
                "flex justify-center items-center w-8 min-[600px]:w-10 h-8 min-[600px]:h-10 border-0 outline-none transition-all duration-500",
                {
                  "hover:bg-gray-200": page !== currentPage,
                  "bg-gray-500 bg-opacity-95 text-white shadow-md":
                    page === currentPage,
                }
              )}
              href={createPageUrl(page)}
            >
              <span className="font-medium text-[13px] min-[600px]:text-[15px]">
                {page}
              </span>
            </Link>
          </li>
        ))}

        <li>
          <Link
            className={clsx(
              "flex justify-center items-center w-8 min-[600px]:w-10 h-8 min-[600px]:h-10 border-0 outline-none transition-all duration-500",
              {
                "text-gray-800 hover:bg-gray-200": currentPage < totalPages,
                "text-gray-400 pointer-events-none": currentPage === totalPages,
              }
            )}
            href={createPageUrl(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            <MdArrowForwardIos className="w-[24px] min-[600px]:w-[30px] h-[24px] min-[600px]:h-[30px]" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

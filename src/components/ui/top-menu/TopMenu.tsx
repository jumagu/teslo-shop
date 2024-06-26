"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { IoCartOutline } from "react-icons/io5";

import { teslaFont } from "@/config/fonts.config";
import { useCartStore, useUiStore } from "@/store";
import clsx from "clsx";
import { Search } from "../search/Search";

interface Props {
  isOnAuth?: boolean;
}

export const TopMenu = ({ isOnAuth = false }: Props) => {
  const openSideBarMenu = useUiStore((state) => state.openSideBarMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <header className="flex h-14 justify-between items-center bg-white w-full sticky top-0 z-30">
      <h1
        className={clsx("flex items-center justify-start basis-0 grow", {
          "pl-[2px]": !isOnAuth,
          "pl-[10px] min-[600px]:pl-[22px] mlg:pl-[34px]": isOnAuth,
        })}
      >
        <span
          className={`${teslaFont.className} antialiased text-base pl-4 sm:pr-4 tracking-[8px] select-none mt-1`}
        >
          Teslo
        </span>

        {isOnAuth ? (
          <></>
        ) : (
          <>
            <span className="font-medium text-[12px] pl-[6px] pr-[6px] sm:pr-[15px]">
              |
            </span>

            <Link
              className="px-2 py-1 hover:bg-gray-100 transition-all duration-[.33s]"
              href="/products"
            >
              <span className="tracking-[1.4px] font-medium text-[13px]">
                Shop
              </span>
            </Link>
          </>
        )}
      </h1>

      {isOnAuth ? (
        <></>
      ) : (
        <>
          <nav className="hidden mlg:flex basis-0 grow justify-center px-12">
            <ol className="flex">
              <li role="none">
                <div className="py-1 px-2 hover:bg-gray-100 transition-all duration-[.33s]">
                  <Link
                    className="mx-2 text-[13px] text-gray-600 font-medium tracking-[1.8px] hover:text-black transition-all duration-[.33s]"
                    href="/gender/men"
                  >
                    Men
                  </Link>
                </div>
              </li>

              <li role="none">
                <div className="py-1 px-2 hover:bg-gray-100 transition-all duration-[.33s]">
                  <Link
                    className="mx-2 text-[13px] text-gray-600 font-medium tracking-[1.8px] hover:text-black transition-all duration-[.33s]"
                    href="/gender/women"
                  >
                    Women
                  </Link>
                </div>
              </li>

              <li role="none">
                <div className="py-1 px-2 hover:bg-gray-100 transition-all duration-[.33s]">
                  <Link
                    className="mx-2 text-[13px] text-gray-600 font-medium tracking-[1.8px] hover:text-black transition-all duration-[.33s]"
                    href="/gender/kids"
                  >
                    Kids
                  </Link>
                </div>
              </li>
            </ol>
          </nav>

          <ol className="flex items-center justify-end pr-4 basis-0 grow">
            <div className="mr-2 hidden mlg:block">
              <Search />
            </div>

            <div className="ml-1">
              <Link
                className="text-gray-600 hover:text-black transition-colors duration-[.33s]"
                href="/cart"
              >
                <div className="relative">
                  {loaded && totalItemsInCart > 0 && (
                    <span className="fade-in absolute text-xs text-white text-center rounded-full w-4 h-4 font-semibold -top-[0.35rem] -right-[0.35rem] bg-blue-600">
                      {totalItemsInCart <= 9 ? (
                        totalItemsInCart
                      ) : (
                        <span>
                          9<sup>+</sup>
                        </span>
                      )}
                    </span>
                  )}
                  <IoCartOutline size={24} />
                </div>
              </Link>
            </div>

            <div className="ml-[14px] mlg:ml-2">
              <button
                className="sm:px-2 py-1 hover:bg-gray-100 transition-all duration-[.33s] uppercase"
                onClick={openSideBarMenu}
              >
                <span className="mx-2 text-[13px] text-gray-600 font-medium tracking-[1.8px] leading-[26px] hover:text-black transition-all duration-[.33s]">
                  Menu
                </span>
              </button>
            </div>
          </ol>
        </>
      )}
    </header>
  );
};

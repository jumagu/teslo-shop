"use client";

import { useEffect } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";

import clsx from "clsx";

import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

import { logout } from "@/actions";
import { useUiStore } from "@/store";

export const SideBar = () => {
  const isSideBarMenuOpen = useUiStore((state) => state.isSideBarMenuOpen);
  const closeSideBarMenu = useUiStore((state) => state.closeSideBarMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  useEffect(() => {
    isSideBarMenuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isSideBarMenuOpen]);

  return (
    <div>
      {/* Background black */}
      {isSideBarMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black opacity-30 transition-all duration-300"></div>
      )}

      {/* Blur */}
      {isSideBarMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-50 backdrop-filter backdrop-blur-sm transition-all duration-300"
          onClick={closeSideBarMenu}
        ></div>
      )}

      {/* SideBarMenu */}
      <div
        className={clsx(
          "fixed px-8 right-0 top-0 w-[414px] max-w-[calc(100vw-48px)] h-screen bg-white z-50 transform transition-all duration-300 overflow-y-auto",
          { "translate-x-full": !isSideBarMenuOpen }
        )}
      >
        {/* Close Button */}
        <div className="flex flex-row-reverse mt-4 mb-6 sticky bg-white top-0 z-10">
          <button className="hover:bg-gray-100 transition-all duration-300">
            <IoCloseOutline
              className="text-gray-500"
              size={25.7}
              onClick={closeSideBarMenu}
            />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-2 mlg:hidden">
          <IoSearchOutline
            className="absolute top-[9px] left-3 text-gray-500"
            size={22}
          />
          <input
            className="w-full h-[40px] bg-gray-50 px-10 py-1 font-medium text-[12px] leading-[24px] border border-gray-300 outline-none focus:border-gray-600 transition-all duration-500 uppercase"
            type="text"
            placeholder="Search"
          />
          <IoCloseOutline
            className="absolute top-[10px] right-2 text-gray-500 hover:bg-gray-200 cursor-pointer transition-all duration-300"
            size={19}
          />
        </div>

        {/* Navigation list */}
        <nav className="mt-6">
          <div className="mlg:hidden">
            <Link
              className="font-medium text-[13px] leading-[24px] tracking-[1.8px] mb-2 p-2 hover:bg-gray-100 transition-all duration-300 block"
              href="/gender/men"
              onClick={closeSideBarMenu}
            >
              <span className="mx-1">Men</span>
            </Link>
            <Link
              className="font-medium text-[13px] leading-[24px] tracking-[1.8px] mb-2 p-2 hover:bg-gray-100 transition-all duration-300 block"
              href="/gender/women"
              onClick={closeSideBarMenu}
            >
              <span className="mx-1">Women</span>
            </Link>
            <Link
              className="font-medium text-[13px] leading-[24px] tracking-[1.8px] p-2 hover:bg-gray-100 transition-all duration-300 block"
              href="/gender/kids"
              onClick={closeSideBarMenu}
            >
              <span className="mx-1">Kids</span>
            </Link>

            <div className="w-full h-px bg-gray-200 my-4" />
          </div>

          {isAuthenticated && (
            <>
              <Link
                className="font-medium text-[13px] leading-[24px] tracking-[1.8px] mb-2 p-2 hover:bg-gray-100 transition-all duration-300 block"
                href="/profile"
                onClick={closeSideBarMenu}
              >
                <span>Profile</span>
              </Link>

              <Link
                className="font-medium text-[13px] leading-[24px] tracking-[1.8px] mb-2 p-2 hover:bg-gray-100 transition-all duration-300 block"
                href="/orders"
                onClick={closeSideBarMenu}
              >
                <span>Orders</span>
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <Link
              className="font-medium text-[13px] leading-[24px] tracking-[1.8px] p-2 hover:bg-gray-100 transition-all duration-300 block"
              href="/auth/login"
              onClick={closeSideBarMenu}
            >
              <span>Sign In</span>
            </Link>
          ) : (
            <button
              className="font-medium text-[13px] leading-[24px] tracking-[1.8px] p-2 hover:bg-gray-100 transition-all duration-300 text-left uppercase block w-full"
              onClick={() => logout()}
            >
              <span>Sign Out</span>
            </button>
          )}

          {isAuthenticated && isAdmin && (
            <>
              <div className="w-full h-px bg-gray-200 my-4" />

              <Link
                className="font-medium text-[13px] leading-[24px] tracking-[1.8px] mb-2 p-2 hover:bg-gray-100 transition-all duration-300 block"
                href="/admin/products"
                onClick={closeSideBarMenu}
              >
                <span>Products</span>
              </Link>

              <Link
                className="font-medium text-[13px] leading-[24px] tracking-[1.8px] mb-2 p-2 hover:bg-gray-100 transition-all duration-300 block"
                href="/admin/orders"
                onClick={closeSideBarMenu}
              >
                <span>Orders</span>
              </Link>

              <Link
                className="font-medium text-[13px] leading-[24px] tracking-[1.8px] p-2 hover:bg-gray-100 transition-all duration-300 block"
                href="/admin/users"
                onClick={closeSideBarMenu}
              >
                <span>Users</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

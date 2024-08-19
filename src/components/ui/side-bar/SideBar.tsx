"use client";

import { useEffect } from "react";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { IoCloseOutline } from "react-icons/io5";

import { logout } from "@/actions";
import { useUiStore } from "@/store";
import { GENDERS, ADMIN_OPTIONS, AUTHENTICATED_OPTIONS } from "@/constants";

import { Search } from "../search/Search";
import { SideBarItem } from "./SideBarItem";

export const SideBar = () => {
  const { isSideBarMenuOpen, closeSideBarMenu } = useUiStore((state) => state);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  const signOut = async () => {
    if (!isAuthenticated) return;

    await logout();
    window.location.reload();
  };

  useEffect(() => {
    isSideBarMenuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isSideBarMenuOpen]);

  const genders = (
    <>
      <ul className="mlg:hidden" role="none">
        {GENDERS.map(({ name, path }) => (
          <SideBarItem
            key={name}
            path={path}
            name={name}
            onClick={closeSideBarMenu}
          />
        ))}
      </ul>

      <div className="w-full h-px bg-gray-200 my-4 mlg:hidden" />
    </>
  );

  const signButton = !isAuthenticated ? (
    <SideBarItem path="/auth/login" name="Sign In" />
  ) : (
    <SideBarItem variant="button" name="Sign Out" onClick={signOut} />
  );

  const authenticatedOptions = (
    <ul role="none">
      {isAuthenticated &&
        AUTHENTICATED_OPTIONS.map(({ path, name }) => (
          <SideBarItem
            key={name}
            path={path}
            name={name}
            onClick={closeSideBarMenu}
          />
        ))}
      {signButton}
    </ul>
  );

  const adminOptions =
    isAuthenticated && isAdmin ? (
      <>
        <div className="w-full h-px bg-gray-200 my-4" />

        <ul role="none">
          {ADMIN_OPTIONS.map(({ path, name }) => (
            <SideBarItem
              key={name}
              path={path}
              name={name}
              onClick={closeSideBarMenu}
            />
          ))}
        </ul>
      </>
    ) : null;

  return (
    <>
      <div
        role="dialog"
        aria-hidden={!isSideBarMenuOpen}
        className={clsx("sidebar-dialog", { open: isSideBarMenuOpen })}
      >
        <div className="flex flex-row-reverse pt-4 pb-6 sticky bg-white top-0 z-10">
          <button className="hover:bg-gray-100 transition-all duration-[.33s]">
            <IoCloseOutline
              className="text-gray-500"
              size={25.7}
              onClick={closeSideBarMenu}
            />
          </button>
        </div>

        <div className="mb-6 mlg:hidden">
          <Search isOnSideBar />
        </div>

        <section>
          {genders}

          {authenticatedOptions}

          {adminOptions}
        </section>
      </div>

      <div
        onClick={closeSideBarMenu}
        className={clsx("backdrop", { visible: isSideBarMenuOpen })}
      ></div>
    </>
  );
};

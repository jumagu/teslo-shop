import { create } from "zustand";

interface State {
  isSideBarMenuOpen: boolean;
  openSideBarMenu: () => void;
  closeSideBarMenu: () => void;
}

export const useUiStore = create<State>()((set) => ({
  isSideBarMenuOpen: false,

  openSideBarMenu: () => set({ isSideBarMenuOpen: true }),

  closeSideBarMenu: () => set({ isSideBarMenuOpen: false }),
}));

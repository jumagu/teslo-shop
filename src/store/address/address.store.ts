import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    addressLineTwo?: string;
    zipCode: string;
    city: string;
    country: string;
    mobilePhoneNumber: string;
    rememberAddress: boolean;
  };

  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        addressLineTwo: "",
        zipCode: "",
        city: "",
        country: "",
        mobilePhoneNumber: "",
        rememberAddress: false,
      },

      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address",
    }
  )
);

"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type JewelleryStore = {
  wishlist: string[];
  enquiryBag: string[];
  bagOpen: boolean;
  toggleWishlist: (productId: string) => void;
  addToBag: (productId: string) => void;
  removeFromBag: (productId: string) => void;
  setBagOpen: (open: boolean) => void;
};

export const useJewelleryStore = create<JewelleryStore>()(
  persist(
    (set) => ({
      wishlist: [],
      enquiryBag: [],
      bagOpen: false,
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
      addToBag: (productId) =>
        set((state) => ({
          enquiryBag: state.enquiryBag.includes(productId)
            ? state.enquiryBag
            : [...state.enquiryBag, productId],
          bagOpen: true,
        })),
      removeFromBag: (productId) =>
        set((state) => ({
          enquiryBag: state.enquiryBag.filter((id) => id !== productId),
        })),
      setBagOpen: (open) => set({ bagOpen: open }),
    }),
    {
      name: "sri-meena-jewellery",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        wishlist: state.wishlist,
        enquiryBag: state.enquiryBag,
      }),
    },
  ),
);

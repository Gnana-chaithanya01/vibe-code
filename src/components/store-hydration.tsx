"use client";

import { useEffect } from "react";
import { useJewelleryStore } from "@/lib/store";

export function StoreHydration() {
  useEffect(() => {
    void useJewelleryStore.persist.rehydrate();
  }, []);

  return null;
}

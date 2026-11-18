"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useJewelleryStore } from "@/lib/store";

export function ProductActions({ productId }: { productId: string }) {
  const inBag = useJewelleryStore((state) =>
    state.enquiryBag.includes(productId),
  );
  const addToBag = useJewelleryStore((state) => state.addToBag);

  return (
    <button
      className="product-add-to-bag"
      onClick={() => addToBag(productId)}
      type="button"
    >
      {inBag ? <Check aria-hidden="true" size={16} /> : <ShoppingBag aria-hidden="true" size={16} />}
      {inBag ? "Added to enquiry bag" : "Add to enquiry bag"}
    </button>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useJewelleryStore } from "@/lib/store";

const EnquiryBag = dynamic(
  () => import("@/components/enquiry-bag").then((module) => module.EnquiryBag),
  { ssr: false },
);

export function GlobalEnquiryBag() {
  const isOpen = useJewelleryStore((state) => state.bagOpen);

  return isOpen ? <EnquiryBag /> : null;
}

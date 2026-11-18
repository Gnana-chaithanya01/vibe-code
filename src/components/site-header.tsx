"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import { shop } from "@/config/shop";
import { useJewelleryStore } from "@/lib/store";

const SearchPalette = dynamic(
  () => import("@/components/search-palette").then((module) => module.SearchPalette),
  { ssr: false },
);

const navigation = [
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/#about" },
  { label: "Visit Us", href: "/#visit" },
];

export function SiteHeader() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const bagCount = useJewelleryStore((state) => state.enquiryBag.length);
  const setBagOpen = useJewelleryStore((state) => state.setBagOpen);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
        progressRef.current?.style.setProperty(
          "transform",
          `scaleX(${progress})`,
        );
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="scroll-progress"
        ref={progressRef}
        style={{ transform: "scaleX(0)" }}
      />
      <header className="site-header">
        <Link className="wordmark" href="/">
          <span>Sri Meena</span>
          <span>Jewellers</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            aria-label="Search jewellery"
            className="header-icon-button"
            onClick={() => setSearchOpen(true)}
            type="button"
          >
            <Search aria-hidden="true" size={17} strokeWidth={1.5} />
          </button>
          <button
            aria-label={`Open enquiry bag${bagCount ? `, ${bagCount} items` : ""}`}
            className="header-icon-button header-bag-button"
            onClick={() => setBagOpen(true)}
            type="button"
          >
            <ShoppingBag aria-hidden="true" size={17} strokeWidth={1.5} />
            {bagCount > 0 && <span>{bagCount}</span>}
          </button>
          <a
            className="header-whatsapp"
            href={shop.whatsapp}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
      </header>
      {searchOpen && (
        <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
      )}
    </>
  );
}

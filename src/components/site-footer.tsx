"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PatternDivider } from "@/components/pattern-divider";
import { shop } from "@/config/shop";

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          footer.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      <PatternDivider />
      <div className="footer-details">
        <div className="footer-contact">
          <span className="eyebrow">Find us</span>
          <p>{shop.address}</p>
          <a href={`tel:${shop.phone.replaceAll(" ", "")}`}>{shop.phone}</a>
          <a href={shop.whatsapp} rel="noreferrer" target="_blank">WhatsApp us</a>
        </div>
        <div className="footer-hours">
          <span className="eyebrow">Visit</span>
          {shop.hours.map((entry) => (
            <p key={entry.days}>
              <span>{entry.days}</span>
              <span>{entry.hours}</span>
            </p>
          ))}
        </div>
        <nav aria-label="Footer navigation" className="footer-links">
          <span className="eyebrow">Explore</span>
          <Link href="/#collections">Collections</Link>
          <Link href="/#about">Our story</Link>
          <Link href="/#custom-designs">Custom designs</Link>
          <Link href="/#visit">Visit us</Link>
        </nav>
      </div>
      <Link aria-label={`${shop.name} home`} className="footer-wordmark" href="/">
        Sri Meena Jewellers
      </Link>
      <div className="footer-legal">
        <span>© 2026 {shop.name}</span>
        <span>Timeless Indian Jewellery</span>
      </div>
    </footer>
  );
}

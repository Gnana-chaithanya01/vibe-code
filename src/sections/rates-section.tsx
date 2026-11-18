"use client";

import { useEffect, useRef } from "react";
import { shop } from "@/config/shop";

const formatRupees = (value: number) =>
  `₹ ${Math.round(value).toLocaleString("en-IN")}`;

export function RatesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rates = [
      { selector: "[data-rate='22k']", value: shop.goldRates.twentyTwoK },
      { selector: "[data-rate='24k']", value: shop.goldRates.twentyFourK },
    ];
    let frame = 0;
    let startTime = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          rates.forEach(({ selector, value }) => {
            const element = section.querySelector(selector);
            if (element) element.textContent = formatRupees(value);
          });
          return;
        }

        const tick = (time: number) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / 1300, 1);
          const eased = 1 - (1 - progress) ** 3;
          rates.forEach(({ selector, value }) => {
            const element = section.querySelector(selector);
            if (element) {
              element.textContent = formatRupees(value * eased);
            }
          });
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      aria-labelledby="rates-heading"
      className="rates-section"
      id="gold-rates"
      ref={sectionRef}
    >
      <div className="rates-intro">
        <span className="eyebrow">A considered beginning</span>
        <h2 id="rates-heading">Today&apos;s gold guide.</h2>
        <p>Indicative sample rates · {shop.goldRates.lastUpdated}</p>
      </div>
      <div className="rates-grid">
        <div>
          <span className="eyebrow">22 karat</span>
          <p data-rate="22k">{formatRupees(shop.goldRates.twentyTwoK)}</p>
          <span className="rate-unit">per gram</span>
        </div>
        <div>
          <span className="eyebrow">24 karat</span>
          <p data-rate="24k">{formatRupees(shop.goldRates.twentyFourK)}</p>
          <span className="rate-unit">per gram</span>
        </div>
      </div>
      <p className="rates-note">
        Jewellery pricing is based on the day&apos;s gold rate, net weight,
        making charges and applicable taxes.
      </p>
    </section>
  );
}

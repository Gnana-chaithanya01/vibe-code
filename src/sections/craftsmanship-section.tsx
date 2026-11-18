"use client";

import { useRef } from "react";
import { useDesktopGSAP } from "@/lib/animations/use-desktop-gsap";

const assurances = [
  "Hallmarked",
  "Custom Designs",
  "Fair Pricing",
  "Lifetime Exchange",
];

export function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useDesktopGSAP(sectionRef, (gsap, ScrollTrigger) => {
    const marquee = sectionRef.current?.querySelector<HTMLElement>(
      ".craft-marquee-track",
    );
    if (!marquee) return;

    const animation = gsap.to(marquee, {
      xPercent: -50,
      duration: 26,
      repeat: -1,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        animation.timeScale(
          1 + Math.min(Math.abs(self.getVelocity()) / 5000, 0.65),
        );
      },
    });
  });

  return (
    <section
      aria-labelledby="assurances-heading"
      className="craftsmanship-section"
      ref={sectionRef}
    >
      <h2 className="sr-only" id="assurances-heading">Our assurances</h2>
      <div className="craft-marquee-track">
        {[0, 1, 2, 3].map((repeat) =>
          assurances.map((item) => (
            <span aria-hidden={repeat > 0} key={`${repeat}-${item}`}>
              {item} <i aria-hidden="true">✳</i>
            </span>
          )),
        )}
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useDesktopGSAP } from "@/lib/animations/use-desktop-gsap";

const words =
  "Some things are chosen for the moment. The pieces we treasure become a part of every moment that follows.";

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useDesktopGSAP(sectionRef, (gsap) => {
    gsap.fromTo(
      ".statement-word",
      { opacity: 0.65 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          end: "bottom 48%",
          scrub: true,
        },
      },
    );
  });

  return (
    <section
      aria-labelledby="statement-heading"
      className="statement-section"
      ref={sectionRef}
    >
      <span className="eyebrow">A thought to keep</span>
      <h2 className="statement-copy" id="statement-heading">
        {words.split(" ").map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="statement-word">{word}</span>{" "}
          </span>
        ))}
      </h2>
    </section>
  );
}

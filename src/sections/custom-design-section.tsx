"use client";

import { useRef } from "react";
import { useDesktopGSAP } from "@/lib/animations/use-desktop-gsap";

const steps = [
  { title: "Share an idea", detail: "Bring a sketch, a thought or a feeling." },
  { title: "We design", detail: "Together, we shape the details." },
  { title: "You wear it", detail: "A personal piece, made to be yours." },
];

export function CustomDesignSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useDesktopGSAP(sectionRef, (gsap) => {
    gsap.fromTo(
      ".custom-progress-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 60%",
          scrub: true,
        },
      },
    );
  });

  return (
    <section
      aria-labelledby="custom-heading"
      className="custom-section"
      id="custom-designs"
      ref={sectionRef}
    >
      <div className="section-heading">
        <span className="eyebrow">Made for you</span>
        <h2 id="custom-heading">Your idea, made personal.</h2>
      </div>
      <div className="custom-steps">
        <div className="custom-progress-line" aria-hidden="true" />
        {steps.map((step, index) => (
          <article className="custom-step" key={step.title}>
            <span className="custom-step-index">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </article>
        ))}
      </div>
      <a className="text-link" href="#visit">
        Begin a conversation <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

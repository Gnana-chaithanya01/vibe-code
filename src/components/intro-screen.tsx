"use client";

import { useEffect, useState } from "react";
import { shop } from "@/config/shop";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storageKey = "sri-meena-intro-seen";
    if (window.sessionStorage.getItem(storageKey)) {
      const frame = window.requestAnimationFrame(() => {
        setVisible(false);
        setReady(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.sessionStorage.setItem(storageKey, "true");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const frame = window.requestAnimationFrame(() => setReady(true));
    const timeout = window.setTimeout(
      () => setVisible(false),
      reducedMotion ? 450 : 1650,
    );

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Welcome to Sri Meena Jewellers"
      className={`intro-screen${ready ? " intro-screen--ready" : ""}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="intro-rule" />
      <p className="intro-wordmark" aria-label={shop.name}>
        {shop.name.split("").map((letter, index) => (
          <span key={`${letter}-${index}`} style={{ "--letter-index": index } as React.CSSProperties}>
            {letter === " " ? "\u00a0" : letter}
          </span>
        ))}
      </p>
      <p className="intro-tagline">{shop.tagline}</p>
      <button
        className="intro-skip"
        onClick={() => setVisible(false)}
        type="button"
      >
        Skip
      </button>
    </div>
  );
}

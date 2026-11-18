"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

type AnimationSetup = (
  gsap: typeof import("gsap").default,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger,
) => void;

export function useDesktopGSAP(
  scopeRef: RefObject<HTMLElement | null>,
  setup: AnimationSetup,
) {
  const setupRef = useRef(setup);
  useLayoutEffect(() => {
    setupRef.current = setup;
  });

  useEffect(() => {
    const lowPower =
      "deviceMemory" in navigator &&
      typeof navigator.deviceMemory === "number" &&
      navigator.deviceMemory <= 4;
    if (lowPower) return;
    const media = window.matchMedia(
      "(min-width: 760px) and (prefers-reduced-motion: no-preference)",
    );
    let active = true;
    let generation = 0;
    let revert: (() => void) | undefined;

    const stop = () => {
      generation += 1;
      revert?.();
      revert = undefined;
    };
    const start = async () => {
      if (!media.matches || revert) return;
      const currentGeneration = ++generation;
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!active || !media.matches || currentGeneration !== generation) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(
        () => setupRef.current(gsap, ScrollTrigger),
        scopeRef.current ?? undefined,
      );
      revert = () => context.revert();
    };
    const update = () => {
      stop();
      void start();
    };

    media.addEventListener("change", update);
    void start();
    return () => {
      active = false;
      media.removeEventListener("change", update);
      stop();
    };
  }, [scopeRef]);
}

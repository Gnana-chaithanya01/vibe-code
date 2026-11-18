"use client";

import { useEffect } from "react";

export function SmoothScroll() {
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
    let running = false;
    let cleanup = () => {};

    const stop = () => {
      generation += 1;
      cleanup();
      cleanup = () => {};
    };
    const start = async () => {
      if (!media.matches || running) return;
      const currentGeneration = ++generation;
      const [lenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!active || !media.matches || currentGeneration !== generation) return;

      const Lenis = lenisModule.default;
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ autoRaf: false, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);

      // GSAP reports ticker time in seconds; Lenis expects milliseconds.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      running = true;
      cleanup = () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        running = false;
      };
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
  }, []);

  return null;
}

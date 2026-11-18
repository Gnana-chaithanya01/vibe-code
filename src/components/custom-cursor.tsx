"use client";

import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lowPower =
      "deviceMemory" in navigator &&
      typeof navigator.deviceMemory === "number" &&
      navigator.deviceMemory <= 4;
    if (!window.matchMedia("(pointer: fine)").matches || reducedMotion || lowPower) {
      return;
    }

    const cursor = document.createElement("span");
    cursor.className = "custom-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.append(cursor);

    const updatePosition = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.style.opacity = "1";
      const target = event.target;
      const isImage =
        target instanceof Element &&
        Boolean(
          target.closest(
            ".hero-image-main, .hero-image-secondary, .collection-image, .featured-image, .product-card__visual, .product-gallery__main, .about-image",
          ),
        );
      cursor.classList.toggle("is-over-image", isImage);
    };

    const hideCursor = () => {
      cursor.style.opacity = "0";
    };

    window.addEventListener("pointermove", updatePosition, { passive: true });
    document.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", updatePosition);
      document.removeEventListener("pointerleave", hideCursor);
      cursor.remove();
    };
  }, []);

  return null;
}

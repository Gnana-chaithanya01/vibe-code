"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { images } from "@/config/images";
import { useDesktopGSAP } from "@/lib/animations/use-desktop-gsap";

const collections = [
  "Gold",
  "Diamond",
  "Silver",
  "Bridal",
  "Jhumkas & Earrings",
  "Custom Designs",
];

export function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = sectionRef.current?.querySelector<HTMLElement>(
      ".collection-track",
    );
    const progress = sectionRef.current?.querySelector<HTMLElement>(
      ".collection-progress span",
    );
    if (!track || !progress) return;

    const updateProgress = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      progress.style.transform = `scaleX(${maxScroll > 0 ? track.scrollLeft / maxScroll : 0})`;
    };

    track.addEventListener("scroll", updateProgress, { passive: true });
    return () => track.removeEventListener("scroll", updateProgress);
  }, []);

  useDesktopGSAP(sectionRef, (gsap) => {
    const track = sectionRef.current?.querySelector<HTMLElement>(
      ".collection-track",
    );
    const progress = sectionRef.current?.querySelector<HTMLElement>(
      ".collection-progress span",
    );
    if (!track || !progress) return;

    const distance = () => {
      const section = sectionRef.current;
      if (!section) return 0;
      const styles = getComputedStyle(section);
      const horizontalPadding =
        Number.parseFloat(styles.paddingLeft) +
        Number.parseFloat(styles.paddingRight);
      const visibleWidth = section.clientWidth - horizontalPadding;
      return Math.max(0, track.scrollWidth - visibleWidth);
    };
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.style.transform = `scaleX(${self.progress})`;
        },
      },
    });
  });

  return (
    <section
      aria-labelledby="collections-heading"
      className="collections-section"
      id="collections"
      ref={sectionRef}
    >
      <div className="section-heading collections-heading">
        <span className="eyebrow">Explore the edit</span>
        <h2 id="collections-heading">Find your kind of forever.</h2>
      </div>
      <div className="collection-track">
        {collections.map((collection, index) => (
          <a
            className="collection-card"
            href="#catalogue"
            key={collection}
          >
            <div className="collection-image">
              <Image
                alt={`${collection} jewellery collection`}
                blurDataURL={images.blurDataURL}
                fill
                placeholder="blur"
                sizes="(max-width: 759px) 76vw, 42vw"
                src={images.collections[index]}
              />
            </div>
            <span className="collection-index">0{index + 1}</span>
            <span className="collection-name">{collection}</span>
          </a>
        ))}
      </div>
      <div className="collection-progress" aria-hidden="true">
        <span />
      </div>
      <p className="collection-swipe-note">Swipe to explore</p>
    </section>
  );
}

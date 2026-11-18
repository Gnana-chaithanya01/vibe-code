"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { images } from "@/config/images";
import { useDesktopGSAP } from "@/lib/animations/use-desktop-gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useDesktopGSAP(sectionRef, (gsap) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=70%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    timeline
      .fromTo(
        ".hero-image-main img",
        { scale: 1.07, yPercent: 3 },
        { scale: 1, yPercent: -2, ease: "none" },
        0,
      )
      .fromTo(
        ".hero-image-secondary",
        { xPercent: 10, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "none" },
        0.2,
      )
      .to(".hero-scroll-cue", { opacity: 0, ease: "none" }, 0.25);

    gsap.fromTo(
      ".hero-title-line > span",
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.08,
      },
    );
  });

  return (
    <section aria-labelledby="hero-heading" className="hero-section" ref={sectionRef}>
      <div className="hero-copy">
        <span className="eyebrow hero-eyebrow">Dilsukhnagar · Hyderabad</span>
        <h1 id="hero-heading" className="hero-heading">
          <span className="hero-title-line"><span>Timeless Indian</span></span>
          <span className="hero-title-line"><span>Jewellery,</span></span>
          <span className="hero-title-line"><span>Crafted with Care</span></span>
        </h1>
        <p className="hero-description">
          A thoughtful collection for the moments that become part of your
          story.
        </p>
        <a className="text-link" href="#collections">
          Explore the collections <span aria-hidden="true">↗</span>
        </a>
        <div className="hero-scroll-cue" aria-hidden="true">
          <span>Scroll to discover</span>
          <ArrowDown size={15} strokeWidth={1} />
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-main">
          <Image
            alt="A close view of a gold jewellery piece"
            className="hero-image"
            blurDataURL={images.blurDataURL}
            fill
            fetchPriority="high"
            priority
            placeholder="blur"
            sizes="(max-width: 759px) 100vw, 52vw"
            src={images.hero.primary}
            unoptimized
          />
        </div>
        <div className="hero-image-secondary">
          <Image
            alt="Intricate Indian earrings in warm gold"
            blurDataURL={images.blurDataURL}
            fill
            placeholder="blur"
            sizes="(max-width: 759px) 32vw, 17vw"
            src={images.hero.secondary}
          />
        </div>
        <span className="hero-image-caption">An heirloom in the making</span>
      </div>
    </section>
  );
}

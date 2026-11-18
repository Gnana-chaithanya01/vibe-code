"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/config/images";

const pieces = [
  {
    name: "Temple Bloom Necklace",
    metal: "Gold 22K",
    weight: "18.4 g",
    purity: "22K · 916",
    making: "12%",
    price: "₹ 1,62,400 approx.",
  },
  {
    name: "Everyday Halo Studs",
    metal: "Gold 18K",
    weight: "3.2 g",
    purity: "18K · 750",
    making: "10%",
    price: "₹ 31,800 approx.",
  },
  {
    name: "Saanvi Silver Jhumkas",
    metal: "Silver",
    weight: "12.6 g",
    purity: "92.5%",
    making: "15%",
    price: "₹ 8,900 approx.",
  },
];

export function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pieces = Array.from(
      section.querySelectorAll<HTMLElement>(".featured-piece"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const closest = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          )[0];
        const index = closest
          ? pieces.findIndex((piece) => piece === closest.target)
          : -1;
        if (index >= 0) setActiveIndex(index);
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );

    pieces.forEach((piece) => observer.observe(piece));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="featured-heading"
      className="featured-section"
      id="featured"
      ref={sectionRef}
    >
      <div className="section-heading">
        <span className="eyebrow">The considered edit</span>
        <h2 id="featured-heading">A few pieces, chosen with care.</h2>
      </div>
      <div className="featured-layout">
        <div className="featured-media">
          <div className="featured-image">
            <Image
              alt={`${pieces[activeIndex].name}, a sample jewellery design`}
              blurDataURL={images.blurDataURL}
              fill
              placeholder="blur"
              priority={false}
              sizes="(max-width: 759px) 100vw, 48vw"
              src={images.products[activeIndex]}
            />
          </div>
          <span className="featured-counter">
            0{activeIndex + 1} <span>/ 03</span>
          </span>
        </div>
        <div className="featured-list">
          {pieces.map((piece, index) => (
            <article
              className={`featured-piece${activeIndex === index ? " is-active" : ""}`}
              key={piece.name}
            >
              <span className="eyebrow">Featured sample · 0{index + 1}</span>
              <h3>{piece.name}</h3>
              <p className="featured-metal">{piece.metal}</p>
              <dl className="featured-details">
                <div><dt>Weight</dt><dd>{piece.weight}</dd></div>
                <div><dt>Purity</dt><dd>{piece.purity}</dd></div>
                <div><dt>Making charges</dt><dd>{piece.making}</dd></div>
                <div><dt>Approximate price</dt><dd>{piece.price}</dd></div>
              </dl>
            </article>
          ))}
          <a className="text-link" href="#catalogue">
            View the catalogue <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

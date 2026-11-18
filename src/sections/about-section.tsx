import Image from "next/image";
import { images } from "@/config/images";

export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="about-section" id="about">
      <div className="about-copy">
        <span className="eyebrow">Rooted in Dilsukhnagar</span>
        <h2 id="about-heading">Tradition, held close.</h2>
        <p>
          Sri Meena Jewellers brings together the enduring beauty of Indian
          jewellery and the personal touch of a neighbourhood store.
        </p>
        <p>
          From everyday favourites to occasion pieces and custom designs, each
          visit begins with listening to what matters to you.
        </p>
        <a className="text-link" href="#visit">
          Visit our store <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="about-image">
        <Image
          alt="A carefully crafted jewellery detail"
          blurDataURL={images.blurDataURL}
          fill
          placeholder="blur"
          sizes="(max-width: 759px) 100vw, 46vw"
          src={images.about}
        />
      </div>
    </section>
  );
}

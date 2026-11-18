"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { images } from "@/config/images";
import { useJewelleryStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const isWishlisted = useJewelleryStore((state) =>
    state.wishlist.includes(product.id),
  );
  const toggleWishlist = useJewelleryStore((state) => state.toggleWishlist);
  const addToBag = useJewelleryStore((state) => state.addToBag);

  return (
    <article className="product-card">
      <div className="product-card__visual">
        <Link
          aria-label={`View ${product.name}`}
          className="product-card__image-link"
          href={`/product/${product.slug}`}
        >
          <div className="product-card__image product-card__image--first">
            <Image
              alt={`${product.name}, front view`}
              blurDataURL={images.blurDataURL}
              fill
              placeholder="blur"
              sizes="(max-width: 700px) 48vw, (max-width: 1199px) 31vw, 23vw"
              src={product.images[0]}
            />
          </div>
          <div className="product-card__image product-card__image--second">
            <Image
              alt={`${product.name}, alternate view`}
              blurDataURL={images.blurDataURL}
              fill
              placeholder="blur"
              sizes="(max-width: 700px) 48vw, (max-width: 1199px) 31vw, 23vw"
              src={product.images[1]}
            />
          </div>
        </Link>
        <button
          aria-label={`${isWishlisted ? "Remove from" : "Add to"} wishlist: ${product.name}`}
          aria-pressed={isWishlisted}
          className={`product-wishlist${isWishlisted ? " is-active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          type="button"
        >
          <Heart aria-hidden="true" size={17} strokeWidth={1.4} />
        </button>
      </div>
      <div className="product-card__info">
        <Link className="product-card__title" href={`/product/${product.slug}`}>
          {product.name}
        </Link>
        <p>{product.metal} <span>·</span> {product.weightGrams} g</p>
        <span className="product-card__price">
          ₹ {product.approxPriceINR.toLocaleString("en-IN")} approx.
        </span>
        <button
          className="product-enquire"
          onClick={() => addToBag(product.id)}
          type="button"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}

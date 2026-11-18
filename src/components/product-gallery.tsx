"use client";

import Image from "next/image";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "motion/react";
import { images as imageConfig } from "@/config/images";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const showImage = (index: number) => {
    setActiveImage((index + images.length) % images.length);
  };

  return (
    <div className="product-gallery">
      <div
        className="product-gallery__main"
        onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
        onTouchEnd={(event) => {
          if (touchStart === null) return;
          const delta = event.changedTouches[0]?.clientX ?? touchStart;
          if (Math.abs(delta - touchStart) > 40) {
            showImage(activeImage + (delta < touchStart ? 1 : -1));
          }
          setTouchStart(null);
        }}
      >
        <motion.button
          aria-label={`Zoom ${name} image`}
          className="product-gallery__zoom"
          key={images[activeImage]}
          onClick={() => setZoomOpen(true)}
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            alt={`${name}, image ${activeImage + 1}`}
            blurDataURL={imageConfig.blurDataURL}
            fill
            loading="eager"
            priority
            placeholder="blur"
            sizes="(max-width: 759px) 100vw, 55vw"
            src={images[activeImage]}
          />
          <span>Tap to zoom</span>
        </motion.button>
        <button
          aria-label="Previous product image"
          className="product-gallery__arrow product-gallery__arrow--previous"
          onClick={() => showImage(activeImage - 1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={18} />
        </button>
        <button
          aria-label="Next product image"
          className="product-gallery__arrow product-gallery__arrow--next"
          onClick={() => showImage(activeImage + 1)}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </div>
      <div aria-label="Choose image" className="product-gallery__thumbs" role="group">
        {images.map((image, index) => (
          <button
            aria-label={`Show product image ${index + 1}`}
            aria-pressed={activeImage === index}
            className={activeImage === index ? "is-active" : ""}
            key={image}
            onClick={() => showImage(index)}
            type="button"
          >
            <Image
              alt=""
              blurDataURL={imageConfig.blurDataURL}
              fill
              placeholder="blur"
              sizes="90px"
              src={image}
            />
          </button>
        ))}
      </div>
      <Dialog.Root onOpenChange={setZoomOpen} open={zoomOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="zoom-overlay" />
          <Dialog.Content className="zoom-content">
            <Dialog.Title className="sr-only">{name} image</Dialog.Title>
            <Dialog.Close aria-label="Close zoomed image" className="zoom-close">
              <X aria-hidden="true" size={20} />
            </Dialog.Close>
            <div className="zoom-image">
              <Image
                alt={`${name}, enlarged image`}
                blurDataURL={imageConfig.blurDataURL}
                fill
                placeholder="blur"
                sizes="100vw"
                src={images[activeImage]}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

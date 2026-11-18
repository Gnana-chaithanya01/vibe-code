"use client";

import Link from "next/link";
import { useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Minus, X } from "lucide-react";
import { products } from "@/data/products";
import { shop } from "@/config/shop";
import { useJewelleryStore } from "@/lib/store";

export function EnquiryBag() {
  const open = useJewelleryStore((state) => state.bagOpen);
  const itemIds = useJewelleryStore((state) => state.enquiryBag);
  const removeFromBag = useJewelleryStore((state) => state.removeFromBag);
  const setBagOpen = useJewelleryStore((state) => state.setBagOpen);
  const items = useMemo(
    () => itemIds.flatMap((id) => products.filter((product) => product.id === id)),
    [itemIds],
  );
  const message = [
    "Hello, I would like to enquire about:",
    ...items.map((product) => `• ${product.name} — ${product.weightGrams} g`),
  ].join("\n");
  const whatsappUrl = `${shop.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <Dialog.Root onOpenChange={setBagOpen} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content aria-describedby="enquiry-bag-description" className="enquiry-sheet">
          <div className="enquiry-sheet__header">
            <div>
              <span className="eyebrow">A personal selection</span>
              <Dialog.Title>Enquiry bag</Dialog.Title>
              <Dialog.Description id="enquiry-bag-description">
                Your chosen pieces, ready to discuss with us.
              </Dialog.Description>
            </div>
            <Dialog.Close aria-label="Close enquiry bag" className="sheet-close">
              <X aria-hidden="true" size={18} />
            </Dialog.Close>
          </div>
          {items.length > 0 ? (
            <>
              <div className="enquiry-items">
                {items.map((product) => (
                  <article className="enquiry-item" key={product.id}>
                    <div className="enquiry-item__copy">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => setBagOpen(false)}
                      >
                        {product.name}
                      </Link>
                      <p>{product.metal} · {product.weightGrams} g</p>
                      <span>₹ {product.approxPriceINR.toLocaleString("en-IN")} approx.</span>
                    </div>
                    <button
                      aria-label={`Remove ${product.name} from enquiry bag`}
                      onClick={() => removeFromBag(product.id)}
                      type="button"
                    >
                      <Minus aria-hidden="true" size={14} />
                    </button>
                  </article>
                ))}
              </div>
              <a className="enquiry-send" href={whatsappUrl} rel="noreferrer" target="_blank">
                Send on WhatsApp <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </>
          ) : (
            <div className="enquiry-empty">
              <p>Your enquiry bag is ready for a piece you love.</p>
              <button onClick={() => setBagOpen(false)} type="button">
                Continue exploring <ArrowUpRight aria-hidden="true" size={14} />
              </button>
            </div>
          )}
          <p className="enquiry-footnote">
            No online payment. We&apos;ll confirm availability and final pricing at the store.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

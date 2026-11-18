import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { products } from "@/data/products";
import { shop } from "@/config/shop";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

const formatPrice = (value: number) =>
  `₹ ${Math.round(value).toLocaleString("en-IN")}`;

function getPriceBreakdown(product: (typeof products)[number]) {
  const baseValue =
    product.approxPriceINR /
    ((1 + product.makingChargesPercent / 100) * (1 + 0.03));
  const makingCharges = baseValue * (product.makingChargesPercent / 100);
  const gst = (baseValue + makingCharges) * 0.03;

  return {
    baseValue: Math.round(baseValue),
    makingCharges: Math.round(makingCharges),
    gst: Math.round(gst),
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: shop.name };

  return {
    title: `${product.name} | ${shop.name}`,
    description: product.description,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const breakdown = getPriceBreakdown(product);
  const similarProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);
  const productMessage = `Hello, I would like to enquire about ${product.name} (${product.weightGrams} g).`;
  const whatsappUrl = `${shop.whatsapp}?text=${encodeURIComponent(productMessage)}`;

  return (
    <main className="product-page">
      <div className="product-breadcrumb">
        <Link href="/#catalogue"><ArrowLeft aria-hidden="true" size={14} /> Back to catalogue</Link>
        <span>{product.category}</span>
      </div>
      <div className="product-detail-layout">
        <ProductGallery name={product.name} images={product.images} />
        <div className="product-detail-copy">
          <span className="eyebrow">{product.metal} · {product.purity}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">
            {formatPrice(product.approxPriceINR)} <span>approx.</span>
          </p>
          <p className="product-detail-sample">
            SAMPLE design · Confirm the final price in store
          </p>

          <dl className="product-specifications">
            <div><dt>Metal</dt><dd>{product.metal}</dd></div>
            <div><dt>Weight</dt><dd>{product.weightGrams} g</dd></div>
            <div><dt>Purity</dt><dd>{product.purity}</dd></div>
            <div><dt>Customisable</dt><dd>{product.customisable ? "Yes" : "No"}</dd></div>
          </dl>

          <div className="price-breakdown">
            <h2>Approximate price breakdown</h2>
            <dl>
              <div>
                <dt>{product.metal === "Diamond" ? "Metal & stones value" : "Gold / metal value"}</dt>
                <dd>{formatPrice(breakdown.baseValue)}</dd>
              </div>
              <div>
                <dt>Making charges ({product.makingChargesPercent}%)</dt>
                <dd>{formatPrice(breakdown.makingCharges)}</dd>
              </div>
              <div>
                <dt>GST (3%)</dt>
                <dd>{formatPrice(breakdown.gst)}</dd>
              </div>
              <div className="price-breakdown__total">
                <dt>Approximate total</dt>
                <dd>{formatPrice(product.approxPriceINR)}</dd>
              </div>
            </dl>
          </div>

          <div className="product-detail-actions">
            <ProductActions productId={product.id} />
            <a className="product-whatsapp-link" href={whatsappUrl} rel="noreferrer" target="_blank">
              Enquire on WhatsApp <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <Link className="product-visit-link" href="/#visit">
              Visit Store
            </Link>
          </div>
          <p className="product-care-note">
            <strong>Purity & care</strong>
            <span>
              Purity and weight are indicative for this sample. Keep jewellery
              away from perfume and moisture, and store it separately when not
              in use.
            </span>
          </p>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <section aria-labelledby="related-heading" className="related-products">
          <div className="section-heading">
            <span className="eyebrow">From the same edit</span>
            <h2 id="related-heading">You may also like.</h2>
          </div>
          <div className="product-grid">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

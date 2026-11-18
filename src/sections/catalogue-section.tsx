"use client";

import { useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products, type ProductCategory, type ProductMetal } from "@/data/products";

const categories = [
  "All",
  "Gold",
  "Diamond",
  "Silver",
  "Bridal",
  "Jhumkas & Earrings",
  "Custom Designs",
] as const;

const metals = ["All", "Gold 22K", "Gold 18K", "Silver", "Diamond"] as const;
const priceCeiling = 300000;

type CategoryFilter = (typeof categories)[number];
type MetalFilter = (typeof metals)[number];
type SortOrder = "featured" | "low-high" | "high-low" | "newest";

export function CatalogueSection() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [metal, setMetal] = useState<MetalFilter>("All");
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [sort, setSort] = useState<SortOrder>("featured");

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === (category as ProductCategory);
      const matchesMetal =
        metal === "All" || product.metal === (metal as ProductMetal);

      return (
        matchesCategory &&
        matchesMetal &&
        product.approxPriceINR <= maxPrice
      );
    });

    if (sort === "low-high") {
      matches.sort((a, b) => a.approxPriceINR - b.approxPriceINR);
    } else if (sort === "high-low") {
      matches.sort((a, b) => b.approxPriceINR - a.approxPriceINR);
    } else if (sort === "newest") {
      matches.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }

    return matches;
  }, [category, maxPrice, metal, sort]);

  const activeFilters =
    Number(category !== "All") +
    Number(metal !== "All") +
    Number(maxPrice < priceCeiling) +
    Number(sort !== "featured");

  const clearFilters = () => {
    setCategory("All");
    setMetal("All");
    setMaxPrice(priceCeiling);
    setSort("featured");
  };

  return (
    <section
      aria-labelledby="catalogue-heading"
      className="catalogue-section"
      id="catalogue"
    >
      <div className="section-heading catalogue-heading">
        <span className="eyebrow">The jewellery edit</span>
        <h2 id="catalogue-heading">Pieces to make your own.</h2>
        <p>Thoughtful designs for every day, every occasion and every story.</p>
      </div>

      <div className="catalogue-filter-bar">
        <Tabs.Root
          className="category-tabs"
          onValueChange={(value) => {
            if (categories.some((item) => item === value)) {
              setCategory(value as CategoryFilter);
            }
          }}
          value={category}
        >
          <Tabs.List aria-label="Filter by category" className="category-tab-list">
            {categories.map((item) => (
              <Tabs.Trigger
                className="category-tab"
                key={item}
                value={item}
              >
                {item}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {categories.map((item) => (
            <Tabs.Content className="sr-only" key={item} value={item}>
              Showing {item === "All" ? "all" : item} sample jewellery.
            </Tabs.Content>
          ))}
        </Tabs.Root>

        <div className="catalogue-filter-controls">
          <Select.Root
            onValueChange={(value) => {
              if (metals.some((item) => item === value)) {
                setMetal(value as MetalFilter);
              }
            }}
            value={metal}
          >
            <Select.Trigger aria-label="Filter by metal" className="filter-select">
              <Select.Value />
              <Select.Icon><ChevronDown aria-hidden="true" size={14} /></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="select-content" position="popper">
                <Select.Viewport>
                  {metals.map((item) => (
                    <Select.Item className="select-item" key={item} value={item}>
                      <Select.ItemText>{item === "All" ? "All metals" : item}</Select.ItemText>
                      <Select.ItemIndicator><Check aria-hidden="true" size={13} /></Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <label className="price-filter">
            <span>Up to ₹ {maxPrice.toLocaleString("en-IN")}</span>
            <input
              aria-label="Maximum approximate price"
              max={priceCeiling}
              min="5000"
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              step="5000"
              type="range"
              value={maxPrice}
            />
          </label>

          <Select.Root
            onValueChange={(value) => setSort(value as SortOrder)}
            value={sort}
          >
            <Select.Trigger aria-label="Sort products" className="filter-select">
              <Select.Value />
              <Select.Icon><ChevronDown aria-hidden="true" size={14} /></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="select-content" position="popper">
                <Select.Viewport>
                  <Select.Item className="select-item" value="featured">
                    <Select.ItemText>Featured</Select.ItemText>
                    <Select.ItemIndicator><Check aria-hidden="true" size={13} /></Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item className="select-item" value="low-high">
                    <Select.ItemText>Price: low to high</Select.ItemText>
                    <Select.ItemIndicator><Check aria-hidden="true" size={13} /></Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item className="select-item" value="high-low">
                    <Select.ItemText>Price: high to low</Select.ItemText>
                    <Select.ItemIndicator><Check aria-hidden="true" size={13} /></Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item className="select-item" value="newest">
                    <Select.ItemText>Newest</Select.ItemText>
                    <Select.ItemIndicator><Check aria-hidden="true" size={13} /></Select.ItemIndicator>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      <div className="catalogue-result-row">
        <p aria-live="polite">{filteredProducts.length} sample designs</p>
        <button
          className="clear-filters"
          disabled={activeFilters === 0}
          onClick={clearFilters}
          type="button"
        >
          {activeFilters > 0 && <span>{activeFilters}</span>}
          Clear filters <X aria-hidden="true" size={13} />
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <motion.div className="product-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                initial={{ opacity: 0, y: 14 }}
                key={product.id}
                layout
                transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.2) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="catalogue-empty">
          <p>No sample pieces match those filters.</p>
          <button className="text-link" onClick={clearFilters} type="button">
            Clear filters <X aria-hidden="true" size={13} />
          </button>
        </div>
      )}

      <p className="catalogue-note">
        Prices are approximate and change with the daily gold rate. Final price
        is confirmed at the store.
      </p>
    </section>
  );
}

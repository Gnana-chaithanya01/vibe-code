"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/data/products";

type SearchPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchPalette({ open, onOpenChange }: SearchPaletteProps) {
  const router = useRouter();

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="search-overlay" />
        <Dialog.Content className="search-dialog">
          <Dialog.Title className="sr-only">Search jewellery</Dialog.Title>
          <Command label="Search jewellery" className="search-command">
            <div className="search-input-wrap">
              <Search aria-hidden="true" size={17} />
              <Command.Input
                autoFocus
                onKeyDown={(event) => {
                  if (event.key === "Escape") onOpenChange(false);
                }}
                placeholder="Search collections and pieces…"
              />
              <Dialog.Close className="search-close" aria-label="Close search">
                Esc
              </Dialog.Close>
            </div>
            <Command.List className="search-results">
              <Command.Empty>No pieces found.</Command.Empty>
              <Command.Group heading="Sample designs">
                {products.map((product) => (
                  <Command.Item
                    key={product.id}
                    onSelect={() => {
                      onOpenChange(false);
                      router.push(`/product/${product.slug}`);
                    }}
                    value={`${product.name} ${product.category} ${product.metal}`}
                  >
                    <span>{product.name}</span>
                    <span>₹ {product.approxPriceINR.toLocaleString("en-IN")} approx.</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
            <p className="search-shortcut-note">Navigate with ↑ ↓ · Select with ↵</p>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

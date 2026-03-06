import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  categorySlug?: string;
};

export function ProductGrid({ products, categorySlug }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-card py-16 text-center text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} categorySlug={categorySlug} />
      ))}
    </div>
  );
}

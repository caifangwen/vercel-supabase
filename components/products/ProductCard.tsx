import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23e2e8f0'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%2394a3b8'%3ENo Image%3C/text%3E%3C/svg%3E";

type ProductCardProps = {
  product: Product;
  categorySlug?: string;
};

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const href = categorySlug
    ? `/products/${categorySlug}/${product.slug}`
    : `/products/${product.category?.slug ?? "all"}/${product.slug}`;
  const mainImage = product.images?.[0] ?? PLACEHOLDER_IMAGE;
  const isDataUrl = mainImage.startsWith("data:");

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-card transition-shadow hover:shadow-md">
      <Link href={href} className="block aspect-[4/3] overflow-hidden bg-[var(--muted)]">
        {isDataUrl ? (
          <img
            src={mainImage}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <Image
            src={mainImage}
            alt={product.name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-semibold text-foreground line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
          <Link href={href}>{product.name}</Link>
        </h2>
        {product.moq && (
          <p className="mt-1 text-sm text-muted-foreground">MOQ: {product.moq}</p>
        )}
        <div className="mt-auto pt-4">
          <Link href={`${href}#inquiry-form`}>
            <Button variant="outline" size="sm" className="w-full">
              Request Quote
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

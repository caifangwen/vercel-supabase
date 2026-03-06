"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";

type CategoryFilterProps = {
  categories: Category[];
  currentSlug?: string | null;
  basePath?: string;
};

export function CategoryFilter({ categories, currentSlug, basePath = "/products" }: CategoryFilterProps) {
  return (
    <aside className="space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Categories</h3>
      <nav className="flex flex-col gap-0.5">
        <Link
          href={basePath}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            !currentSlug || currentSlug === "all"
              ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
              : "text-foreground hover:bg-[var(--muted)]"
          }`}
        >
          All Products
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`${basePath}/${cat.slug}`}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              currentSlug === cat.slug
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "text-foreground hover:bg-[var(--muted)]"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

import { Suspense } from "react";
import { getCategories, getProducts, PAGE_SIZE } from "@/lib/data";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductsListClient } from "@/components/products/ProductsListClient";

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const search = params.q ?? "";

  const [categories, { products, total }] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: null, search: search || undefined, page }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Products</h1>
      <p className="mt-1 text-muted-foreground">
        {total} product{total !== 1 ? "s" : ""} found
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-56 shrink-0">
          <CategoryFilter categories={categories} currentSlug={null} basePath="/products" />
        </div>
        <div className="min-w-0 flex-1">
          <ProductsListClient initialSearch={search} />
          <Suspense key={`${search}-${page}`} fallback={null}>
            <ProductGrid products={products} />
          </Suspense>
          {totalPages > 1 && (
            <nav className="mt-8 flex justify-center gap-2" aria-label="Pagination">
              {page > 1 && (
                <a
                  href={`/products?${new URLSearchParams({
                    ...(search ? { q: search } : {}),
                    page: String(page - 1),
                  })}`}
                  className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)]"
                >
                  Previous
                </a>
              )}
              <span className="flex items-center px-4 py-2 text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <a
                  href={`/products?${new URLSearchParams({
                    ...(search ? { q: search } : {}),
                    page: String(page + 1),
                  })}`}
                  className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)]"
                >
                  Next
                </a>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

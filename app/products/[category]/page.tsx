import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategories, getCategoryBySlug, getProducts, PAGE_SIZE } from "@/lib/data";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductsListClient } from "@/components/products/ProductsListClient";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryProductsPage({ params, searchParams }: Props) {
  const { category: categorySlug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const search = sp.q ?? "";

  const [category, categories, { products, total }] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getCategories(),
    getProducts({ categorySlug, search: search || undefined, page }),
  ]);

  if (!category) notFound();

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  const basePath = "/products";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{category.name}</h1>
      {category.description && (
        <p className="mt-1 text-muted-foreground">{category.description}</p>
      )}
      <p className="mt-1 text-sm text-muted-foreground">
        {total} product{total !== 1 ? "s" : ""} found
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-56 shrink-0">
          <CategoryFilter
            categories={categories}
            currentSlug={categorySlug}
            basePath={basePath}
          />
        </div>
        <div className="min-w-0 flex-1">
          <ProductsListClient initialSearch={search} />
          <Suspense key={`${categorySlug}-${search}-${page}`} fallback={null}>
            <ProductGrid products={products} categorySlug={categorySlug} />
          </Suspense>
          {totalPages > 1 && (
            <nav className="mt-8 flex justify-center gap-2" aria-label="Pagination">
              {page > 1 && (
                <a
                  href={`${basePath}/${categorySlug}?${new URLSearchParams({
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
                  href={`${basePath}/${categorySlug}?${new URLSearchParams({
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

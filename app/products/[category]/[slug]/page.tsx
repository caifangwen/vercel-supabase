import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { ImageGallery } from "@/components/products/ImageGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const paths = await import("@/lib/data").then((m) => m.getAllProductPaths());
  return paths.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const product = await getProductBySlug(category, slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description:
      product.description?.slice(0, 160) ||
      `B2B product: ${product.name}. MOQ: ${product.moq ?? "Inquire"}.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const product = await getProductBySlug(categorySlug, slug);
  if (!product) notFound();

  const related =
    product.category_id
      ? await getRelatedProducts(product.category_id, product.id, 4)
      : [];

  const specs = product.specs && typeof product.specs === "object" ? product.specs : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground">Products</Link>
        {" / "}
        <Link href={`/products/${categorySlug}`} className="hover:text-foreground">
          {product.category?.name ?? categorySlug}
        </Link>
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <ImageGallery
            images={product.images ?? []}
            alt={product.name}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.moq && (
              <span className="text-sm text-muted-foreground">MOQ: {product.moq}</span>
            )}
            {product.lead_time && (
              <span className="text-sm text-muted-foreground">Lead time: {product.lead_time}</span>
            )}
          </div>
          {product.certifications && product.certifications.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.certifications.map((c) => (
                <Badge key={c} variant="secondary">{c}</Badge>
              ))}
            </div>
          )}

          {specs && Object.keys(specs).length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Specifications
              </h2>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-[var(--border)]">
                      <td className="py-2 font-medium text-muted-foreground">{key}</td>
                      <td className="py-2 text-foreground">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6">
            <a href="#inquiry-form">
              <Button size="lg">Send Inquiry</Button>
            </a>
          </div>
        </div>
      </div>

      {product.description && (
        <div className="mt-12 border-t border-[var(--border)] pt-12">
          <h2 className="text-lg font-semibold text-foreground">Description</h2>
          <div
            className="mt-4 prose prose-slate max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, "<br/>") }}
          />
        </div>
      )}

      <div id="inquiry-form" className="mt-12 scroll-mt-8">
        <InquiryForm
          productId={product.id}
          productName={product.name}
          formId="inquiry-form"
        />
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-[var(--border)] pt-12">
          <h2 className="text-xl font-semibold text-foreground">Related Products</h2>
          <div className="mt-6">
            <ProductGrid products={related} categorySlug={categorySlug} />
          </div>
        </div>
      )}
    </div>
  );
}

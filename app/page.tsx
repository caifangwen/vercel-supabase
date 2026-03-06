import Link from "next/link";
import { Factory, Shield, Truck, Package } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";

const advantages = [
  {
    title: "Factory Direct",
    description: "No middlemen. Best prices and direct quality control.",
    icon: Factory,
  },
  {
    title: "Quality Certified",
    description: "ISO, CE and industry certifications. Reliable standards.",
    icon: Shield,
  },
  {
    title: "Fast Delivery",
    description: "Efficient logistics and flexible lead times worldwide.",
    icon: Truck,
  },
  {
    title: "Custom OEM",
    description: "Customization and OEM support for your requirements.",
    icon: Package,
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(6);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[var(--primary)] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your Trusted B2B Industrial Partner
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Factory direct manufacturing. Quality certified. Fast global delivery. Get a quote today and experience the difference.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[var(--accent)] text-white hover:opacity-90 border-0"
                >
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="border-b border-[var(--border)] bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-[var(--border)] bg-background p-6 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Featured Products
              </h2>
              <p className="mt-1 text-muted-foreground">
                Our most popular industrial products
              </p>
            </div>
            <Link href="/products" className="shrink-0 text-sm font-medium text-[var(--accent)] hover:underline">
              View all products →
            </Link>
          </div>
          <div className="mt-8">
            {featured.length > 0 ? (
              <ProductGrid products={featured} />
            ) : (
              <div className="rounded-lg border border-[var(--border)] bg-card py-12 text-center text-muted-foreground">
                <p>No featured products yet. Add products and set is_featured in the database.</p>
                <Link href="/products" className="mt-4 inline-block text-[var(--accent)] hover:underline">
                  Browse all products
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Client Logos - placeholder */}
      <section className="border-t border-[var(--border)] bg-[var(--muted)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Trusted by companies worldwide
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-12 opacity-70">
            {["Partner 1", "Partner 2", "Partner 3", "Partner 4", "Partner 5"].map((name) => (
              <div
                key={name}
                className="flex h-12 items-center justify-center rounded border border-[var(--border)] bg-white px-8 text-sm font-medium text-muted-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

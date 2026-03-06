import type { Metadata } from "next";
import { Factory, Users, Globe, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our company, history, and commitment to quality B2B industrial products.",
};

const stats = [
  { label: "Years in business", value: "15+", icon: Factory },
  { label: "Team members", value: "200+", icon: Users },
  { label: "Export countries", value: "50+", icon: Globe },
  { label: "Certifications", value: "12", icon: Award },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">About Us</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        We are a leading B2B industrial manufacturer with over 15 years of experience in supplying quality products to businesses worldwide.
      </p>

      <div className="mt-12 aspect-video overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--muted)]">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          Factory / Company image placeholder
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center rounded-lg border border-[var(--border)] bg-card p-6 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              <item.icon className="h-6 w-6" />
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground">{item.value}</p>
            <p className="text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 prose prose-slate max-w-none">
        <h2 className="text-xl font-semibold text-foreground">Our Story</h2>
        <p className="text-muted-foreground">
          Founded with a mission to connect global buyers with reliable manufacturing, we have grown into a trusted partner for OEM and bulk orders. Our factory-direct model ensures competitive pricing and strict quality control at every step.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Certifications</h2>
        <p className="text-muted-foreground">
          We maintain ISO 9001, CE, and industry-specific certifications. Our quality management system is regularly audited to meet international standards.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {["ISO 9001", "CE", "ROHS", "Custom"].map((c) => (
            <span
              key={c}
              className="rounded-md border border-[var(--border)] bg-[var(--muted)] px-4 py-2 text-sm font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

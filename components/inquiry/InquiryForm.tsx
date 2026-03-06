"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { InquiryInput } from "@/lib/types";

type InquiryFormProps = {
  productId?: string | null;
  productName?: string;
  formId?: string;
};

export function InquiryForm({ productId = null, productName, formId = "inquiry-form" }: InquiryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<InquiryInput>({
    product_id: productId ?? undefined,
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: form.product_id || null,
          name: form.name,
          email: form.email,
          company: form.company || null,
          country: form.country || null,
          phone: form.phone || null,
          quantity: form.quantity || null,
          message: form.message || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submit failed");
      router.push("/inquiry/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-[var(--border)] bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">
        {productName ? `Inquire about: ${productName}` : "Send Inquiry"}
      </h3>
      {error && (
        <div className="rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">
          {error}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-name" className="mb-1 block text-sm font-medium text-foreground">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="inquiry-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-md border border-[var(--input)] bg-background px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="inquiry-email" className="mb-1 block text-sm font-medium text-foreground">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="inquiry-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-md border border-[var(--input)] bg-background px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-company" className="mb-1 block text-sm font-medium text-foreground">
            Company
          </label>
          <input
            id="inquiry-company"
            type="text"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            className="w-full rounded-md border border-[var(--input)] bg-background px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="inquiry-country" className="mb-1 block text-sm font-medium text-foreground">
            Country
          </label>
          <input
            id="inquiry-country"
            type="text"
            value={form.country}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            className="w-full rounded-md border border-[var(--input)] bg-background px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            placeholder="Country"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-phone" className="mb-1 block text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="inquiry-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full rounded-md border border-[var(--input)] bg-background px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label htmlFor="inquiry-quantity" className="mb-1 block text-sm font-medium text-foreground">
            Quantity
          </label>
          <input
            id="inquiry-quantity"
            type="text"
            value={form.quantity}
            onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
            className="w-full rounded-md border border-[var(--input)] bg-background px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            placeholder="e.g. 1000 pcs"
          />
        </div>
      </div>
      <div>
        <label htmlFor="inquiry-message" className="mb-1 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-md border border-[var(--input)] bg-background px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          placeholder="Your requirements or questions..."
        />
      </div>
      <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto">
        {loading ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}

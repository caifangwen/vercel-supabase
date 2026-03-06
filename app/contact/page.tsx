import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { InquiryForm } from "@/components/inquiry/InquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for quotes and inquiries. We respond within 24 hours.",
};

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "sales@example.com",
    href: "mailto:sales@example.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+86 123 4567 8900",
    href: "https://wa.me/8612345678900",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Industrial Park, City, Country",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">
        Send an inquiry and we&apos;ll respond within 24 hours.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
          {contactItems.map((item) => (
            <div key={item.label} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-foreground hover:text-[var(--accent)] hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-foreground">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2">
          <InquiryForm formId="contact-inquiry-form" />
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Inquiry Sent",
  description: "Your inquiry has been submitted successfully.",
};

export default function InquirySuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
        Thank you for your inquiry
      </h1>
      <p className="mt-4 text-muted-foreground">
        We have received your message and will get back to you within 24 hours.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/products">
          <Button variant="outline">Browse Products</Button>
        </Link>
        <Link href="/contact">
          <Button>Contact Again</Button>
        </Link>
      </div>
    </div>
  );
}

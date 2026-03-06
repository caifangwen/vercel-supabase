export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  images: string[];
  specs: Record<string, string | number | boolean> | null;
  description: string | null;
  moq: string | null;
  lead_time: string | null;
  certifications: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  category?: { slug: string; name: string } | null;
};

export type InquiryInput = {
  product_id?: string | null;
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  quantity?: string;
  message?: string;
};

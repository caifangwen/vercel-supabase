import { supabase } from "@/lib/supabase";
import type { Category, Product } from "./types";

const PAGE_SIZE = 24;

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, created_at")
    .order("name");
  if (error) return [];
  return (data as Category[]) ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, created_at")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data as Category;
}

export async function getProducts(options: {
  categorySlug?: string | null;
  search?: string;
  page?: number;
  featured?: boolean;
}): Promise<{ products: Product[]; total: number }> {
  const { categorySlug, search, page = 1, featured } = options;

  let categoryId: string | null = null;
  if (categorySlug && categorySlug !== "all") {
    const cat = await getCategoryBySlug(categorySlug);
    categoryId = cat?.id ?? null;
  }

  let query = supabase
    .from("products")
    .select("*, category:categories(slug, name)", { count: "exact" })
    .eq("is_active", true);

  if (featured) query = query.eq("is_featured", true);
  if (categoryId) query = query.eq("category_id", categoryId);
  if (search?.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const from = (page - 1) * PAGE_SIZE;
  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (error) return { products: [], total: 0 };
  const products = (data ?? []).map((row: Record<string, unknown>) => ({
    ...row,
    category: Array.isArray(row.category) ? row.category[0] : row.category,
  })) as Product[];
  return { products, total: count ?? 0 };
}

export async function getProductBySlug(categorySlug: string, productSlug: string): Promise<Product | null> {
  const { data: cat } = await supabase.from("categories").select("id").eq("slug", categorySlug).single();
  if (!cat) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(slug, name)")
    .eq("category_id", cat.id)
    .eq("slug", productSlug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  const product = data as Record<string, unknown>;
  product.category = Array.isArray(product.category) ? product.category[0] : product.category;
  return product as Product;
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const { products } = await getProducts({ featured: true, page: 1 });
  return products.slice(0, limit);
}

export async function getRelatedProducts(categoryId: string, excludeProductId: string, limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(slug, name)")
    .eq("category_id", categoryId)
    .neq("id", excludeProductId)
    .eq("is_active", true)
    .limit(limit);

  if (error) return [];
  return (data ?? []).map((row: Record<string, unknown>) => ({
    ...row,
    category: Array.isArray(row.category) ? row.category[0] : row.category,
  })) as Product[];
}

/** For sitemap: fetch all category slugs and product slugs (category + product). */
export async function getAllProductPaths(): Promise<{ category: string; slug: string }[]> {
  const { data, error } = await supabase
    .from("products")
    .select("slug, category:categories(slug)")
    .eq("is_active", true);
  if (error) return [];
  const rows = (data ?? []) as { slug: string; category: { slug: string } | { slug: string }[] }[];
  return rows
    .map((row) => ({
      slug: row.slug,
      category: Array.isArray(row.category) ? row.category[0]?.slug : row.category?.slug,
    }))
    .filter((p): p is { category: string; slug: string } => Boolean(p.category));
}

export { PAGE_SIZE };

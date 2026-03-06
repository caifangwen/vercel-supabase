"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ShoppingBag, Menu, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
  image_url: string | null;
};

const CATEGORIES = [
  { id: "all", label: "全部商品" },
  { id: "phones", label: "手机" },
  { id: "computers", label: "电脑" },
  { id: "tablets", label: "平板" },
  { id: "audio", label: "音频" },
  { id: "wearables", label: "穿戴" },
  { id: "accessories", label: "配件" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
  }).format(price);
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d2d2d7]/60 bg-white">
      <div className="aspect-square animate-pulse bg-[#f5f5f7]" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-[#e5e5e7]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#e5e5e7]" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-[#e5e5e7]" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-[#e5e5e7]" />
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, price, category, description, image_url");

        if (error) throw error;
        setProducts((data as Product[]) ?? []);
      } catch (err) {
        console.error("获取商品失败:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchCategory =
        category === "all" || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-[#d2d2d7]/60 bg-[#fbfbfd]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="flex lg:hidden items-center justify-center rounded-lg p-2 text-[#1d1d1f] hover:bg-black/5"
            aria-label="打开分类"
          >
            <Menu className="h-5 w-5" />
          </button>
          <a href="/" className="text-xl font-semibold tracking-tight">
            商城
          </a>
          <div className="relative hidden w-full max-w-md lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
            <input
              type="search"
              placeholder="搜索商品"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#d2d2d7] bg-white/80 py-2.5 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:outline-none focus:ring-1 focus:ring-[#0071e3]"
            />
          </div>
          <button
            type="button"
            className="flex items-center justify-center rounded-full p-2 text-[#1d1d1f] hover:bg-black/5"
            aria-label="购物袋"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 pb-3 lg:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
            <input
              type="search"
              placeholder="搜索商品"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#d2d2d7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:outline-none"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* 侧边栏 */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 transform border-r border-[#d2d2d7]/60 bg-[#fbfbfd] transition-transform duration-200 ease-out lg:static lg:translate-x-0 lg:border-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex h-14 items-center justify-between border-b border-[#d2d2d7]/60 px-4 lg:border-0">
            <span className="font-medium text-[#1d1d1f]">分类</span>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden rounded-lg p-2 hover:bg-black/5"
              aria-label="关闭"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>
          <nav className="space-y-0.5 p-4">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCategory(c.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors
                  ${category === c.id ? "bg-[#0071e3] text-white" : "text-[#1d1d1f] hover:bg-black/5"}
                `}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </aside>
        {sidebarOpen && (
          <button
            type="button"
            aria-label="关闭侧边栏"
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 主内容 */}
        <main className="min-w-0 flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl">
              精选商品
            </h1>
            <p className="mt-1 text-sm text-[#6e6e73]">
              {loading ? "加载中..." : `共 ${filteredProducts.length} 件商品`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#d2d2d7]/60 bg-white/60 py-16">
              <Package className="h-12 w-12 text-[#86868b]" />
              <p className="mt-4 text-[#6e6e73]">
                {products.length === 0
                  ? "暂无商品，请先在 Supabase 的 products 表中添加数据"
                  : "没有找到匹配的商品，试试其他关键词或分类"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <a
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group block overflow-hidden rounded-2xl border border-[#d2d2d7]/60 bg-white transition-all duration-300 hover:border-[#d2d2d7] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#f5f5f7] transition-colors group-hover:bg-[#ebebed]">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-6xl text-[#86868b]">
                        📦
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold text-[#1d1d1f] group-hover:text-[#0071e3]">
                      {product.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm text-[#6e6e73]">
                      {product.description ?? "暂无描述"}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-[#1d1d1f]">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

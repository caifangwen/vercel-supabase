"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";

type Props = {
  initialSearch?: string;
};

export function ProductsListClient({ initialSearch = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(initialSearch);

  useEffect(() => {
    setValue(initialSearch);
  }, [initialSearch]);

  const updateSearch = useCallback(
    (q: string) => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      params.set("page", "1");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router]
  );

  useEffect(() => {
    const t = setTimeout(() => updateSearch(value), 300);
    return () => clearTimeout(t);
  }, [value, updateSearch]);

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search products..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-[var(--input)] bg-background py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
      />
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchChange = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`/products?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search products by title..."
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all shadow-sm"
        />
      </div>
    </div>
  );
}